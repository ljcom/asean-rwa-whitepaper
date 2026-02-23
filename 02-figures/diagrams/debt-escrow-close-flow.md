# Debt Offering Flow (Escrow + Closing Threshold)

This diagram illustrates a capital-light origination model where borrower drawdown depends on escrowed subscriptions meeting a documented close threshold. The token represents economic rights only; KYC/AML and eligibility are performed off-chain.

```mermaid
flowchart TD
  A["Borrower request (amount, terms)"] --> B["Fund manager & appraisal validation (Indonesia collateral)"]
  B --> C["Offering launched to eligible investors (ASEAN; selling restrictions)"]
  C --> D["Subscriptions collected into segregated escrow"]
  D --> E{"Minimum close threshold met by deadline?"}

  E -- "No" --> F["Borrower decision: accept partial close?"]
  F -- "No (cancel)" --> G["Refund subscriptions from escrow"]
  G --> H["Offering void; no token issuance finalized"]

  F -- "Yes (partial close)" --> I["Finalize allocation for partial close"]
  E -- "Yes" --> J["Finalize allocation for full close"]

  I --> K["Conditions precedent satisfied (legal, collateral, approvals)"]
  J --> K
  K --> L["Escrow release to borrower (dual authorization)"]
  L --> M["Issue/allocate debt economic-rights token (restricted transfer)"]
  M --> N["Servicing, reporting, distributions (governed corporate actions)"]
```
