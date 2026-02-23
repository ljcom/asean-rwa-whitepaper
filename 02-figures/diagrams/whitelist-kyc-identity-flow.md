# Whitelist, KYC, and Identity Flow (Off-Chain Control Plane)

This diagram shows the compliance flow for onboarding, wallet binding, whitelist segmentation, and transfer decisioning. KYC/AML and personal data handling remain off-chain; on-chain stores only non-personal eligibility signals and event logs.

```mermaid
flowchart TD
  A["Investor applies (ASEAN)"] --> B["KYC/AML + eligibility checks (off-chain)"]
  B --> C["Assign pseudonymous Investor ID (off-chain)"]
  C --> D["Investor proves wallet control"]
  D --> E["Bind wallet <-> Investor ID + jurisdiction tags + eligibility class"]
  E --> F["Whitelist grant (segmented by jurisdiction/product/venue rules)"]

  F --> G{"Transfer / trade request"}
  G --> H["Policy checks: whitelist + selling restrictions + lock-ups/caps + venue-only rules"]
  H -- "Pass" --> I["Transfer allowed (on-chain)"]
  H -- "Fail" --> J["Transfer blocked (on-chain)"]

  I --> K["Event log (on-chain) + off-chain event store (append-only)"]
  J --> K

  L["Status change (screening flag / expired docs)"] --> M["Whitelist revoke / restrict (governed approval)"]
  M --> K
```
