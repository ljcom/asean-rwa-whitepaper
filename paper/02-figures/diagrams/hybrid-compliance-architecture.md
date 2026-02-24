# Hybrid Compliance Architecture (High-Level)

This diagram shows the hybrid on-chain/off-chain compliance architecture used in this program. Personal data and regulated compliance operations remain off-chain; on-chain components focus on controlled execution and tamper-evident event logs.

```mermaid
flowchart LR
  %% Actors
  INV["Investor (ASEAN eligible)"]
  BOR["Borrower / Project SPV (Indonesia)"]
  REG["Regulator / Auditor (read-only)"]

  %% Off-chain compliance plane
  subgraph OFF["Off-chain Compliance & Operations Plane"]
    AUDITLOG["Audit logs + traceability ledger (append-only)"]
    KYC["KYC/AML + eligibility checks"]
    REGISTRY["Investor registry + wallet binding"]
    POLICY["Jurisdiction policy engine (selling restrictions)"]
    DISC["Disclosure vault + acknowledgement logs"]
    ESCROW["Escrow / segregated accounts (subscription & release controls)"]
    CORP["Corporate actions engine (distributions, redemption windows)"]
    VAL["Valuation/NAV + reporting module"]
    EVID["Evidence pack generator (audit exports)"]
    RBAC["RBAC + sequential approvals"]
  end

  %% On-chain execution plane
  subgraph ON["On-chain Execution Plane"]
    TOKEN["Economic-rights token contract(s)"]
    WHITELIST["Whitelist / transfer restriction hooks"]
    EVENTS["Event log (issuance, transfers, corporate actions)"]
  end

  %% Flows
  INV --> KYC
  KYC --> AUDITLOG
  AUDITLOG --> REGISTRY
  POLICY --> WHITELIST
  REGISTRY --> WHITELIST
  DISC --> INV
  DISC --> AUDITLOG
  INV --> ESCROW
  ESCROW --> AUDITLOG

  RBAC --> TOKEN
  WHITELIST --> TOKEN
  TOKEN --> EVENTS

  %% Corporate actions and reporting
  VAL --> CORP
  VAL --> AUDITLOG
  CORP --> RBAC
  CORP --> TOKEN
  CORP --> AUDITLOG

  %% Asset side
  BOR --> VAL
  ESCROW --> BOR

  %% Audit / regulator visibility
  EVENTS --> EVID
  AUDITLOG --> EVID
  EVID --> REG
```
