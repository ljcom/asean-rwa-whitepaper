# Figure Pack (Diagrams)

This section includes the diagram pack from `02-figures/diagrams/`.

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

# Hybrid Compliance Architecture (High-Level)

This diagram shows the hybrid on-chain/off-chain compliance architecture used in this program. Personal data and regulated compliance operations remain off-chain; on-chain components focus on controlled execution and tamper-evident event logs.

```mermaid
flowchart LR
  %% Actors
  INV["Investor (ASEAN eligible)"]
  BOR["Borrower / Project SPV (Indonesia)"]
  REG["Regulator / Auditor (read-only)"]

  %% Off-chain compliance plane
  subgraph OFF["Off-chain Compliance & Operations Plane"]
    AUDITLOG["Audit logs + traceability ledger (append-only)"]
    KYC["KYC/AML + eligibility checks"]
    REGISTRY["Investor registry + wallet binding"]
    POLICY["Jurisdiction policy engine (selling restrictions)"]
    DISC["Disclosure vault + acknowledgement logs"]
    ESCROW["Escrow / segregated accounts (subscription & release controls)"]
    CORP["Corporate actions engine (distributions, redemption windows)"]
    VAL["Valuation/NAV + reporting module"]
    EVID["Evidence pack generator (audit exports)"]
    RBAC["RBAC + sequential approvals"]
  end

  %% On-chain execution plane
  subgraph ON["On-chain Execution Plane"]
    TOKEN["Economic-rights token contract(s)"]
    WHITELIST["Whitelist / transfer restriction hooks"]
    EVENTS["Event log (issuance, transfers, corporate actions)"]
  end

  %% Flows
  INV --> KYC
  KYC --> AUDITLOG
  AUDITLOG --> REGISTRY
  POLICY --> WHITELIST
  REGISTRY --> WHITELIST
  DISC --> INV
  DISC --> AUDITLOG
  INV --> ESCROW
  ESCROW --> AUDITLOG

  RBAC --> TOKEN
  WHITELIST --> TOKEN
  TOKEN --> EVENTS

  %% Corporate actions and reporting
  VAL --> CORP
  VAL --> AUDITLOG
  CORP --> RBAC
  CORP --> TOKEN
  CORP --> AUDITLOG

  %% Asset side
  BOR --> VAL
  ESCROW --> BOR

  %% Audit / regulator visibility
  EVENTS --> EVID
  AUDITLOG --> EVID
  EVID --> REG
```

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

# Issuance Lifecycle (High-Level)

This diagram summarizes the issuance lifecycle for an escrow-based offering with close thresholds and restricted token issuance.

```mermaid
flowchart TD
  A["Product terms + disclosures prepared (wrapper)"] --> B["Investor onboarding (KYC/AML + eligibility)"]
  B --> C["Wallet binding + whitelist segmentation"]
  C --> D["Offering window (subscriptions)"]
  D --> E["Funds to segregated escrow"]
  E --> F{"Minimum close threshold met?"}

  F -- "No" --> G["Borrower: accept partial close or cancel"]
  G -- "Cancel" --> H["Refund from escrow; offering void"]

  G -- "Partial accepted" --> I["Finalize allocation (partial)"]
  F -- "Yes" --> J["Finalize allocation (full)"]

  I --> K["Conditions precedent satisfied (incl. collateral/security docs as applicable)"]
  J --> K
  K --> L["Dual authorization: escrow release to borrower"]
  L --> M["Issuance executed (mint/allocate) with transfer restrictions"]
  M --> N["Statements + corporate actions + monitoring + evidence packs"]
```

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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
  PLAT --- NOTE1["Orchestration: policies, whitelist, approvals, evidence packs, audit logs + traceability"]
  ISS --- NOTE2["Single-SPV pilot; later multi-vehicle issuance using same orchestration standard"]
```

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

# Venues and Fiat Ramps (High-Level Overview)

This diagram summarizes how regulated venues and fiat on/off ramps relate to the economic-rights token lifecycle. It highlights that NFTs or crypto exchange rails do not change the regulatory perimeter of the economic rights represented.

```mermaid
flowchart LR
  subgraph OFF["Off-chain compliance + settlement"]
    KYC["KYC/AML + eligibility"]
    WL["Jurisdiction-aware whitelist"]
    ESC["Escrow / fiat rails (on-ramp/off-ramp)"]
    EVID["Evidence packs (audit logs + on-chain events)"]
  end

  subgraph ON["On-chain (controlled execution)"]
    TOK["Economic-rights token"]
    LOG["Event logs"]
  end

  subgraph VEN["Venues / channels (jurisdiction-specific)"]
    PRI["Primary distribution (regulated intermediaries)"]
    SEC["Secondary trading (regulated venue where permitted)"]
    NFT["NFT marketplace (technical wrapper only)"]
    CEX["Crypto exchange / DAX (contextual; not default)"]
  end

  KYC --> WL
  WL --> TOK
  ESC --> PRI
  PRI --> TOK
  TOK --> LOG
  LOG --> EVID

  TOK --> SEC
  TOK --> NFT
  TOK --> CEX

  SEC --> EVID
  NFT --> EVID
  CEX --> EVID
```

```{=openxml}
<w:p><w:r><w:br w:type="page"/></w:r></w:p>
```

```{=latex}
\newpage
```

```{=html}
<div style="page-break-before: always;"></div>
```

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
