# Governance, Audit, and Monitoring Loop (High-Level)

This diagram shows how monitoring signals and audit evidence feed governance decisions and control improvements in a hybrid compliance architecture.

```mermaid
flowchart TD
  OPS["Operations (off-chain workflows + on-chain execution)"] --> LOGS["Evidence & logs (event store + on-chain events + escrow records)"]
  LOGS --> MON["Continuous monitoring (alerts, KPIs, control checks)"]
  MON --> GOV["Governance review (program/compliance/risk/change control)"]
  GOV --> ACTIONS["Remediation actions (policy updates, process fixes, training, vendor actions)"]
  ACTIONS --> OPS

  LOGS --> AUD["Independent assurance (audit/security/privacy reviews)"]
  AUD --> GOV

  GOV --> REPORT["Regulator/auditor reporting (read-only evidence packs)"]
  REPORT --> GOV
```
