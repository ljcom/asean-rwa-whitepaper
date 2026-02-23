#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/04-build"
DRAFT_DIR="${ROOT_DIR}/01-draft"

OUT_MD="${BUILD_DIR}/whitepaper.generated.md"
OUT_FIGPACK_SRC="${BUILD_DIR}/figures-pack.generated.md"
OUT_MD_FULL="${BUILD_DIR}/whitepaper.full.md"
OUT_MD_FULL_RENDERED="${BUILD_DIR}/whitepaper.full.rendered.md"
OUT_DOCX="${BUILD_DIR}/whitepaper.docx"
OUT_HTML="${BUILD_DIR}/whitepaper.html"
OUT_PDF="${BUILD_DIR}/whitepaper.pdf"

DATE_STR="$(date +%Y-%m-%d)"

cat > "${OUT_MD}" <<EOF
% A Regulatory-Aligned Framework for Cross-Border Real Estate Economic Rights Tokenization in ASEAN
% (Working Draft)
% ${DATE_STR}

**Disclaimer:** This document is a working draft intended for discussion. It is not legal, financial, or regulatory advice. Tokenized instruments described herein represent economic rights only and do not transfer Indonesian land title.

EOF

SECTION_FILES=(
  "${DRAFT_DIR}/01-executive-summary.md"
  "${DRAFT_DIR}/02-problem-statement.md"
  "${DRAFT_DIR}/03-scope-non-scope.md"
  "${DRAFT_DIR}/04-stakeholders.md"
  "${DRAFT_DIR}/05-architecture.md"
  "${DRAFT_DIR}/06-cross-border.md"
  "${DRAFT_DIR}/07-privacy-uu-pdp.md"
  "${DRAFT_DIR}/08-liquidity.md"
  "${DRAFT_DIR}/09-funding-models.md"
  "${DRAFT_DIR}/10-shariah.md"
  "${DRAFT_DIR}/11-risk-mitigations.md"
  "${DRAFT_DIR}/12-roadmap-sandbox.md"
  "${DRAFT_DIR}/13-appendix.md"
  "${DRAFT_DIR}/14-technical-annex.md"
)

for file in "${SECTION_FILES[@]}"; do
  if [[ ! -f "${file}" ]]; then
    echo "Missing section file: ${file}" >&2
    exit 1
  fi
  cat >> "${OUT_MD}" <<'EOF'

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

EOF
  cat "${file}" >> "${OUT_MD}"
done

echo "Generating Figure Pack source..."
cat > "${OUT_FIGPACK_SRC}" <<EOF
# Figure Pack (Diagrams)

This section includes the diagram pack from \`02-figures/diagrams/\`. If Mermaid rendering is available, diagrams are embedded as images. Otherwise, Mermaid code blocks are retained.
EOF

for fig in "${ROOT_DIR}/02-figures/diagrams/"*.md; do
  [[ -f "${fig}" ]] || continue
  cat >> "${OUT_FIGPACK_SRC}" <<'EOF'

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

EOF
  cat "${fig}" >> "${OUT_FIGPACK_SRC}"
done

echo "Assembling full Markdown..."
cat "${OUT_MD}" > "${OUT_MD_FULL}"
cat >> "${OUT_MD_FULL}" <<'EOF'

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

EOF
cat "${OUT_FIGPACK_SRC}" >> "${OUT_MD_FULL}"

RENDER_SOURCE="${OUT_MD_FULL}"

if command -v mmdc >/dev/null 2>&1; then
  echo "Rendering Mermaid diagrams (full document)..."
  rm -rf "${BUILD_DIR}/diagrams"
  mkdir -p "${BUILD_DIR}/diagrams"
  if MERMAID_PUPPETEER_CONFIG="${BUILD_DIR}/puppeteer-config.json" \
    python3 "${BUILD_DIR}/render_mermaid.py" "${OUT_MD_FULL}" "${OUT_MD_FULL_RENDERED}" "${BUILD_DIR}/diagrams"; then
    RENDER_SOURCE="${OUT_MD_FULL_RENDERED}"
  else
    echo "Mermaid rendering failed; continuing with Mermaid code blocks."
  fi
else
  echo "Skipping Mermaid rendering: mmdc not found."
fi

echo "Generating DOCX..."
pandoc "${RENDER_SOURCE}" \
  --from=markdown \
  --to=docx \
  --standalone \
  --toc \
  --toc-depth=3 \
  --metadata toc-title="Daftar Isi" \
  -o "${OUT_DOCX}"

echo "Generating HTML..."
pandoc "${RENDER_SOURCE}" \
  --from=markdown \
  --to=html \
  --standalone \
  --toc \
  --toc-depth=3 \
  --metadata toc-title="Daftar Isi" \
  -o "${OUT_HTML}"

PDF_ENGINE=""
if command -v xelatex >/dev/null 2>&1; then
  PDF_ENGINE="xelatex"
elif [[ -x "/Library/TeX/texbin/xelatex" ]]; then
  PDF_ENGINE="/Library/TeX/texbin/xelatex"
fi

if [[ -n "${PDF_ENGINE}" ]]; then
  echo "Generating PDF..."
  pandoc "${RENDER_SOURCE}" \
    --from=markdown \
    --pdf-engine="${PDF_ENGINE}" \
    --toc \
    --toc-depth=3 \
    -o "${OUT_PDF}"
else
  echo "Skipping PDF: xelatex not found."
fi

cat <<EOF
Build complete:
- ${OUT_MD}
- ${OUT_FIGPACK_SRC}
- ${OUT_MD_FULL}
- ${OUT_MD_FULL_RENDERED}
- ${OUT_DOCX}
- ${OUT_HTML}
- ${OUT_PDF}

Note:
- Mermaid diagrams remain as code blocks unless rendered separately.
EOF
