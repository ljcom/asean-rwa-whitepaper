# Privacy and Personal Data (Indonesia UU PDP and ASEAN PDPA)

## Objective

This section describes a privacy model aligned with Indonesia’s UU PDP and ASEAN PDPA regimes (minimum scope: Singapore and Malaysia). The objective is to support regulated issuance and cross-border participation without placing personal data on-chain.

Reference diagram: `02-figures/diagrams/privacy-data-boundary.md`.

Key principles:

- Data minimization and purpose limitation
- Personal data stored off-chain under controlled access
- On-chain stores only cryptographic references and operational events
- Clear accountability for data controller/processor responsibilities

## Data Boundary: Off-Chain Personal Data, On-Chain Integrity

### Off-Chain Data (Personal and Compliance Data)

Off-chain systems store:

- identity and verification artifacts
- KYC/AML screening outcomes and ongoing monitoring flags
- investor eligibility classification and residency indicators
- signed acknowledgements of disclosures and notices (where applicable)

Access is controlled through RBAC, logging, and contractual governance with service providers.

### On-Chain Data (Non-Personal, Minimal)

On-chain records store:

- token balances and transfer events
- whitelist status indicators (not identity details)
- cryptographic references to off-chain records to support integrity and auditability

This separation reduces privacy leakage risk while maintaining verifiable operational logs.

## Accountability: Data Controller and Processor Responsibilities

The framework assumes that accountability is explicitly defined in the operating model, including:

- which entity acts as the data controller for investor onboarding data (often linked to the asset-holding/issuer structure)
- which entities act as processors (KYC providers, distributors, venues, technology operators)
- contractual controls for sub-processing, retention, and breach obligations

## Consent, Notices, and Data Subject Rights (Operational View)

The onboarding process should provide:

- clear notices on what data is collected and why
- retention periods and lawful basis for processing (as applicable)
- practical workflows to address data subject requests (access, correction, deletion where permitted)

Because on-chain data is immutable, the design avoids storing personal data on-chain to prevent conflict with deletion/correction obligations.

## Cross-Border Data Transfers (ASEAN Minimum)

Cross-border distribution may require transferring personal data between:

- issuer/originator and KYC providers
- distributors/placement agents
- exchanges/venues (for onboarding coordination)

The framework therefore assumes:

- data minimization for any cross-border transfer
- purpose limitation and access logging
- structured governance for cross-border transfer compliance under UU PDP and relevant PDPA regimes

## Security Controls (Illustrative)

- encryption at rest and in transit for off-chain data
- strong authentication and least-privilege RBAC
- key management policies and separation of duties
- immutable audit logs and periodic access reviews
- incident response playbooks and evidence preservation

## Regulator and Audit Support (Privacy-Preserving)

Regulator and auditor support is implemented through:

- evidence packages that can be generated without exposing personal data on-chain
- controlled read-only access to audit logs and reconciliations
- redaction and minimization practices for reports shared across jurisdictions

## Cross-Border Implications

Cross-border participation increases privacy risk surface area due to more parties and data flows. The framework mitigates this through:

- a strict off-chain personal data boundary
- jurisdiction-aware access policies
- venue-specific controls and data handling agreements

Residual risk remains and must be managed through governance, audits, and ongoing compliance monitoring.
