# Stakeholders and Roles

## Overview

Real estate tokenization for ASEAN distribution requires coordinated roles across legal, compliance, operational, market infrastructure, and technology domains. This section identifies the stakeholders assumed in this framework and their responsibilities in a hybrid on-chain/off-chain model for Indonesian underlying assets.

## Operating Model Summary (Illustrative)

The table below summarizes the operating roles typically required to run an ASEAN-distributed program with Indonesian underlying assets. Exact role allocation depends on the chosen legal wrapper, licensing pathway, and jurisdiction-specific requirements.

| Function | Typical accountable party | Key responsibilities (high-level) | Evidence / outputs (illustrative) |
| --- | --- | --- | --- |
| Issuer / originator | Issuer/originator | product definition, disclosures, governance, ongoing obligations | disclosure pack, notices, approvals, periodic reporting |
| Asset-holding and enforceability | Indonesian SPV / DIRE / KIK (as applicable) | hold/operate Indonesian property exposure; enforce contractual rights | legal docs, asset registers, servicing agreements |
| Fund management / asset management (if applicable) | Fund manager / asset manager | asset oversight, performance monitoring, cash flow governance | asset reports, valuation inputs, governance minutes |
| Valuation / appraisal | Independent valuer/appraiser | valuation inputs and methodology governance | valuation reports, NAV inputs, update logs |
| KYC/AML + eligibility | Regulated/approved KYC provider + compliance function | identity verification, screening, eligibility classification, monitoring | onboarding records, screening logs, eligibility decisions |
| Investor registry / transfer agent | Registry/transfer agent function | authoritative register; wallet binding; transfer restrictions evidence | registry snapshots, whitelist logs, reconciliation exports |
| Escrow and fiat settlement rails | Bank/custodian/escrow agent (as applicable) | segregated accounts, controlled releases/refunds, payout rails | escrow statements, release approvals, refund logs |
| Tokenization operator (technology) | Platform operator / technology provider | operate hybrid workflows, policy enforcement, audit logging | system logs, event store exports, control reports |
| Trading venue (where permitted) | Regulated venue / exchange | venue onboarding coordination, surveillance, trade rule enforcement | trade reports, surveillance outputs, venue rule evidence |
| Custody (where required) | Custodian | safeguarding, access controls, operational governance | custody policies, access logs, audit reports |
| Audit / assurance | Auditor / assurance provider | audit evidence packs, control assurance, financial audit | audit reports, assurance statements, findings logs |
| Regulator interface (read-only) | Program governance | structured reporting and evidence access | evidence packs, reconciliations, supervisory reports |

Data controller/processor responsibilities for personal data must be explicitly assigned in the operating model, including for cross-border processing and evidence retention.

## Core Stakeholders

### Regulators and Supervisory Authorities

Regulators set the perimeter for issuance, distribution, market conduct, and data protection. The framework is designed to support regulator visibility through auditable controls and structured reporting, without implying pre-approval.

Examples (ASEAN minimum scope):

- Indonesia: OJK; data protection regulator under UU PDP regime
- Singapore: MAS; PDPA enforcement authority
- Malaysia: SC; PDPA enforcement authority

### Issuer / Originator

The issuer/originator sources the Indonesian underlying asset exposure, defines token economic rights, and is accountable for disclosures and ongoing obligations to token holders.

Responsibilities:

- Asset selection, due diligence, and ongoing asset management oversight
- Disclosure package (risk, cash flow model, valuation approach, governance)
- Corporate actions, distributions, and servicing oversight

### Asset-Holding Structure (SPV / DIRE / KIK)

The Indonesian asset-holding structure is the legal anchor for ownership and enforceability. It remains the primary locus for asset governance and contractual obligations.

Responsibilities:

- Own/hold the Indonesian underlying asset exposure
- Define contractual entitlements backing the economic rights token
- Maintain legal documentation and enforceability mechanisms

### Investors (Institutional / Eligible Categories)

Investors participate subject to eligibility and selling restrictions per jurisdiction and channel. Investor rights are defined by the issuance terms and enforced through the legal structure and controlled token administration.

Responsibilities:

- Provide KYC/AML information via off-chain processes
- Comply with transfer and resale restrictions
- Receive disclosures, statements, and notices

## Market Infrastructure Stakeholders

### Distributors / Placement Agents

Regulated distributors execute primary placement and apply local selling restrictions, disclosures, and suitability requirements (where applicable).

### Exchanges / Trading Venues (Regulated)

Exchanges and other regulated trading venues provide secondary trading where permitted, including market surveillance, participant onboarding (or coordination with issuer onboarding), and trading rule enforcement.

### Market Makers / Liquidity Providers (Optional)

Market makers may support orderly markets under venue rules and documented agreements. Their participation does not guarantee liquidity; it is an engineered component subject to constraints and disclosures.

### Custodians and Wallet Infrastructure Providers

Custodians provide safekeeping and access controls where required. Wallet infrastructure must support whitelist enforcement and policy-based transfers.

## Service Providers

- KYC/AML providers (off-chain): identity verification, screening, ongoing monitoring
- Valuers / appraisal providers: valuation inputs and periodic updates
- Auditors: controls, financial reporting, and (where relevant) smart contract assurance
- Legal counsel: structure, disclosures, cross-border selling restrictions
- Shariah supervisory board/advisors (for sukuk and Shariah-aligned offerings)

## Governance and Accountability Model

The framework assumes clear accountability for:

- Data controller / processor roles (privacy compliance)
- Privileged action approvals (RBAC and sequential approvals)
- Incident response and dispute resolution
- Change management for token terms and system policies (under controlled governance)
