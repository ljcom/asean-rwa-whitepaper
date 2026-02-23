#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/04-build"
DRAFT_DIR="${ROOT_DIR}/01-draft"

OUT_MD="${BUILD_DIR}/whitepaper.generated.md"
OUT_DOCX="${BUILD_DIR}/whitepaper.docx"
OUT_HTML="${BUILD_DIR}/whitepaper.html"

DATE_STR="$(date +%Y-%m-%d)"

cat > "${OUT_MD}" <<EOF
% ASEAN Real Estate Tokenization Whitepaper
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
  printf "\n\n\\newpage\n\n" >> "${OUT_MD}"
  cat "${file}" >> "${OUT_MD}"
done

echo "Generating DOCX..."
pandoc "${OUT_MD}" \
  --from=markdown \
  --to=docx \
  --standalone \
  --toc \
  --toc-depth=3 \
  --metadata toc-title="Daftar Isi" \
  -o "${OUT_DOCX}"

echo "Generating HTML..."
pandoc "${OUT_MD}" \
  --from=markdown \
  --to=html \
  --standalone \
  --toc \
  --toc-depth=3 \
  --metadata toc-title="Daftar Isi" \
  -o "${OUT_HTML}"

cat <<EOF
Build complete:
- ${OUT_MD}
- ${OUT_DOCX}
- ${OUT_HTML}

Note:
- PDF generation requires a PDF engine (e.g., xelatex). Mermaid diagrams remain as code blocks unless rendered separately.
EOF
