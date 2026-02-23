# Executive Summary

## Purpose and Minimum Scope (ASEAN)

This whitepaper presents a compliance-oriented framework for real estate tokenization designed for deployment across ASEAN, with the underlying real estate assets domiciled in Indonesia. The objective is to enable regulated issuance, distribution, lifecycle administration, and secondary trading of tokens that represent **economic rights only**, while maintaining Indonesian property and land-title legal realities off-chain.

This framework positions Indonesia as a compliant issuance hub for ASEAN-regulated real estate exposure.

The minimum intended operating footprint is ASEAN. Cross-border participation is addressed through jurisdiction-aware controls and disclosures aligned to:

- Indonesia: OJK framework and UU PDP for personal data protection
- Singapore: MAS regulatory perimeter and PDPA requirements
- Malaysia: SC framework and PDPA requirements

This document does not assume permissionless global distribution or unregulated secondary markets. It describes a structure that is designed to support regulatory engagement, licensing pathways, and staged deployment (including controlled sandboxes where available).

This framework is not designed to bypass securities regulation through tokenization. It is structured to operate within applicable licensing, disclosure, selling restrictions, investor eligibility, and market supervision requirements across ASEAN jurisdictions.

## Asset and Token Model (Indonesia Underlying, Economic Rights Only)

The underlying asset jurisdiction is Indonesia. The token is structured to represent **economic rights** associated with an Indonesian real estate exposure (e.g., revenue participation, debt claim, rental yield participation, or other contractual cash flow rights), rather than ownership of land title or direct legal interest in the land registry.

### Legal Wrapper vs. Token Representation

This framework distinguishes between (i) the **legal wrapper** that creates and governs investor entitlements and (ii) the **token** that represents those entitlements for controlled administration:

- **Legal wrapper (off-chain legal stack):** Indonesian structures and contractual documentation (e.g., SPV/DIRE/KIK and associated agreements) define cash flow rights, governance, disclosures, servicing, investor protections, and enforceability.
- **Token (on-chain/off-chain administration layer):** represents the economic rights described in the documentation and enables controlled issuance, transfer restrictions, corporate actions, and tamper-evident event logs.

Tokenization does not alter the underlying property jurisdiction or remove the need for licensing, disclosures, selling restrictions, and regulated distribution channels.

Key legal and structural commitments:

- No transfer of land title via blockchain.
- Asset governance and legal enforceability remain within Indonesian legal structures.
- Token holders receive contractual economic entitlements defined in the issuance documents and enforced through the off-chain legal stack.

This approach is intended to reduce legal ambiguity by separating (i) Indonesian asset ownership and control from (ii) tokenized economic entitlements that may be distributed to eligible investors across ASEAN, subject to local securities law.

## Compliance-by-Design Architecture (Hybrid On-Chain / Off-Chain)

The proposed architecture is **hybrid by design**. It uses on-chain components for controlled token issuance and transfer, while retaining regulated compliance functions and sensitive data off-chain.

**Core principles**

- Off-chain KYC/AML and investor verification are mandatory.
- On-chain records store only the minimum necessary references (e.g., cryptographic commitments) to support auditability and integrity.
- Personal data is not stored on-chain; data minimization is the default.
- Role-based access control (RBAC) governs privileged actions (issuance, corporate actions, freezes, redemptions).
- Sequential / dual authorization supports separation of duties for critical actions.
- Regulator visibility can be supported through controlled reporting and audit interfaces.

**Operational implication**

The token is treated as part of a broader regulated workflow rather than an autonomous instrument. Transfers, redemptions, and corporate actions are executed subject to policy rules, whitelists, and event approvals that reflect jurisdictional constraints and investor eligibility requirements.

## Cross-Border Distribution Within ASEAN

ASEAN distribution introduces jurisdictional fragmentation across securities regulation, investor eligibility, marketing constraints, and data protection. This framework treats cross-border as a first-class requirement and proposes a jurisdiction-aware access model:

- A whitelist that is segmented by jurisdiction and investor classification (e.g., institutional / accredited where applicable).
- Policy-driven transfer rules that prevent routing to non-eligible wallets.
- Distributor and exchange integration that can apply local selling restrictions and disclosure packages.
- Governance and reporting that supports regulator inquiries without exposing personal data on-chain.

The intent is interoperability across ASEAN without assuming regulatory harmonization. The system is structured to support phased expansion country-by-country, with clear controls that can be audited and adjusted as regulatory guidance evolves.

## Supported Funding Models

