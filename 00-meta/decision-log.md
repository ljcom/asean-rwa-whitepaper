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

## 2026-02-23 — Off-chain event-sourced system of record

- Decision: Off-chain compliance and operations use an event-sourced, append-only database as the system of record.
- Rationale: Hybrid systems require strong auditability and deterministic evidence regeneration to reduce reconciliation ambiguity and support regulator-grade reviews.
- Implication: Read models (registers, statements, escrow views) are projections; corrections use compensating events under governed approvals.

## 2026-02-23 — Multi-vehicle issuance (multi-SPV / series) as scaling baseline

- Decision: Scale is achieved through multiple issuance vehicles (e.g., multi-SPV or series/compartment structures), not a single mega vehicle.
- Rationale: Improves ring-fencing, disclosure clarity, and governance across heterogeneous projects and funding models.
- Implication: The platform operates a common compliance control plane and evidence framework across issuers; issuer-specific terms and disclosures remain tied to each vehicle.

## 2026-02-23 — Single-SPV pilot, standardized orchestration

- Decision: The pilot phase may use a single Indonesian issuance vehicle (single SPV) to validate end-to-end controls and auditability.
- Rationale: Reduces complexity while proving compliance-by-design workflows (KYC/whitelist/escrow/corporate actions/evidence packs) under controlled scope.
- Implication: If pilot readiness gates are met, the same orchestration layer (policies, approval workflows, evidence model) is reused to scale across multiple issuance vehicles.

## 2026-02-23 — Platform role as orchestrator, not regulator

- Decision: The platform is positioned as a compliance/operations orchestrator and technology operator, not as a regulator or rule-setter.
- Rationale: Cross-border constraints are jurisdiction- and venue-specific; compliance must be derived from legal requirements and implemented with auditable enforcement.
- Implication: Policies are versioned and approved; whitelists and selling restrictions are enforced as documented controls with evidence retention.
