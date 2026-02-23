# Cross-Border Design (ASEAN Minimum)

## Objective

The objective of the cross-border design is to enable **ASEAN-regulated participation** in Indonesian underlying real estate exposures while respecting jurisdiction-specific selling restrictions, investor eligibility rules, and data protection regimes. The framework does not assume regulatory harmonization across ASEAN and is not designed for regulatory arbitrage.

Reference diagram: `02-figures/diagrams/cross-border-jurisdiction-controls.md`.

This whitepaper assumes an **Indonesia-first pilot** (domestic distribution and settlement) followed by phased rollout to additional ASEAN jurisdictions. Cross-border controls are therefore specified as reusable design requirements that can be activated jurisdiction-by-jurisdiction once legal pathways and operating partners are in place.

## Jurisdictional Constraints Informing the Approach

Cross-border design in ASEAN is shaped by three recurring realities:

- **Classification variability:** the same economic rights may be treated differently depending on wrapper, distribution, and local categories.
- **Channel dependency:** both primary distribution and secondary trading are typically constrained to regulated channels/venues (where permitted).
- **Privacy and accountability:** personal data handling (including cross-border transfers) must be governed under UU PDP/PDPA obligations.

As a result, the architecture prioritizes jurisdiction-aware controls and auditable evidence over assumptions of uniform cross-border portability.

## Cross-Border Operating Model

### Jurisdiction-Aware Participation

Cross-border participation is implemented through:

- **jurisdiction tagging** (investor jurisdiction, distribution jurisdiction, venue jurisdiction)
- **eligibility classification** (institutional/accredited/other permitted categories)
- **policy-controlled transfers** (whitelists and rule checks)

This ensures the system can enforce conditions such as:

- who can participate
- where marketing and distribution can occur
- how resale/transfer restrictions are applied

### Distribution Channels

Primary distribution is expected to occur via regulated channels (e.g., licensed distributors/placement agents) with:

- appropriate disclosures and risk statements
- investor suitability/appropriateness checks where required
- evidence retention for audits and regulator inquiries

### Secondary Trading Pathways

Secondary trading, where permitted, is mediated through regulated venues and venue-specific rules. The architecture supports:

- venue onboarding integration (or coordination with issuer onboarding)
- trading restrictions tied to the whitelist and jurisdiction policies
- surveillance and reporting hooks (subject to venue capability)

Liquidity fragmentation across ASEAN jurisdictions is expected and must be managed through venue-specific controls and rollout sequencing.

## Market Infrastructure: Venues, Exchanges, NFTs, and Fiat Ramps

This framework distinguishes market infrastructure by **regulatory function**, because the same technology (tokens) may fall under different rules depending on the rights represented and the distribution/trading channel.

### 1) Regulated Securities / Capital Markets Venues (Primary Target for Economic-Rights Tokens)

Economic-rights tokens that represent investment entitlements (debt-like repayment claims, profit participation, sukuk participation, or regulated crowdfunding interests) are generally expected to sit within securities / capital markets perimeters depending on the wrapper and jurisdiction. As a result, the preferred trading and distribution pathways are regulated capital markets venues or regulated distribution channels that can:

- enforce investor eligibility and selling restrictions
- support market conduct controls and surveillance (where trading occurs)
- provide auditable reporting and evidence retention

This whitepaper therefore treats “exchange integration” as **venue-specific** and aligned with regulated market infrastructure, not as permissionless crypto trading.

### 2) Crypto Exchanges / Digital Asset Exchanges (Contextual, Not Default)

Crypto exchanges and digital asset exchanges are commonly regulated with a focus on AML/CFT and trading of crypto assets. They can be relevant to this program only if:

- the venue is permitted to list/handle the relevant category of token under local rules; and
- the venue can support jurisdiction-aware eligibility and transfer restrictions; and
- listing and disclosure requirements are compatible with the product’s regulatory perimeter.

Where those conditions cannot be met, crypto exchanges are not treated as appropriate venues for economic-rights tokens.

### 3) NFT Marketplaces / NFT Exchanges (Only as a Technical Wrapper, Not a Regulatory Shortcut)

NFTs can be used as a technical representation for unique positions (e.g., a specific debt note series or tranche) but they do not change the regulatory nature of the rights represented. If an NFT conveys investment/economic entitlements, it should be governed by the same controls as other economic-rights tokens:

- off-chain identity and KYC/AML
- jurisdiction-aware whitelist and policy enforcement
- venue- and channel-specific selling restrictions

This framework does not tokenize land title, and does not rely on NFT marketplaces as a compliance bypass.

