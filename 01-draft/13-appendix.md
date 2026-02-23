# Appendix (Illustrative)

## A. Control Matrix (High-Level, Illustrative)

| Control area | Control objective | Implementation approach (hybrid) | Evidence artifact (illustrative) |
| --- | --- | --- | --- |
| Onboarding and KYC/AML | Verify identity and eligibility off-chain | KYC provider + eligibility engine + audit logs | onboarding report, screening logs, approval records |
| Jurisdiction-aware restrictions | Enforce selling restrictions and eligibility | whitelist segmentation + policy checks + venue controls | whitelist change log, policy versioning, transfer logs |
| Privileged actions governance | Prevent unilateral execution | RBAC + sequential approval workflow + logging | approval trail, execution receipts, reconciliation report |
| Corporate actions integrity | Accurate distributions/redemptions | off-chain calculation + governed on-chain execution | calculation file hash, event logs, investor statements |
| Privacy compliance | Avoid on-chain personal data | off-chain storage + cryptographic references on-chain | data map, access logs, incident playbook |
| Audit and reporting | Support regulator/auditor review | standardized evidence packages + exports | evidence pack, reconciliation exports |

## B. Token Lifecycle Events (Illustrative Catalogue)

- investor onboarding approved (off-chain)
- wallet address bound/unbound (off-chain + on-chain reference)
- issuance proposed / approved / executed (hybrid)
- transfer attempted / allowed / blocked (on-chain event + off-chain policy evidence)
- distribution proposed / approved / executed (hybrid)
- redemption window opened / requests recorded / executed (hybrid, if applicable)
- enforcement action: freeze/hold applied/removed (hybrid, governed)

## C. Disclosure Checklist (Illustrative)

- token represents economic rights only; no land title transfer
- underlying asset jurisdiction: Indonesia; governance and enforceability off-chain
- funding model classification and risk disclosures (debt/profit participation/sukuk/crowdfunding)
- for escrow-based debt offerings: minimum close threshold, deadline, partial-close borrower option, and refund mechanics if cancelled
- liquidity disclosure: engineered pathways; no guarantee; fragmentation expected
- fees, conflicts, and related-party arrangements
- valuation/NAV methodology and reporting cadence
- transfer restrictions and resale limitations by jurisdiction
- privacy notice and data handling summary (UU PDP / PDPA alignment)

## D. References and Sources

See `03-references/sources.md` for a working list of source categories and placeholders.

## E. Design Diagrams and Mapping Tables

- Hybrid architecture: `02-figures/diagrams/hybrid-compliance-architecture.md`
- Cross-border controls: `02-figures/diagrams/cross-border-jurisdiction-controls.md`
- Privacy boundary: `02-figures/diagrams/privacy-data-boundary.md`
- Liquidity engineering: `02-figures/diagrams/liquidity-engineering-map.md`
- Whitelist/KYC/identity flow: `02-figures/diagrams/whitelist-kyc-identity-flow.md`
- Venues and fiat ramps overview: `02-figures/diagrams/venues-and-ramps-overview.md`
- Stakeholder operating model: `02-figures/diagrams/stakeholder-operating-model.md`
- Governance/audit/monitoring loop: `02-figures/diagrams/governance-audit-monitoring-loop.md`
- Constraint → control mapping: `02-figures/tables/regulatory-constraint-control-mapping.md`
- Audit/monitoring metrics: `02-figures/tables/audit-monitoring-metrics.md`
