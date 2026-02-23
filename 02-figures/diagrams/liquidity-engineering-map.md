# Liquidity Engineering Map (Not Automatic Liquidity)

This diagram shows the engineered liquidity pathways: primary-market closing mechanics (including escrow + close threshold for debt), regulated venue strategy, optional market making, NAV reference governance, and documented redemption mechanisms (if offered).

```mermaid
flowchart TD
  A["Primary offering (regulated distribution)"] --> B["Off-chain KYC/AML + eligibility"]
  B --> C["Subscriptions to segregated escrow"]
  C --> D{"Minimum close threshold met?"}
  D -- "No" --> E["Borrower: accept partial close or cancel"]
  E -- "Cancel" --> F["Refund from escrow; offering void"]
  D -- "Yes / Partial accepted" --> G["Close + disburse to borrower (dual authorization)"]
  G --> H["Issue/allocate economic-rights token (restricted transfer)"]

  H --> I["Secondary pathways (where permitted)"]
  I --> J["Regulated venue listing / integration"]
  J --> K["Optional market maker (governed, disclosed)"]

  H --> L["NAV/valuation governance (pricing integrity)"]
  L --> J

  H --> M["Redemption / liquidity windows (if offered)"]
  M --> N["Gates/suspension triggers + disclosures"]
```
