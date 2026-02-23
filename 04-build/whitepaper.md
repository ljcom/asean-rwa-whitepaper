# A Regulatory-Aligned Framework for Cross-Border Real Estate Economic Rights Tokenization in ASEAN (Build Stub)

This file is a build-oriented aggregation stub. The canonical draft sections live in `01-draft/`.

## Basic Build

- Build script: `04-build/build.sh`
- Outputs:
  - `04-build/whitepaper.generated.md`
  - `04-build/whitepaper.rendered.md`
  - `04-build/whitepaper.docx`
  - `04-build/whitepaper.html`

PDF output is generated when a PDF engine is available (the build script uses `xelatex` if found).

## Mermaid Rendering

If `mmdc` is installed, the build script attempts to render Mermaid code blocks into PNG files under `04-build/diagrams/` and embed them into `04-build/whitepaper.rendered.md`. If rendering fails, the build continues and diagrams remain as code blocks.

## Draft Sections

1. Executive Summary — `01-draft/01-executive-summary.md`
2. Problem Statement — `01-draft/02-problem-statement.md`
3. Scope / Non-Scope — `01-draft/03-scope-non-scope.md`
4. Stakeholders — `01-draft/04-stakeholders.md`
5. Architecture — `01-draft/05-architecture.md`
6. Cross-Border Design — `01-draft/06-cross-border.md`
7. Privacy (UU PDP / PDPA) — `01-draft/07-privacy-uu-pdp.md`
8. Liquidity Engineering — `01-draft/08-liquidity.md`
9. Funding Models — `01-draft/09-funding-models.md`
10. Shariah Considerations — `01-draft/10-shariah.md`
11. Risks and Mitigations — `01-draft/11-risk-mitigations.md`
12. Roadmap and Sandbox — `01-draft/12-roadmap-sandbox.md`
13. Appendix — `01-draft/13-appendix.md`
14. Technical Annex — `01-draft/14-technical-annex.md`
14. Technical Annex — `01-draft/14-technical-annex.md`

## Build Notes (Placeholder)

- The `.docx` and `.pdf` outputs in `04-build/` are placeholders until a build pipeline is defined.
- Once a build tool is chosen (e.g., Pandoc), this file can be replaced by an automated concatenation output.
