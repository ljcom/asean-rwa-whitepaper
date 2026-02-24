# Secondary Market and Exit Pathways (High-Level)

This diagram summarizes how investors may exit within a regulated, hybrid compliance framework. Secondary trading is venue-specific and not an assurance of liquidity; term-driven outcomes (e.g., maturity repayment) remain primary for many debt-like exposures.

```mermaid
flowchart TD
  A["Investor holds economic-rights token"] --> B{"Exit pathway available?"}

  B --> C["Secondary sale (regulated venue where permitted)"]
  B --> D["Controlled off-venue transfer (eligible + whitelisted)"]
  B --> E["Redemption / buyback window (if offered)"]
  B --> F["Term-driven outcome (maturity/termination)"]

  C --> G["Eligibility + selling restrictions + venue rules"]
  D --> H["Policy checks + evidence retention"]
  E --> I["Gates/suspension triggers + pricing reference + disclosures"]
  F --> J["Debt: repayment waterfall / Profit participation: wind-up rules / Sukuk: structure termination"]

  G --> K["On-chain events + off-chain event store + reconciliations"]
  H --> K
  I --> K
  J --> K

  K --> L["Statements, audit evidence packs, and regulator visibility (read-only)"]
```
