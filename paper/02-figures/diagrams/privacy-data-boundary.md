# Privacy Data Boundary (UU PDP / PDPA)

This diagram summarizes the privacy boundary: personal data stays off-chain under controlled access; on-chain stores only minimal operational events and cryptographic references for integrity.

```mermaid
flowchart LR
  subgraph OFF["Off-chain (Personal & Compliance Data)"]
    PII["Identity data, screening results, residency, documents"]
    ACCESS["RBAC + access logs + retention controls"]
    CONSENT["Notices + acknowledgements (as applicable)"]
  end

  subgraph ON["On-chain (Non-Personal, Minimal)"]
    BAL["Token balances + transfers"]
    REF["Cryptographic references (hash/commitment to off-chain records)"]
    EV["Tamper-evident event logs"]
  end

  PII --> ACCESS
  CONSENT --> ACCESS
  ACCESS --> REF

  BAL --> EV
  REF --> EV

  EV --> AUD["Audit exports / evidence packs (read-only)"]
```