The framework supports multiple regulated funding models to reflect investor demand and local market practice. The same compliance architecture can support different economic-rights configurations, provided issuance documentation clearly specifies entitlements, risk, and governance.

### Summary of models (illustrative)

| Funding model | Token represents | Primary use | Key regulatory alignment considerations | Liquidity expectation |
| --- | --- | --- | --- | --- |
| Debt | Debt claim and repayment waterfall | Fixed-income style financing | Securities / debt instrument perimeter, disclosure, servicing, default handling | Engineered via exchange pathways and redemption terms; not guaranteed |
| Profit participation (REIT-like) | Contractual participation in distributable cash flows (as permitted) | Income participation | Securities / collective investment perimeter (depending on wrapper), governance, information rights, related-party controls | Dependent on listing venue and market structure |
| Sukuk | Asset-backed participation (e.g., ijarah-based rental yield participation) | Shariah-compliant financing | Shariah structuring and supervisory oversight, asset-backing, prohibition of riba | Dependent on venue adoption and market making arrangements |
| Crowdfunding | Economic participation with caps and investor protections | Broader participation under regulated limits | Retail constraints (where applicable), caps, suitability, disclosures | Typically limited; must be engineered and may be periodic |

Each model requires explicit alignment to local regulatory categories and licensing. This whitepaper focuses on a reusable compliance and control plane, rather than prescribing a single legal wrapper for all ASEAN jurisdictions.

## Liquidity Engineering (Not Automatic Liquidity)

Tokenization does not automatically create liquidity. Liquidity must be engineered through market design, regulated venues, and investor protection mechanisms.

This framework emphasizes liquidity engineering through the following components:

- **Dual-market model:** primary issuance and lifecycle operations coordinated with secondary trading venues where permitted.
- **Regulated exchange integration:** listing and trading subject to venue rules, surveillance, and participant eligibility.
- **Market maker model:** optional arrangements to support orderly markets, subject to local rules and disclosures.
- **NAV reference / pricing integrity:** integration with reference data (including independent valuation inputs) to support transparent pricing and periodic reporting.
- **Redemption and liquidity windows:** defined mechanisms for redemption or buyback under documented terms, supporting investor exits without implying continuous liquidity.

Where 24/7 trading capability is feasible from a technical perspective, it remains subject to exchange adoption, market participant availability, and regulatory constraints. The design goal is to enable liquidity pathways that are measurable, governed, and auditable.

Liquidity fragmentation across ASEAN jurisdictions is expected and must be managed through venue-specific controls.

## Benefits, Limitations, and Risk Posture

**Expected benefits (subject to regulatory alignment and operational execution)**

- Improved transparency and auditability of issuance and transfers through tamper-evident records.
- More efficient administration of investor entitlements (distributions, redemptions, corporate actions) via controlled automation.
- Stronger cross-border controls through jurisdiction-aware whitelisting and policy enforcement.
- Privacy-preserving compliance through off-chain handling of personal data with on-chain integrity references.

**Key limitations (explicitly acknowledged)**

- Regulatory approvals, licensing, and jurisdiction-by-jurisdiction compliance remain prerequisites.
- Tokens represent economic rights only and do not change Indonesian land-title requirements.
- Secondary trading and liquidity depend on venue availability and market structure; liquidity is not guaranteed.
- Cross-border scale requires careful operational governance, distributor controls, and data protection coordination.

## Implementation Approach and Next Steps

This whitepaper proposes a staged approach designed to support regulator engagement and operational readiness:

1. **Indonesia foundation:** define the Indonesian asset-holding structure, servicing model, data controller responsibilities, and issuance documentation for economic rights.
2. **Compliance control plane:** implement the hybrid on-chain/off-chain workflows (off-chain KYC, jurisdiction-aware whitelist, RBAC, sequential approval, reporting).
3. **Venue and distribution integration:** integrate regulated exchanges and/or regulated distribution channels aligned with each ASEAN jurisdiction’s selling restrictions.
4. **Liquidity design and monitoring:** specify market making policies (if used), pricing integrity inputs, redemption terms, and ongoing market surveillance metrics.
5. **Sandbox and phased rollout:** pilot in controlled environments where applicable, expand coverage as regulatory feedback and operational performance justify scaling.

The remainder of this whitepaper details the problem statement, regulatory boundaries, architecture, cross-border design, privacy model, liquidity strategy, supported funding models (including Shariah-compliant structures), risks, mitigations, and an implementation roadmap for ASEAN deployment with Indonesian underlying assets.
