# Funding Models (Debt, Profit Participation, Sukuk, Crowdfunding)

## Purpose

This section describes how different funding models can be supported using the same hybrid compliance architecture, while maintaining the core legal boundary:

- underlying assets remain under Indonesian jurisdiction
- token represents economic rights only
- distribution and transfer are controlled through regulated channels

Each model must be documented and categorized with appropriate disclosures and governance. The framework is not intended to blur regulatory categories; it is intended to support regulated implementation.

## Indonesia Legal Wrapper Options (High-Level, Illustrative)

This whitepaper separates **legal wrappers** (which define rights, governance, disclosures, and enforceability) from **token representation** (which supports controlled administration and auditability). For Indonesian underlying assets, wrapper selection should be made with Indonesian counsel and regulator engagement as needed.

The table below is illustrative and intentionally high-level. The same economic rights can be represented in different wrappers depending on product design and permitted distribution channels.

| Funding model | Typical Indonesian wrapper patterns (illustrative) | Economic rights emphasis | Key operational implications |
| --- | --- | --- | --- |
| Debt | Project/loan SPV with contractual debt documentation; note/participation documentation tied to servicing | repayment waterfall and credit monitoring | servicing discipline, covenants, default process, escrow close controls |
| Profit participation (REIT-like) | Collective investment style wrapper (e.g., DIRE/KIK-like patterns) or structured participation agreements (as applicable) | distributable cash flows (e.g., rental income) and reporting | valuation/NAV governance, disclosures cadence, conflicts and related-party controls |
| Sukuk | Sukuk documentation set (e.g., ijarah-based) with Shariah governance artifacts | asset-backed participation return (rental yield / participation return) | Shariah oversight, use-of-proceeds governance, structure-specific evidence retention |
| Crowdfunding | Regulated crowdfunding wrapper patterns (platform/channel dependent) with caps and investor protections | capped participation rights (debt-like or profit-participation-like) | strict cap enforcement, suitability/disclosure controls, restricted transferability |

Wrapper selection does not remove the need for:

- off-chain KYC/AML and eligibility verification
- jurisdiction-aware selling restrictions and whitelist enforcement
- escrow and settlement controls (including close thresholds for debt offerings)
- auditability, evidence packs, and governance approvals

## Comparative Overview (Illustrative)

| Model | Economic rights represented | Typical cash flow basis | Key governance needs | Investor protection and compliance focus |
| --- | --- | --- | --- | --- |
| Debt | repayment claim and waterfall | scheduled payments and servicing | servicing oversight, covenants, default process | disclosure, credit risk, transfer restrictions |
| Profit participation (REIT-like) | contractual participation in distributable cash flows | net operating income and asset performance | governance, reporting, valuation oversight, related-party controls | disclosures, valuation integrity, conflicts, eligibility |
| Sukuk | asset-backed participation (e.g., ijarah) | rental yield / participation return | Shariah oversight, asset-backing governance | structure disclosure, Shariah compliance evidence |
| Crowdfunding | capped participation rights | distributions per terms; may be periodic | platform controls, caps, suitability | retail limits (where permitted), transparency, reporting |

## Token Economics (Fees, Cash Flows, and Cost Allocation)

In this program, “token economics” refers to **cash flow mechanics and fees** tied to the economic-rights instrument (debt-like repayments, profit participation distributions, sukuk participation returns, or crowdfunding entitlements). It does not refer to speculative token price mechanics.

### Fee Stack (Illustrative, Wrapper-Dependent)

Fees must be defined in the legal wrapper documents and disclosed clearly. Typical fee categories include:

- **origination/arrangement fees** (often debt/project-finance contexts)
- **management/administration fees** (registry/transfer agent, reporting, governance operations)
- **servicing fees** (loan servicing, collections, covenant monitoring)
- **custody and safeguarding fees** (where custody is required)
- **valuation and audit fees** (independent valuation inputs, assurance)
- **venue and trading fees** (where secondary trading occurs; venue fee schedules apply)
- **escrow and payment rail fees** (collection, disbursement, refunds)
- **FX and cross-border processing fees** (in later ASEAN rollout phases)

Fee disclosures should include the payer (borrower vs investor vs issuer), timing, calculation basis, and any caps.

### Cash Flow Waterfall (High-Level)

For each product model, the wrapper should define a waterfall (priority of payments), including:

- gross cash inflows (rental collections, repayments, participation returns)
- reserves (if any) and reserve release rules
- fees and expenses (with priority order)
- net amounts available for investor entitlements

### On-Chain vs Off-Chain Costs (Gas and Operations)

Because compliance and settlement are hybrid:

- **on-chain costs** (transaction fees) should be assigned explicitly: issuer-subsidized vs investor-paid vs venue-paid, with an operational policy for retail usability.
- **off-chain operational costs** (KYC, escrow, reporting, audits) should be reflected in the fee stack and evidenced through invoices/contracts and governance approvals.

This program avoids “hidden token fees”. Any transfer fees, protocol fees, or operator fees must be documented and disclosed.

### Conflicts of Interest and Related-Party Arrangements

If the platform or affiliates act in multiple roles (originator, servicer, valuation provider, market maker, distributor), the wrapper must disclose:

- the role combinations and potential conflicts
- governance controls and approval requirements
- how fees are set and reviewed

