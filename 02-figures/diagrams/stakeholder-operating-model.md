# Stakeholder and Operating Model (High-Level)

This diagram summarizes key stakeholders and interactions in the program. It reflects a single-SPV pilot that can later scale to multi-vehicle issuance under one standardized orchestration/control plane. The platform is positioned as an operator/orchestrator, not a regulator.

```mermaid
flowchart LR
  %% Core parties
  INV["Investors (ASEAN eligible)"]
  BOR["Borrower / Project Sponsor (Indonesia)"]
  ISS["Issuer vehicle (SPV / DIRE / KIK)"]
  PLAT["Platform (orchestrator/operator)"]

  %% Regulated / assurance functions
  KYC["KYC/AML provider (off-chain)"]
  ESC["Escrow / bank / payout rails"]
  VAL["Valuer / appraiser"]
  SERV["Servicer / asset manager (if applicable)"]
  VEN["Regulated venue / exchange (where permitted)"]
  CUST["Custodian (where required)"]
  AUD["Auditor / assurance"]
  REG["Regulator interface (read-only)"]

  %% Primary lifecycle
  BOR --> VAL
  BOR --> SERV
  BOR --> ISS

  INV --> KYC
  KYC --> PLAT
  VAL --> PLAT
  SERV --> PLAT

  INV --> ESC
  ESC --> ISS
  PLAT --> ESC

  ISS --> PLAT
  PLAT --> VEN
  PLAT --> CUST

  %% Reporting / oversight
  PLAT --> AUD
  AUD --> REG
  PLAT --> REG

  %% Notes
  PLAT --- NOTE1["Orchestration: policies, whitelist, approvals, evidence packs, event-sourced logs"]
  ISS --- NOTE2["Single-SPV pilot; later multi-vehicle issuance using same orchestration standard"]
```
