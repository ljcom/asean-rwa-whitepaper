# Venues and Fiat Ramps (High-Level Overview)

This diagram summarizes how regulated venues and fiat on/off ramps relate to the economic-rights token lifecycle. It highlights that NFTs or crypto exchange rails do not change the regulatory perimeter of the economic rights represented.

```mermaid
flowchart LR
  subgraph OFF["Off-chain compliance + settlement"]
    KYC["KYC/AML + eligibility"]
    WL["Jurisdiction-aware whitelist"]
    ESC["Escrow / fiat rails (on-ramp/off-ramp)"]
    EVID["Evidence packs (event-sourced)"]
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