## 1) Debt Model (Fixed-Income Style)

### Problem Addressed

Debt financing for real estate requires efficient servicing, clear investor registers, and transparent credit monitoring—especially when distributed cross-border.

### Structural Solution

The token represents a debt claim and repayment waterfall defined in the issuance documents. The system supports:

- controlled issuance after subscription settlement
- investor register maintenance and transfer restrictions
- periodic payment calculations and distribution execution through governed workflows
- event logging for payment dates, notices, and covenant-related actions

### Origination Liquidity Without Platform Balance Sheet (Escrow + Close Threshold)

To reduce dependence on platform capital while preserving borrower certainty, the debt model can be structured as a **best-efforts raise with escrow and defined closing thresholds**:

1. Borrower requests financing terms and amount (e.g., up to 100% of the target size).
2. Fund manager/appraisal and legal due diligence validate the collateral and proposed terms (Indonesia), including preparation for collateral perfection and security documentation (notary/PPAT as applicable).
3. The offering is distributed to eligible investors through regulated channels; investor funds are collected into a **segregated escrow account**.
4. At a defined deadline, the raise outcome is assessed against documented thresholds:
   - if the raise meets the **minimum close** (and any other conditions precedent, including collateral perfection steps where required), closing proceeds;
   - if the raise does not meet the threshold, the borrower may be asked to **accept a partial close** (if permitted) or to cancel.
5. If cancelled, escrow funds are returned to investors according to documented procedures; no token issuance is finalized.
6. If closed, escrow releases funds to the borrower under dual authorization, and the debt economic-rights token is issued/allocated according to the final allocation.

This approach engineers **origination liquidity** through disciplined closing mechanics rather than through an open-ended platform backstop. It should be disclosed explicitly as best-efforts, with clear cancellation and refund rules.

### Regulatory Alignment

- categorize the instrument appropriately (debt/security perimeter)
- provide credit-risk and default disclosures
- ensure servicing and reporting obligations are met

### Cross-Border Implications

Debt tokens distributed across ASEAN require jurisdiction-aware selling restrictions and venue controls; secondary trading may be limited to eligible categories depending on the jurisdiction and venue.

## 2) Profit Participation Model (REIT-like Economic Rights)

### Problem Addressed

Profit participation requires consistent reporting, valuation integrity, and governance—often difficult to administer across many investors and jurisdictions.

### Structural Solution

The token represents contractual participation in distributable cash flows (e.g., rental cash flows) and related economic entitlements (as permitted by the structure). This is an economic-rights instrument and does not represent land ownership or land title. The architecture supports:

- controlled distributions linked to financial reporting cycles
- disclosure delivery and acknowledgements
- corporate action governance and auditable approvals

### Regulatory Alignment

- securities perimeter alignment and disclosure discipline
- governance expectations and related-party transaction controls
- periodic reporting and valuation governance

### Cross-Border Implications

Profit-participation structures may face stricter distribution constraints in some ASEAN jurisdictions (including collective investment style considerations depending on the wrapper). Whitelists and distributor controls are required, and liquidity is expected to fragment by venue and jurisdiction.

## 3) Sukuk Model (Shariah-Aligned, Asset-Backed Participation)

### Problem Addressed

Shariah-aligned real estate financing requires asset-backing, governance, and ongoing Shariah compliance evidence, while maintaining regulated investor protections.

### Structural Solution

The token represents Shariah-aligned economic rights (e.g., ijarah-based rental yield participation) documented in the structure. The system supports:

- controlled issuance with Shariah documentation references (off-chain)
- distribution schedules linked to rental yield / participation return
- governance workflows supporting Shariah oversight evidence and reporting

### Regulatory Alignment

- appropriate categorization under securities and Islamic finance frameworks
- disclosure of structure, asset-backing, and governance
- operational controls to ensure proceeds and cash flows remain within disclosed parameters

### Cross-Border Implications

Shariah products may have differentiated investor demand across ASEAN and may require jurisdiction-specific disclosures and approvals. Venue selection and distributor capability are material.

## 4) Crowdfunding Model (Capped Participation)

### Problem Addressed

Crowdfunding can broaden participation but requires strict caps, investor protections, suitability controls, and transparent reporting.

### Structural Solution

The token represents capped economic participation rights under documented terms. The system supports:

- eligibility gating and per-investor caps enforced off-chain and reflected in issuance controls
- disclosure delivery and acknowledgement tracking
- restrictions on transfers and resale consistent with crowdfunding constraints

### Regulatory Alignment

- comply with crowdfunding-specific limits and platform obligations (where applicable)
- emphasize investor protection: risk disclosures, cap enforcement, reporting cadence

### Cross-Border Implications

Cross-border crowdfunding is likely to be more constrained than institutional offerings. The framework assumes conservative eligibility, distributor controls, and jurisdiction-specific rollout.

## Implementation Notes: Common Control Plane

Across all models, the following controls are treated as common requirements:

- off-chain KYC/AML and investor verification
- jurisdiction-aware whitelist and selling restriction enforcement
- RBAC and sequential approvals for privileged actions
- auditable evidence packages for issuances and corporate actions

Liquidity expectations must be explicitly stated per model. Tokenization supports engineered pathways, but it does not guarantee liquidity.
