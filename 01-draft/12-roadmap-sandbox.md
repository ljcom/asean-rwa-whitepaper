# Roadmap and Sandbox Strategy

## Objective

This roadmap proposes a phased implementation approach for an ASEAN-minimum tokenization program with Indonesian underlying assets. The approach is designed to support regulator engagement, operational readiness, and controlled expansion without assuming immediate multi-jurisdiction approvals or unified liquidity.

## Guiding Approach

- Start with a robust Indonesia foundation (legal structure, servicing, disclosures, UU PDP-aligned privacy model).
- Implement the hybrid compliance control plane before scaling distribution.
- Expand cross-border participation country-by-country using jurisdiction-aware controls.
- Engineer liquidity through venue strategy and governance; do not rely on implied liquidity.

## Phase 0 — Program Definition and Regulatory Engagement (Preparation)

Deliverables:

- define token economic rights per model (debt/profit participation/sukuk/crowdfunding)
- select Indonesian asset-holding structure and servicing model
- define disclosure package templates and evidence requirements
- draft compliance control matrix (RBAC, sequential approvals, whitelist governance)
- initiate regulator engagement discussions and scope a sandbox pathway where available

Readiness gates:

- legal documentation and risk disclosures reviewed
- privacy and data governance model approved internally
- operating model and accountability (controller/processor roles) defined

## Phase 1 — Indonesia Foundation (Controlled Issuance Readiness)

Deliverables:

- implement off-chain onboarding, KYC/AML workflows, and investor registry
- implement on-chain token contract(s) with transfer restrictions and event logging
- implement corporate actions engine (distributions, notices, optional redemption workflows)
- integrate valuation/NAV reporting module and audit exports
- define a standardized orchestration layer (policies, approval workflows, evidence packs) that can later be reused across multiple issuance vehicles

Readiness gates:

- internal controls testing and reconciliation runbooks completed
- smart contract security review completed
- incident response playbooks and access controls validated

## Phase 2 — Pilot Issuance (Limited Scope)

Deliverables:

- execute a pilot issuance using a **single Indonesian issuance vehicle (single SPV)** to validate end-to-end controls before scaling
- run the pilot as **Indonesia-first** (domestic distribution and settlement) to validate controls with reduced cross-border complexity
- support early retail adoption only where permitted, with conservative caps, suitability/disclosure controls, and strict whitelist enforcement
- validate escrow and closing procedures for debt offerings (minimum close thresholds, partial-close decision flow, refunds if cancelled)
- produce evidence packages for issuance, onboarding, and corporate actions
- test end-to-end reconciliation between on-chain logs and off-chain registry

Success metrics (illustrative):

- onboarding throughput with low exception rates
- accurate registers and timely statements
- successful controlled corporate actions with full audit trails
- repeatable orchestration runbooks that can be applied to additional vehicles without weakening controls

## Phase 3 — ASEAN Expansion (Jurisdiction-by-Jurisdiction)

Deliverables:

- implement jurisdiction-aware policies (whitelist segmentation, selling restrictions)
- integrate distributor and/or venue partners per target jurisdiction
- update disclosure packages for jurisdiction-specific requirements
- implement cross-border privacy governance and data transfer controls
- extend issuance from the single-SPV pilot to **multi-vehicle issuance** (e.g., multi-SPV or series/compartment structures) while keeping a single standardized orchestration/control plane

Readiness gates:

- legal validation for distribution pathway in each jurisdiction
- partner operating procedures and evidence retention aligned
- regulator feedback incorporated into control plane updates

## Phase 4 — Liquidity Engineering and Venue Strategy

Deliverables:

- define venue-by-venue listing strategy (regulated venues where feasible)
- implement market structure controls, surveillance integration, and reporting hooks
- finalize optional market maker arrangements with governance and disclosure
- define redemption mechanisms and liquidity windows only where supportable

Success metrics (illustrative):

- improved price discovery indicators vs. baseline
- reduced settlement and register maintenance friction
- controlled handling of liquidity fragmentation across venues

## Sandbox Strategy (Where Applicable)

Sandbox participation can be used to validate controls and evidence packages under regulator observation. The framework assumes:

- scope-limited pilots (restricted investor categories, controlled venues)
- transparent reporting and auditability
- documented limitations and risk disclosures

Sandbox is treated as a validation pathway, not as a substitute for licensing or full compliance obligations.

## Cross-Border Implications

Roadmap sequencing must reflect that:

- cross-border permissions and selling restrictions vary across ASEAN
- liquidity is expected to fragment by jurisdiction and venue
- privacy and data protection governance must be designed for multi-party operations

The roadmap therefore prioritizes a strong control plane and staged expansion over rapid scaling.

## Optional Phase — Shariah Product Enablement (Later Stage)

After the Indonesia-first pilot and initial scaling controls are validated, Shariah-aligned offerings (e.g., sukuk structures such as ijarah) can be enabled as an additional phase. This phase reuses the existing orchestration/control plane and adds:

- Shariah supervisory governance and evidence retention
- structure-specific disclosures and monitoring (asset-backing and cash flow constraints)
- venue/distributor alignment for Shariah product distribution where applicable
