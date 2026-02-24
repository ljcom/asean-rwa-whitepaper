# Cross-Border Jurisdiction Controls (ASEAN Minimum)

This diagram illustrates how cross-border participation is managed via jurisdiction-aware policies, eligibility categories, and venue-specific controls. The goal is auditable compliance enforcement, not regulatory arbitrage.

```mermaid
flowchart TD
  A["Investor onboarding (off-chain)"] --> B["Jurisdiction tagging + investor classification"]
  B --> C["Jurisdiction-aware whitelist segmentation"]
  C --> D["Policy-controlled transfer rules"]

  D --> E{"Transfer / trade request"}
  E --> F["Allowed (meets eligibility + selling restrictions)"]
  E --> G["Blocked (policy violation)"]

  F --> H["Venue-specific controls (where trading permitted)"]
  H --> I["Regulated venue surveillance + reporting hooks"]

  D --> J["Evidence retention (disclosures, approvals, logs)"]
  G --> J
  I --> J

  J --> K["Audit / regulator review (read-only)"]
```
