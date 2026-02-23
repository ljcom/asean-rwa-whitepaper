# Liquidity Engineering

## Two Liquidity Problems (Distinguish Clearly)

In this program, “liquidity” refers to two distinct requirements that should not be conflated:

- **Origination / drawdown liquidity:** whether borrower funding can be delivered on schedule.
- **Investor exit liquidity:** whether token holders can sell or redeem their position after issuance.

This whitepaper treats investor exit liquidity as market- and venue-dependent, while origination liquidity can be engineered through primary-market design and operating controls.

## Principle: Tokenization ≠ Automatic Liquidity

Tokenization can improve transferability and operational efficiency, but it does not automatically create liquidity. Real estate exposures remain subject to:

- investor eligibility constraints
- selling restrictions and venue requirements
- valuation cadence and disclosure obligations
- market participant appetite and risk pricing

Liquidity must therefore be engineered through market design, regulated infrastructure, and documented mechanisms that protect investors and support orderly markets.

## Liquidity Objectives

- Provide credible exit pathways aligned with regulatory constraints
- Support price discovery with valuation integrity and disclosure discipline
- Reduce operational friction in transfers and settlement (where permitted)
- Maintain market conduct controls (surveillance, restricted trading where required)

## Market Structure: Dual-Market Model

### Primary Market (Issuance)

The primary market is executed through regulated distribution channels, with:

- off-chain KYC/AML and eligibility checks
- documented subscriptions and allocations
- controlled on-chain issuance (after approvals)

#### Escrow + Close Threshold (Capital-Light Origination Liquidity)

For debt-based offerings, origination liquidity can be engineered without relying on a platform balance sheet by using **segregated escrow accounts and defined closing thresholds**:

- investor commitments are collected into escrow during the offering window;
- closing proceeds only if the raise meets a documented **minimum close** (and other conditions precedent);
- if the threshold is not met, the borrower may accept a partial close (if permitted) or cancel; if cancelled, escrow funds are refunded and the offering is void.

This approach reduces the need for an open-ended backstop and makes funding certainty an explicit contractual outcome, supported by auditable escrow release controls.

### Secondary Market (Trading)

Secondary trading is enabled only where permitted, through regulated venues or controlled transfer mechanisms. The architecture supports:

- venue integration for onboarding coordination and trading rule enforcement
- whitelist enforcement and jurisdiction-aware restrictions
- auditable event logs and post-trade reconciliation to the investor registry

Liquidity fragmentation across ASEAN jurisdictions is expected and must be managed through venue-specific controls and rollout sequencing.

## Liquidity Tools (Engineered, Not Implied)

### 1) Regulated Exchange / Venue Integration

Where feasible, listing on a regulated venue can support:

- market surveillance and orderly-market rules
- standardized participant onboarding and disclosures
- transparent trade reporting

Trading capability (including 24/7 from a technical standpoint) remains subject to venue adoption, participant availability, and local constraints.

### 2) Market Maker Model (Optional)

Market makers can support tighter spreads and continuous quotes, subject to:

- venue rules and supervision
- documented agreements and conflict-of-interest management
- disclosure of the market making model and its limitations

Market making does not guarantee liquidity and may be reduced or withdrawn under stressed conditions.

### 3) Pricing Integrity and NAV Reference

Pricing integrity is supported through:

- independent valuation inputs and periodic updates
- clear NAV methodology and reporting cadence
- governance over data sources and updates

NAV reference data can support:

- investor reporting and transparency
- redemption pricing (if offered)
- limits and controls during abnormal market conditions

### 4) Redemption Mechanisms and Liquidity Windows

If the structure offers redemption or buyback, it should be documented with:

- eligibility and timing (e.g., periodic windows)
- pricing references and haircut policies (if applicable)
- limits (gates) and suspension triggers under stress
- funding sources for redemptions and associated risks

Redemption mechanisms provide structured exit pathways but require careful governance to avoid adverse selection and liquidity mismatch.

## Monitoring and Control Metrics (Illustrative)

Liquidity engineering requires ongoing monitoring, such as:

- order book depth and spread metrics (per venue)
- turnover ratio and concentration indicators
- price vs. NAV deviations and volatility thresholds
- redemption request volumes and gating usage (if applicable)
- cross-venue fragmentation indicators

## Regulatory Alignment

Liquidity mechanisms must be aligned to:

- market conduct and surveillance expectations (where trading occurs)
- disclosure standards (risk, pricing integrity, conflicts of interest)
- investor protection rules (eligibility, marketing constraints)

The framework is designed to support regulator engagement by providing transparent controls, auditable processes, and documented limitations (including explicit non-guarantee of liquidity).

## Cross-Border Implications (ASEAN Minimum)

Cross-border liquidity is structurally constrained by:

- different investor eligibility rules by jurisdiction
- venue access differences across ASEAN markets
- data protection and reporting requirements

As a result, liquidity is expected to be **fragmented** rather than unified. The framework manages this through jurisdiction-aware whitelists, venue-specific controls, and staged expansion rather than assuming a single ASEAN-wide pooled market from day one.
