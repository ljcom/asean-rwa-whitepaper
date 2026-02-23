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
- `02-figures/diagrams/escrow-reconciliation-workflow.md`
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

### Indonesia-First Retail Pilot (Parameterization)

For an Indonesia-first pilot with early retail adoption (where permitted), the implementation should parameterize:

- investor categories (institutional vs eligible retail vs capped retail, as applicable)
- retail caps and suitability/appropriateness controls (policy-driven; enforced off-chain and reflected on-chain via restrictions)
- disclosure acknowledgement requirements and refresh cadence
- restrictions for re-sale/transfer (lock-ups, venue-only rules if used)

Retail configurations should be treated as conservative defaults and require explicit governance approvals for any expansion of eligibility or caps.

### Integration Requirements (Non-Exhaustive)

- Provider interface for verification outcomes and screening signals.
- Standardized identity record model (pseudonymous investor ID, not PII as primary key).
- Support periodic refresh workflows and revocation flows that update whitelist privileges.

## Wallet Model (Adoption vs. Control)

This program should support at least two wallet interaction modes to balance retail adoption and institutional requirements:

### Mode A: Managed Wallet (Web3Auth/MPC/Social Login)

Use cases:

- retail onboarding and recovery-friendly UX
- controlled device/account recovery flows

Minimum requirements:

- documented custody/operating posture (who controls what, recovery semantics)
- RBAC for platform-side actions impacting wallet access (if any)
- audit logs for key lifecycle events (creation, recovery, key-share rotation, lock/unlock)
- clear disclosures on residual risks and support processes

### Mode B: External Wallet (MetaMask / Hardware / Custodian Wallet)

Use cases:

- crypto-native users and institutions with their own custody stack
- venue compatibility where external wallets are required

Minimum requirements:

- proof-of-control workflow for wallet binding
- safe signing UX guidance and phishing-resistant flows (as applicable)
- support for institution-grade custody addresses (including multi-sig where used)

### Multi-Wallet Policy (Identity-Centric Controls)

Allowing more than one wallet per investor can improve UX (device separation, custody options), but it increases compliance and operational risk. The system should therefore enforce:

- a **wallet limit per investor** (pilot default: small number, e.g., 1–2) with controlled approvals for increases
- **identity-centric caps/lock-ups** (enforced at the investor ID level, not per wallet address)
- controlled wallet addition/removal workflows (proof-of-control + approvals + audit logs)
- consolidated statements and entitlement calculations per investor ID across bound wallets

This prevents cap circumvention (crowdfunding limits), reduces resale restriction leakage, and improves AML/monitoring effectiveness.

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

### Policy Rule Examples (Pilot-Oriented, Illustrative)

These examples are intended to clarify how rules are implemented. Final rule sets are jurisdiction- and wrapper-specific.

| Policy area | Example rule | Intended outcome |
| --- | --- | --- |
| Eligibility | retail category requires suitability acknowledgement + capped exposure | prevent mis-selling; enforce caps and disclosures |
| Lock-up | no transfers for N days post-issuance except to regulated venue wallet (if used) | manage early resale risk and selling restrictions |
| Crowdfunding caps | total exposure per investor ID cannot exceed cap across all bound wallets | prevent wallet-splitting to bypass caps |
| Jurisdiction | cross-border transfers blocked until jurisdiction activated in rollout | enforce Indonesia-first pilot sequencing |
| Exceptions | exception approvals are scoped (purpose, amount, expiry) | prevent open-ended overrides |

### Reason Codes (Transfer / Action Decisioning)

Minimum set (illustrative):

- `NOT_WHITELISTED_SENDER`
- `NOT_WHITELISTED_RECEIVER`
- `KYC_EXPIRED_OR_REFRESH_REQUIRED`
- `ELIGIBILITY_CLASS_MISMATCH`
- `LOCKUP_ACTIVE`
- `CAP_EXCEEDED`
- `JURISDICTION_NOT_ACTIVE`
- `VENUE_ONLY_REQUIRED`
- `ENFORCEMENT_HOLD`
- `POLICY_VERSION_NOT_APPROVED`

Reason codes should be stable, reportable, and mapped to human-readable explanations for investor support and audit reviews.

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

### Escrow Reconciliation Workflow (Illustrative)

Goal: ensure allocations and releases are fully backed by fiat movements and that refunds are executed correctly when offerings cancel.

Suggested daily workflow:

1. Import escrow/bank statements (or statement feed) into the settlement module.
2. Match deposits to subscriptions using payer references and timestamps.
3. Flag unmatched deposits and unresolved subscriptions for operations review.
4. Produce a reconciliation report:
   - beginning balance, deposits, releases, refunds, ending balance
   - matched vs unmatched items
   - exceptions and remediation actions
5. Close decisions (minimum close met / partial accepted / cancelled) are recorded and approved.
6. Releases/refunds executed only after dual authorization; execution receipts are attached to evidence packs.

Artifacts retained:

- statement snapshots and import logs
- matching results and exception tickets
- reconciliation reports (daily and per-offering close)
- release/refund approvals and execution receipts

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

## Pilot Configuration Summary (Indonesia-First)

To reduce ambiguity during implementation, the pilot should explicitly declare:

- **scope:** Indonesia-only distribution and settlement; cross-border disabled until later phase activation
- **vehicle:** single Indonesian SPV for pilot validation
- **investor category:** retail where permitted (conservative caps), plus institutional if included
- **escrow:** single Indonesian escrow as close gate; dual authorization for releases/refunds
- **wallets:** support managed wallets and external wallets; multi-wallet policy is identity-centric with strict limits
- **secondary trading:** optional and venue-specific; not an assurance of exit; term-driven outcomes remain primary

## Non-Goals (Technical)

This annex does not:

- prescribe a specific chain, wallet vendor, or exchange partner
- provide legal categorization or licensing advice
- assume global permissionless distribution
