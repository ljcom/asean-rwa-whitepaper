# Technical Annex (Implementation Specification – Working Draft)

## Purpose and Audience

This annex translates the whitepaper’s compliance-by-design objectives into implementable technical requirements. It is written for engineering, security, operations, and audit/assurance teams. It does not prescribe a single technology vendor or blockchain; it specifies control outcomes and interfaces.

Scope anchors:

- Underlying assets: Indonesia (property / real estate exposure)
- Token: economic rights only (no land title transfer)
- Minimum scope: ASEAN (phased rollout; Indonesia-first pilot)
- Architecture: hybrid on-chain/off-chain, regulated channels, no permissionless markets

## System Overview (Hybrid Architecture)

Reference diagrams:

- `02-figures/diagrams/hybrid-compliance-architecture.md`
- `02-figures/diagrams/whitelist-kyc-identity-flow.md`
- `02-figures/diagrams/debt-escrow-close-flow.md`
- `02-figures/diagrams/secondary-market-and-exit-pathways.md`

The system is split into:

- **Off-chain control plane:** identity/KYC, eligibility, policy decisions, escrow workflows, document and disclosure management, corporate action calculations, monitoring, audit evidence packs.
- **On-chain execution plane:** restricted token issuance and transfers, corporate action triggers (where appropriate), and tamper-evident event logs.

The authoritative compliance decisions occur off-chain and are evidenced through append-only logs. On-chain components provide controlled execution and immutable event trails.

## Off-Chain Recordkeeping (Recommended: Event-Sourced Implementation)

Main-paper requirement: append-only audit logs + traceability. For implementation, an **event-sourced architecture** is recommended to achieve deterministic reconstructions and auditability at scale.

### Event Store (System of Record)

Design requirements:

- Append-only event store; no in-place mutation of historical events.
- Every state change is an event with a unique ID, timestamp, actor identity (RBAC principal), and evidence references.
- Corrections are handled via compensating events under governed approvals.
- Strong integrity: write-once semantics (or equivalent controls), hashing of event streams, and tamper detection.

### Projections (Read Models)

Derived read models (non-exhaustive):

- investor registry (investor ID ↔ wallets, eligibility class, jurisdiction tags)
- whitelist state per policy version
- subscription/allocation state (including escrow status)
- corporate action ledgers (distribution schedules, entitlements)
- evidence pack indices (what evidence exists for an issuance/transfer/corporate action)

### Minimum Event Types (Illustrative)

Identity and eligibility:

- `KYC_SUBMITTED`, `KYC_APPROVED`, `KYC_REJECTED`, `KYC_REFRESH_REQUIRED`, `KYC_REFRESH_COMPLETED`
- `SCREENING_FLAGGED`, `SCREENING_CLEARED`
- `ELIGIBILITY_CLASS_SET`, `JURISDICTION_TAG_SET`

Wallet and whitelist:

- `WALLET_PROOFED`, `WALLET_BOUND`, `WALLET_UNBOUND`
- `WHITELIST_GRANTED`, `WHITELIST_REVOKED`

Policies and governance:

- `POLICY_VERSION_CREATED`, `POLICY_VERSION_APPROVED`, `POLICY_VERSION_ACTIVATED`, `POLICY_VERSION_RETIRED`
- `EXCEPTION_REQUESTED`, `EXCEPTION_APPROVED`, `EXCEPTION_REJECTED`

Escrow and settlement:

- `ESCROW_DEPOSIT_CONFIRMED`, `ESCROW_DEPOSIT_RECONCILED`
- `CLOSE_THRESHOLD_MET`, `CLOSE_PARTIAL_ACCEPTED`, `CLOSE_CANCELLED`
- `ESCROW_RELEASE_APPROVED`, `ESCROW_RELEASE_EXECUTED`
- `REFUND_APPROVED`, `REFUND_EXECUTED`

Issuance and lifecycle:

- `ISSUANCE_PROPOSED`, `ISSUANCE_APPROVED`, `ISSUANCE_EXECUTED`
- `TRANSFER_ATTEMPTED`, `TRANSFER_BLOCKED` (with reason), `TRANSFER_ALLOWED`
- `CORP_ACTION_PROPOSED`, `CORP_ACTION_APPROVED`, `CORP_ACTION_EXECUTED`
- `ENFORCEMENT_HOLD_APPLIED`, `ENFORCEMENT_HOLD_REMOVED`

