# Escrow Reconciliation Workflow (High-Level)

This diagram illustrates daily reconciliation and close-day controls for escrow-based offerings. It is designed to support auditability and investor protection (accurate allocations, timely refunds, and controlled releases).

```mermaid
flowchart TD
  A["Escrow/bank statement feed"] --> B["Import + normalize transactions"]
  B --> C["Match deposits <-> subscriptions (references/timestamps)"]
  C --> D{"Unmatched items?"}
  D -- "Yes" --> E["Ops review + exception ticket + remediation"]
  D -- "No" --> F["Reconciliation report (balances, matches, exceptions)"]

  F --> G{"Close decision (deadline)"}
  G -- "Minimum close met" --> H["Record close decision + approvals"]
  G -- "Partial close accepted" --> H
  G -- "Cancelled" --> I["Refund approvals + execution"]

  H --> J["Dual authorization: escrow release"]
  J --> K["Disburse to borrower"]
  I --> L["Refund to investors"]

  K --> M["Attach receipts + reports to evidence pack"]
  L --> M
  E --> M
```