### 4) Fiat On/Off Ramps (Escrow, Settlement, and Local Currency Constraints)

Fiat on/off ramps are treated as part of the off-chain compliance and settlement plane:

- investor subscriptions are collected into segregated escrow accounts
- disbursements occur only after documented conditions precedent and dual authorization
- distributions/redemptions (if offered) return funds via controlled payout rails

**Indonesia currency constraint:** domestic payment and settlement flows in Indonesia are designed around Rupiah usage requirements and central-bank payment system rules. This reinforces the hybrid approach: settlement for Indonesian flows is handled through regulated fiat rails and escrow, while on-chain components focus on controlled token administration and auditability.

**ASEAN implication (phased rollout):** when extending beyond an Indonesia-first pilot, cross-border subscriptions may require local collection and FX processes via regulated intermediaries, with evidence retention and jurisdiction-aware eligibility controls.

### Escrow Strategy for Phased Rollout (High-Level)

To reduce operational complexity in the pilot while keeping the model extensible:

- **Pilot default:** a single Indonesian escrow/segregated account structure is used as the closing gate for Indonesian underlying assets.
- **Cross-border extension (later):** add jurisdiction-specific collection and payout partners (local rails) and, only where required, local escrow arrangements—while maintaining the same evidence and approval standards across all flows.

## Regulatory Design Constraints (ASEAN Minimum, High-Level)

The following high-level constraints are included to justify the design choices in this section. They are non-exhaustive and do not replace jurisdiction-specific legal analysis.

Related mapping table: `02-figures/tables/regulatory-constraint-control-mapping.md`.

| Constraint area | Cross-border impact | Design response |
| --- | --- | --- |
| Selling restrictions and investor eligibility | Eligibility may differ by jurisdiction; resale may be constrained | Jurisdiction-aware whitelist segmentation and policy-driven transfer controls |
| Distribution channel requirements | Cross-border distribution often requires regulated intermediaries and evidence retention | Distributor integration patterns and disclosure acknowledgement tracking |
| Venue access and market conduct | Trading access differs by venue; surveillance expectations apply where trading is permitted | Venue-specific controls, phased rollout, and auditable transfer enforcement |
| Data protection and cross-border transfers | More parties and jurisdictions increase privacy risk surface | Off-chain personal data boundary; controlled access; accountable controller/processor roles |
| Operational accountability across parties | Multi-party operations introduce control gaps if responsibilities are unclear | RBAC, sequential approvals, and standardized evidence packages |

## Compliance Control Mechanisms

### Jurisdiction-Aware Whitelist

The whitelist is segmented by jurisdiction and investor eligibility category. Transfers require that:

- the receiving wallet is approved for the relevant jurisdictional rule-set; and
- the transfer does not violate selling restrictions or lock-up requirements.

### Selling Restriction Enforcement (Illustrative)

Controls may include:

- lock-up periods after issuance
- transfer limits by investor category
- restrictions on marketing and solicitation by jurisdiction
- venue-only trading for specific jurisdictions

### Evidence and Auditability

Cross-border distribution requires evidence packages that can be produced on demand:

- onboarding/eligibility outcomes (off-chain)
- disclosures delivered and acknowledged (off-chain)
- issuance and transfer event logs (on-chain)
- reconciliation of on-chain events with off-chain registers (off-chain)

## Regulatory Alignment (ASEAN Minimum)

The architecture is structured to support engagement within:

- Indonesia (OJK perimeter; UU PDP)
- Singapore (MAS perimeter; PDPA)
- Malaysia (SC perimeter; PDPA)

The whitepaper does not claim that a single structure is universally accepted across all ASEAN jurisdictions. Instead, it proposes:

- a consistent control plane (hybrid compliance architecture)
- modular jurisdiction-specific rule sets
- staged rollout with legal validation and regulator engagement per market

## Cross-Border Data Protection Considerations

Cross-border operations can involve data transfers (e.g., to distributors, venues, service providers). The framework therefore assumes:

- data minimization and purpose limitation
- controlled cross-border transfer mechanisms consistent with applicable laws
- clear data controller/processor roles and breach/incident procedures

Personal data remains off-chain and is managed through controlled access; on-chain records store only minimal integrity references.

## Limitations and Residual Risks

- Cross-border participation may remain limited to institutional or eligible categories depending on local rules.
- Secondary trading may be restricted or unavailable in some jurisdictions; access can differ by venue.
- Operational governance across multiple parties is complex and requires clear accountability and contracts.

These limitations are treated as design inputs and are addressed through venue selection, phased rollout, and robust compliance operations.