## Identity, KYC/AML, and Eligibility Integration

### Principles

- KYC/AML is off-chain; personal data is not stored on-chain.
- Compliance decisions must be attributable and auditable (who approved, when, under what policy).
- Eligibility is identity-centric; wallet addresses are bound to verified identities.

### Integration Requirements (Non-Exhaustive)

- Provider interface for verification outcomes and screening signals.
- Standardized identity record model (pseudonymous investor ID, not PII as primary key).
- Support periodic refresh workflows and revocation flows that update whitelist privileges.

## Policy Engine (Jurisdiction-Aware Controls)

The policy engine is responsible for computing allow/deny outcomes for privileged lifecycle actions and transfers.

### Inputs (Illustrative)

- jurisdiction tags (investor, distribution channel, venue)
- investor eligibility class (institutional/eligible/capped retail)
- product model constraints (debt/profit participation/sukuk/crowdfunding)
- lock-up windows, caps, venue-only rules
- exception approvals and their scope/expiry
- current policy version

### Outputs (Illustrative)

- `ALLOW` / `BLOCK` outcome
- reason codes (machine-readable + human-readable)
- applicable policy version reference
- evidence references (e.g., KYC approval ID, disclosure acknowledgement ID)

### Versioning and Change Control

- Policies are versioned; changes require approvals and are time-stamped.
- Decisions must be traceable to a specific policy version.
- Emergency changes must be time-bounded and reviewed post-incident.

## Escrow and Fiat Ramps (Indonesia-First Pilot)

### Pilot Default

Pilot settlement is Indonesia-first:

- subscriptions collected into a segregated Indonesian escrow account
- minimum close threshold + conditions precedent (including Indonesian collateral/security documentation steps such as notary/PPAT where applicable)
- dual authorization for release and refunds

### Cross-Border Extension (Later)

When expanding to other ASEAN jurisdictions:

- add local collection/payout partners (local rails) with strong reconciliation
- add local escrow arrangements only if required by local rules or partner channels
- keep evidence and approval standards consistent

### Controls (Minimum)

- escrow releases require a recorded close decision and approvals
- refunds follow documented SLAs and evidence retention
- daily reconciliation between escrow statements and subscription/allocation ledgers

## On-Chain Scope (Restricted Token Administration)

On-chain code should be intentionally minimal and focused on:

- restricted transfers (whitelist/policy hooks)
- controlled issuance (mint/allocate) under privileged roles
- event logs for issuance, transfer outcomes, and corporate action triggers (where used)

### Required On-Chain Controls (Illustrative)

- role-based privileged functions (issuer admin vs compliance approver vs operations)
- ability to freeze/hold under governed circumstances (with event logging)
- explicit prevention of permissionless liquidity mechanics (no AMM integration assumptions)

### Upgradeability and Change Management

If upgradeability is used:

- upgrades require sequential approvals and are time-delayed (where feasible)
- upgrade events are linked to off-chain change tickets and evidence
- scope upgrades narrowly; avoid “arbitrary admin” patterns

## Key Management and Administrative Security

Minimum requirements:

- privileged roles use strong key management (MPC or HSM-backed where appropriate)
- separation of duties for issuance, policy changes, and emergency actions
- access reviews, logging, and incident response runbooks

## Monitoring and Alerting (Control Monitoring)

Reference table: `02-figures/tables/audit-monitoring-metrics.md`.

Minimum monitoring capabilities:

- whitelist/policy change anomaly detection
- transfer block/allow rates and reason code distributions
- escrow release/refund SLAs and reconciliation breaks
- privileged action alerts and approval bypass attempts

Monitoring should produce retained artifacts suitable for governance review and audits.

## Evidence Packs (Audit Exports)

Evidence packs must be reproducible and structured. Each pack should include (as applicable):

- policy version and decision logs for the relevant timeframe
- whitelist logs (grants/revocations, reasons, approvals)
- KYC/eligibility approvals and refresh history (redacted where necessary)
- escrow statements, release/refund approvals, reconciliation reports
- on-chain transaction receipts and event exports
- exception approvals and their scope/expiry

## Non-Goals (Technical)

This annex does not:

- prescribe a specific chain, wallet vendor, or exchange partner
- provide legal categorization or licensing advice
- assume global permissionless distribution
