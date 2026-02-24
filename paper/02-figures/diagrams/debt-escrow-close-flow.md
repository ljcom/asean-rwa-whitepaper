# Debt Offering Flow (Escrow + Closing Threshold)

This diagram illustrates a capital-light origination model where borrower drawdown depends on escrowed subscriptions meeting a documented close threshold. The token represents economic rights only; KYC/AML and eligibility are performed off-chain.

```mermaid
flowchart TD
  A["Borrower request (amount, terms)"] --> B["Fund manager & appraisal validation (Indonesia collateral)"]
  B --> C["Legal structuring + security documentation prep (Indonesia; notary/PPAT as applicable)"]
  C --> D["Offering launched to eligible investors (ASEAN; selling restrictions)"]
  D --> E["Subscriptions collected into segregated escrow"]
  E --> F{"Minimum close threshold met by deadline?"}

  F -- "No" --> G["Borrower decision: accept partial close?"]
  G -- "No (cancel)" --> H["Refund subscriptions from escrow"]
  H --> I["Offering void; no token issuance finalized"]

  G -- "Yes (partial close)" --> J["Finalize allocation for partial close"]
  F -- "Yes" --> K["Finalize allocation for full close"]

  J --> L["Conditions precedent satisfied (including notarized security docs/registration where required)"]
  K --> L
  L --> M["Escrow release to borrower (dual authorization)"]
  M --> N["Issue/allocate debt economic-rights token (restricted transfer)"]
  N --> O["Servicing, reporting, distributions (governed corporate actions)"]
```
