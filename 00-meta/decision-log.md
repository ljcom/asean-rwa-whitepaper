# Decision Log

This log captures major drafting and design decisions to support traceability for reviewers (legal, compliance, engineering, and policy).

## 2026-02-23 — ASEAN minimum scope; Indonesia underlying

- Decision: Minimum scope is ASEAN; underlying assets are in Indonesia.
- Rationale: Align with project goals and maintain clear jurisdictional boundary for the real estate assets.
- Implication: Cross-border participation is enabled via jurisdiction-aware controls; no global permissionless distribution.

## 2026-02-23 — Economic-rights-only token

- Decision: Token represents economic rights only; no land title transfer via blockchain.
- Rationale: Reduce legal ambiguity and align with Indonesian land/title realities.
- Implication: Off-chain legal stack remains primary for enforceability; on-chain supports controlled transfers and auditability.

## 2026-02-23 — Hybrid compliance architecture

- Decision: Hybrid on-chain/off-chain model is mandatory; KYC always off-chain.
- Rationale: Data protection, AML obligations, and regulator expectations require controlled workflows and minimal on-chain personal data.
- Implication: Policy engine, whitelist, RBAC, and sequential approvals become core controls.
