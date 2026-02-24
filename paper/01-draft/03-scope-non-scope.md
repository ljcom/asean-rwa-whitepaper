# Scope and Non-Scope

## Scope (In-Scope)

This whitepaper covers an ASEAN-minimum tokenization framework for Indonesian underlying real estate assets, where the token represents **economic rights only** and is administered through a **hybrid on-chain/off-chain compliance architecture**.

### Geographic Scope

- Minimum scope: ASEAN region.
- Initial regulatory focus (minimum set): Indonesia, Singapore, Malaysia.
- Expansion model: phased rollout by jurisdiction and venue.

### Asset and Rights Scope

- Underlying assets: Indonesian real estate exposures held through Indonesian legal structures.
- Tokenized representation: contractual economic entitlements (e.g., distributions, repayment waterfalls, redemption rights if offered).
- Explicit exclusion: land title transfer or claims on land registry via blockchain.

### Functional Scope

- Issuance lifecycle: onboarding, subscription, issuance, register maintenance.
- Transfer controls: whitelist enforcement, selling restrictions, eligibility checks.
- Corporate actions: distributions, redemptions/buybacks (if applicable), updates to rights terms under governed processes.
- Reporting: audit trails, compliance logs, investor statements, regulator-oriented reporting interfaces (where appropriate).

### Funding Models Supported

- Debt
- Profit participation (REIT-like economic rights; contractual participation in distributable cash flows)
- Sukuk (Shariah-aligned asset-backed participation)
- Crowdfunding (with caps and investor protections, where permitted)

### Liquidity Engineering Scope

- Venue strategy and integration (regulated exchanges / regulated channels)
- Market structure and surveillance considerations
- Optional market maker arrangements (subject to local rules)
- NAV reference data integration and pricing integrity approaches
- Redemption mechanisms and liquidity windows (documented; not implied to be continuous)

## Regulatory Design Constraints (ASEAN Minimum)

This framework is designed around regulatory and operational constraints that commonly apply in ASEAN markets. The intent is to explain why the chosen approach (economic-rights-only tokens, hybrid compliance architecture, jurisdiction-aware whitelisting, and venue-specific controls) is necessary.

The table below is a high-level constraint summary (non-exhaustive). Final requirements are jurisdiction- and venue-specific and depend on the chosen legal wrapper and licensing pathway.

| Constraint area | Indonesia (OJK + UU PDP) | Singapore (MAS + PDPA) | Malaysia (SC + PDPA) | Design implication in this whitepaper |
| --- | --- | --- | --- | --- |
| Instrument perimeter and classification | Economic-rights instruments may fall within securities/collective investment perimeters depending on structure and distribution | Classification and perimeter depend on product features and distribution channel | Classification and perimeter depend on product features and distribution channel | Avoid regulatory arbitrage; structure disclosures and controls per model (debt/profit participation/sukuk/crowdfunding) |
| Distribution and selling restrictions | Offering and distribution typically require regulated channels, eligibility controls, and documented disclosures | Marketing, distribution, and eligibility constraints apply; may require licensed intermediaries | Marketing, distribution, and eligibility constraints apply; may require licensed intermediaries | Off-chain onboarding + eligibility engine + evidence retention for disclosures |
| Secondary trading and market conduct | Secondary trading pathways are venue-dependent; market conduct and surveillance expectations apply where trading is permitted | Trading is venue-dependent; market conduct and surveillance expectations apply | Trading is venue-dependent; market conduct and surveillance expectations apply | Venue-specific controls; no permissionless markets; liquidity engineering rather than implied liquidity |
| KYC/AML and investor verification | KYC/AML and screening obligations require controlled workflows | KYC/AML and screening obligations require controlled workflows | KYC/AML and screening obligations require controlled workflows | KYC/AML remains off-chain; jurisdiction-aware whitelist required |
| Personal data protection and cross-border data handling | UU PDP requires privacy-by-design, minimization, and accountable handling | PDPA requirements for minimization, protection, and accountable processing | PDPA requirements for minimization, protection, and accountable processing | Personal data kept off-chain; on-chain stores minimal integrity references |
| Custody / safeguarding expectations | Safeguarding and governance expectations apply to client assets and operational controls | Safeguarding and governance expectations apply to client assets and operational controls | Safeguarding and governance expectations apply to client assets and operational controls | RBAC, sequential approvals, audit logs, and clear operational accountability |

## Non-Scope (Out-of-Scope)

To maintain regulatory clarity and prevent misinterpretation, the following items are explicitly out of scope:

- Transfer of Indonesian land title via blockchain or token custody.
- Permissionless DeFi distribution, unregulated AMMs, or anonymous trading.
- Assumptions of global (non-ASEAN) distribution as a default expansion path.
- Claims of automatic or guaranteed liquidity, returns, or regulatory approval.
- Replacement of regulated intermediaries where licensing or supervision is required.

## Boundaries and Dependencies

### Legal and Regulatory Dependencies

- Applicable licensing, approvals, and disclosure regimes remain prerequisites.
- Cross-border selling restrictions and investor classification rules must be implemented per jurisdiction.

### Operational Dependencies

- Off-chain KYC/AML, screening, and investor verification are mandatory.
- Custody, payment rails, and servicing arrangements must be defined and auditable.

### Technology Dependencies

- Secure key management and access controls for privileged actions.
- Integrity and audit logging across both on-chain and off-chain components.
