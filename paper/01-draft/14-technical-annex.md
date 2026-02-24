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

- investor registry (investor ID <-> wallets, eligibility class, jurisdiction tags)
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
- complaint and dispute workflows (intake, time-bound SLAs, evidence requirements)
- marketing/comms evidence retention (what was communicated, when, and to which segment)

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

### Smart Contract Scope and Minimal Interface (High-Level)

This section defines the minimum on-chain surface area required to support compliance-by-design. It is intentionally non-prescriptive about specific standards or ABIs; it focuses on control outcomes and traceability.

#### Contract Components (Illustrative)

- **Economic-rights token contract:** represents balances/ownership of economic rights; emits lifecycle events.
- **Access control / role manager:** enforces privileged roles and separation of duties.
- **Transfer restriction hook:** enforces whitelist and restriction checks (directly on-chain or via controlled integration patterns).
- **Corporate actions module (optional):** supports governed triggers for distributions/redemption windows where on-chain signaling is needed.
- **Emergency controls module:** supports holds/freezes/unfreezes under governed circumstances with event logs.

#### Role Model (Minimum)

Roles should be explicit and mapped to off-chain governance:

- `ISSUER_ADMIN` (propose actions; no unilateral critical execution)
- `COMPLIANCE_APPROVER` (approve whitelist/policy-related privileged actions; approve exceptions)
- `OPERATIONS_EXECUTOR` (execute approved actions; run reconciliations and corporate actions)
- `EMERGENCY_OPERATOR` (apply holds/freezes under documented governance, ideally with dual control)
- `VIEWER_AUDIT` (read-only in off-chain systems; on-chain is inherently readable, but privileged read methods should be avoided)

Where feasible, critical actions should require sequential approvals off-chain and be executed on-chain only after an approval window is opened and evidenced.

#### Compliance Enforcement Layer (Conceptual)

The following table illustrates control pathways at a functional level. Specific implementation details are intentionally abstracted to preserve technology neutrality.

| Control function | Operational purpose | Governance mechanism |
| --- | --- | --- |
| Issuance control | Prevent unauthorized minting | Dual-role approval (Issuer + Compliance) |
| Transfer restriction | Ensure only approved participants can transact | Jurisdiction-aware whitelist |
| Distribution logic | Allocate income according to defined entitlement | Rule-based automated execution |
| Emergency pause | Enable supervisory intervention | Multi-signature authority |
| Role assignment | Segregate operational powers | Permissioned access model |

Implementation note:

- Off-chain policy decisions (eligibility, selling restrictions, exceptions) should be traceable to on-chain outcomes via references without exposing personal data on-chain.
- The contract surface should avoid introducing permissionless liquidity mechanics (no AMM hooks assumed).

## Blockchain Network Selection (Implementation Choice)

This whitepaper is intentionally chain-agnostic at the policy level. For implementation, network selection should be treated as an engineering and risk decision driven by control outcomes, partner constraints (custody/venue), and cost/performance requirements—especially for an Indonesia-first retail pilot.

### Default Target (Pilot): EVM-Compatible (Single Network)

For the Indonesia-first retail pilot, an **EVM-compatible network** is a practical default implementation target, because it typically offers:

- broad wallet compatibility (including external wallets such as MetaMask)
- mature tooling for audits, monitoring, and smart contract assurance
- wide ecosystem support for managed wallet integrations (e.g., MPC/social login patterns)

This “EVM-first” posture is an implementation preference for pilot speed and ecosystem fit; it does not change the compliance requirements or imply that only one network family is acceptable. The pilot should remain **single-network** (avoid multi-chain complexity) unless a regulated venue/custody partner requires otherwise.

### Network Architecture Options (Illustrative)

- **Single network (public permissionless, with restricted token logic):** simplest integration and broad wallet support; requires careful governance and monitoring.
- **Permissioned or consortium network:** stronger operational control; may reduce open ecosystem benefits; requires governance of validator set and access.
- **Hybrid anchoring:** operational tokens and controls run on a controlled network, while periodic hashes/commitments are anchored to a public network for additional tamper-evidence.

The choice should not change the legal boundary (economic rights only) or the requirement for off-chain compliance.

### Selection Criteria (Retail Pilot + ASEAN Rollout)

| Criterion | Why it matters | Minimum expectation (pilot) |
| --- | --- | --- |
| Security and finality | affects settlement integrity and audit confidence | stable finality assumptions and low reorg risk |
| Cost predictability | retail usability depends on low, predictable fees | transaction costs are acceptable for retail activity |
| Performance and congestion behavior | high volatility in latency/fees breaks operations | defined operational SLOs under peak conditions |
| Control compatibility | restricted transfers, holds/freezes, role controls | supports required access control patterns and logging |
| Upgrade/change governance | prevents arbitrary admin risk | upgrade path is governed, time-delayed where feasible, auditable |
| Ecosystem support | custody, wallets, monitoring, audit tooling | supports managed wallets and external wallets; custody options exist |
| Venue/channel constraints | venues/custodians may dictate supported chains | compatible with intended regulated channels (or roadmap) |
| Data minimization | UU PDP/PDPA alignment | no PII on-chain; events are non-personal and minimal |
| Operational resilience | incident response, key compromise containment | clear emergency controls and runbooks |

### Practical Selection Process (Recommended)

1. **Define non-negotiables:** restricted transfer model, auditability, emergency controls, upgrade governance, and wallet support.
2. **List partner constraints:** custody provider(s), regulated venue roadmap (if any), and monitoring/audit tooling requirements.
3. **Run a pilot benchmark:** fee simulation, latency, and operational flows (onboarding → issuance → transfer block/allow → corporate action).
4. **Threat model review:** key management posture, admin risk, chain governance risks, and incident containment plan.
5. **Document decision:** include rationale and residual risks in governance minutes and evidence packs.

