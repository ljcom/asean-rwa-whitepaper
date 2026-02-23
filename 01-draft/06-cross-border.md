# Cross-Border Design (ASEAN Minimum)

## Objective

The objective of the cross-border design is to enable **ASEAN-regulated participation** in Indonesian underlying real estate exposures while respecting jurisdiction-specific selling restrictions, investor eligibility rules, and data protection regimes. The framework does not assume regulatory harmonization across ASEAN and is not designed for regulatory arbitrage.

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
