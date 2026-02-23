# Problem Statement

## Context: Real Estate Exposure and ASEAN Capital Formation

Real estate is a core asset class across ASEAN, but cross-border capital formation and participation remain constrained by regulatory fragmentation, operational friction, and limited secondary-market pathways for private or semi-private exposures. For Indonesian assets in particular, investor access outside Indonesia is typically mediated through layered structures, manual onboarding, and limited transferability of economic interests.

This whitepaper addresses the gap between:

- Investor demand for regulated ASEAN real estate exposure; and
- The operational and compliance burden of issuing, administering, and transferring economic interests across jurisdictions.

## Problems to Solve

### 1) Fragmented Regulatory Perimeters Across ASEAN

ASEAN jurisdictions apply different rules to securities, collective investment schemes, distribution, investor eligibility, and marketing. For Indonesian underlying assets, cross-border participation requires a control framework that can enforce selling restrictions and provide auditable evidence of compliance without relying on regulatory arbitrage.

**Implication:** cross-border distribution must be jurisdiction-aware by design, not layered as an afterthought.

### 2) High-Friction Onboarding and Compliance Operations

Traditional issuance and servicing workflows rely on fragmented systems: KYC onboarding, subscription processing, register maintenance, corporate actions, distributions, redemptions, and reporting often require manual reconciliation across stakeholders. This increases:

- Operational risk (errors, delays, inconsistent registers)
- Cost-to-serve (especially for smaller ticket sizes)
- Difficulty in supporting multi-country participation

**Implication:** lifecycle administration should be standardized and automated where appropriate, while preserving regulatory controls and auditability.

### 3) Limited Liquidity Pathways and Weak Price Discovery

Tokenization is frequently assumed to imply liquidity; in practice, real estate exposures often face:

- Sparse trading and fragmented venues
- Restrictions on transferability due to selling constraints
- Valuation frequency mismatches (real estate vs. trading cadence)
- Lack of market making and orderly-market frameworks

**Implication:** liquidity must be engineered through venue strategy, market structure, and documented redemption mechanisms (if any), without implying continuous liquidity.

### 4) Data Protection and Cross-Border Personal Data Handling

Investor onboarding and ongoing compliance require processing personal data. ASEAN data protection regimes (including Indonesia’s UU PDP and PDPA regimes in other ASEAN markets) introduce constraints on:

- Data minimization and retention
- Cross-border data transfers
- Incident response and breach notification
- Accountability (data controller / processor responsibilities)

**Implication:** personal data should not be placed on public ledgers; compliance architecture must be privacy-preserving and auditable.

## Structural Solution (High-Level)

This whitepaper proposes a **hybrid on-chain/off-chain compliance architecture** for tokens representing **economic rights only** associated with Indonesian real estate exposures. The architecture aims to:

- Standardize lifecycle administration (issuance, transfers, distributions, redemptions)
- Enforce jurisdiction-aware selling restrictions and investor eligibility via whitelisting and policy controls
- Preserve privacy by storing personal data off-chain and anchoring integrity proofs on-chain
- Enable regulator-aligned reporting and audit interfaces

## Regulatory Alignment and Non-Arbitrage

The framework is designed to operate within securities regulation and related licensing obligations. Tokenization is treated as a method of representation and administration of economic rights, not as a mechanism to bypass regulatory requirements. The system prioritizes:

- Clear categorization and disclosure per funding model
- Controlled distribution channels and market supervision where secondary trading is permitted
- Documented governance and control points for privileged lifecycle actions

## Cross-Border Implications (ASEAN Minimum)

Cross-border participation is expected to remain heterogeneous across ASEAN. The framework therefore assumes:

- Country-by-country rollout and approvals
- Venue-specific controls to manage liquidity fragmentation across jurisdictions
- Modular compliance controls to support evolving guidance without redesigning the underlying economic-rights model