Network selection is expected to be revisited when moving from an Indonesia-only pilot to cross-border rollout, because venue/custody requirements may change.

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

## Data Retention and Access Governance (Technical Controls)

Retention and access governance must be implemented as technical controls, not only as policy statements.

### Retention Schedule (Implementation Requirement)

The system should implement configurable retention schedules for:

- KYC/AML artifacts and screening results (PII-containing)
- disclosure acknowledgements and notices
- audit logs/traceability records and evidence packs
- escrow, payout, and reconciliation artifacts

Retention controls should support:

- legal holds (preserve records for disputes/audits)
- time-bound deletion or anonymization where permitted
- complete deletion tracking (what was deleted, when, and by which authority)

### Access Controls and Logging

Minimum requirements:

- RBAC with least privilege for all evidence systems
- time-bound access grants for sensitive records (break-glass procedures for incidents)
- immutable access logs for PII and evidence pack retrieval
- periodic access reviews and automated alerts for anomalous access patterns

### Redaction and Evidence Sharing

When generating evidence packs for auditors, venues, or cross-border partners:

- generate redacted variants where possible (remove PII, keep references and decision outcomes)
- record the recipient, purpose, and scope of each shared evidence bundle
- use secure transfer mechanisms and maintain integrity checks (hashes/signatures) for shared artifacts

## Evidence Packs (Audit Exports)

Evidence packs must be reproducible and structured. Each pack should include (as applicable):

- policy version and decision logs for the relevant timeframe
- whitelist logs (grants/revocations, reasons, approvals)
- KYC/eligibility approvals and refresh history (redacted where necessary)
- escrow statements, release/refund approvals, reconciliation reports
- on-chain transaction receipts and event exports
- exception approvals and their scope/expiry

## Corporate Actions, Statements, and Entitlement Calculations

Corporate actions are the primary mechanism by which token holders receive the economic entitlements defined in the legal wrapper. In a hybrid model, calculation and evidence are typically off-chain, while on-chain is used for restricted token administration and tamper-evident logs.

### Corporate Action Types (Illustrative)

- distributions (periodic payments, rental distributions, repayment flows)
- redemption/buyback windows (if offered)
- notices and terms updates (only under governed, disclosed processes)
- enforcement actions (holds/freezes) and related notices

### Record Dates, Snapshots, and Register Integrity

To prevent disputes, the system should define:

- **record date:** the timestamp at which eligibility for a corporate action is determined
- **snapshot reference:** a reproducible reference to the token holder set at record date (on-chain state reference + off-chain registry reference)
- **reconciliation window:** time allowed to resolve breaks between on-chain balances and the off-chain register before finalizing entitlements

Where a regulated venue is used, venue trade reporting and settlement timing should be factored into the record date and reconciliation window.

### Entitlement Calculation (High-Level)

The calculation engine should:

- ingest cash flow inputs (servicer reports, rental collections, repayment schedules)
- apply the documented waterfall (fees, reserves, seniority/tranching if applicable)
- compute entitlements per **Investor ID** (identity-centric), then allocate to bound wallet addresses according to documented rules
- generate a calculation report and attach supporting evidence references

### Statements and Investor Communications

Minimum capabilities:

- investor statements per period (holdings, entitlements, paid/unpaid status, fees)
- notices for corporate actions (record dates, payment dates, pricing references, gates/suspensions if applicable)
- dispute intake workflow (time-bounded, with evidence)

For multi-wallet investors, statements should consolidate positions across all bound wallets under the same Investor ID.

### Payout Execution (Fiat Rails)

Because settlement is fiat-driven in the Indonesia-first pilot:

- payout instructions should be derived from verified investor payout profiles (off-chain)
- payouts should be executed through controlled rails with dual authorization where appropriate
- payout execution receipts must be attached to the evidence pack

### Evidence Pack Additions (Corporate Actions)

Corporate action evidence packs should include:

- record date definition and snapshot references
- reconciliation reports and break resolutions (if any)
- calculation report (inputs, waterfall steps, outputs)
- approvals (who approved, policy version, exception approvals if any)
- payout execution receipts and investor statement artifacts

### Monitoring (Corporate Actions)

Minimum monitoring indicators:

- late notices / missed record dates
- entitlement calculation exceptions (rate and root causes)
- payout failure rates and SLA breaches
- investor complaint/dispute volumes and resolution time

## Fee Computation and Waterfall Implementation (Technical Controls)

Fee and waterfall mechanics must be implemented as controlled, auditable calculations aligned to the legal wrapper. This section specifies technical control outcomes, not accounting standards.

### Inputs and Source-of-Truth

Calculation inputs should be sourced from controlled systems and retained as evidence, for example:

- servicer reports (collections, repayments, arrears, recoveries)
- property operating reports (rental collections, operating expenses)
- escrow/payout statements (cash movements)
- fee schedules and contracts (management/servicing/venue/custody)
- approved policy versions and exception approvals (if any)

### Calculation Controls

Minimum controls:

- deterministic calculation runs (same inputs → same outputs) with a unique run ID
- dual control approvals for publishing entitlements and initiating payouts
- segregation of duties between data preparation and approval
- reconciliation checks (cash available vs payouts + reserves + fees)
- explicit handling of rounding, minimum payout thresholds, and carry-over rules

### Outputs and Evidence

Each calculation run should produce:

- an entitlement ledger per Investor ID (then allocated to bound wallets if needed for on-chain signaling)
- a fee ledger (category, basis, amount, payee)
- a reserves ledger (opening/closing, movements, triggers)
- a summary report suitable for governance review

All outputs must be linked into the evidence pack for the corresponding corporate action.

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
