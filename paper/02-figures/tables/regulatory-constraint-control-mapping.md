# Regulatory Constraint → Control Mapping (ASEAN Minimum, High-Level)

This table maps common ASEAN regulatory/operational constraints to the control patterns used in this whitepaper. It is non-exhaustive and intended as a design rationale aid, not legal advice.

| Constraint | Risk if unmanaged | Control pattern in this framework | Evidence artifacts (illustrative) |
| --- | --- | --- | --- |
| Classification variability (instrument perimeter differs by wrapper/jurisdiction) | Misclassification, enforcement risk, investor harm | Model-specific disclosures; jurisdiction-aware policies; staged rollout | legal memos (per jurisdiction), disclosure versions, policy versions |
| Selling restrictions and investor eligibility | Unlawful distribution or resale | Off-chain eligibility engine + jurisdiction-aware whitelist; policy-controlled transfers | onboarding approvals, whitelist change logs, blocked/allowed transfer logs |
| KYC/AML obligations | Sanctions/AML breaches, regulatory action | Off-chain KYC/AML mandatory; ongoing monitoring; exception handling | KYC reports, screening logs, approvals, incident records |
| Secondary trading venue constraints and market conduct | Disorderly markets, surveillance gaps | Venue-specific controls; regulated venue integration where permitted; no permissionless markets | venue rule alignment notes, trade reports (where available), surveillance hooks |
| Privacy obligations (UU PDP/PDPA) and cross-border data handling | Personal data leakage, unlawful transfers | Off-chain personal data boundary; data minimization; access controls; controller/processor governance | data maps, access logs, DPIA-like assessments (if used), processor contracts |
| Custody / safeguarding expectations | Loss/misuse of client assets, disputes | Clear custody model; RBAC; sequential approvals; audit logs | custody policies, approval trails, audit exports |
| Hybrid reconciliation ambiguity (off-chain vs on-chain truth gaps) | Inconsistent registers, audit failures, disputes | Append-only audit logs + traceability + deterministic evidence packs + reconciliations | audit log exports, evidence packs, reconciliation reports |
| Corporate actions integrity (distributions/redemptions) | Misallocations, disputes, fraud | Governed corporate actions engine; dual authorization; reconciliations | calculation hash references, execution receipts, investor statements |
| Origination/drawdown funding certainty (debt offerings) | Borrower funding failure, investor disputes | Escrow + close threshold; borrower partial/cancel decision rules; refund procedures | escrow statements, close decision records, refund logs, notices |
| Liquidity fragmentation across ASEAN | Unmet investor expectations, mis-selling risk | Liquidity engineering disclosures; venue-by-venue strategy; optional market making; redemption windows only if supportable | liquidity disclosures, venue plans, market maker agreements (if any), monitoring reports |
| Accountability ambiguity (unclear who is legally responsible) | Disputes, enforcement risk, governance breakdown | Explicit legal accountability mapping; contracts and mandates; auditable approvals and evidence packs | accountability table, mandates/contracts, approvals, audit packs |
