# Risks and Mitigations

## Purpose

This section identifies key risks in an ASEAN-minimum real estate tokenization program with Indonesian underlying assets and economic-rights-only tokens, and outlines mitigations consistent with a regulatory-aligned operating model. It does not claim that risks can be eliminated; it describes how they can be managed and evidenced.

## 1) Legal and Regulatory Risks

### Risk: Misclassification or inconsistent regulatory treatment

Different ASEAN regulators may categorize similar economic rights differently (security, collective investment, debt instrument, etc.).

Mitigations:

- jurisdiction-by-jurisdiction legal analysis and documentation
- conservative distribution controls and staged rollout
- clear disclosures aligned to the chosen funding model
- ongoing regulator engagement supported by evidence packages

### Risk: Perception of regulatory arbitrage

Tokenization may be perceived as an attempt to bypass securities law.

Mitigations:

- explicit non-arbitrage positioning in disclosures and design
- regulated distribution channels and controlled secondary trading
- auditable transfer restrictions and compliance logs

## 2) Market and Liquidity Risks

### Risk: Illiquidity and fragmented markets

Liquidity is not automatic and is likely to be fragmented across ASEAN venues and jurisdictions.

Mitigations:

- explicit liquidity risk disclosures (no guarantee)
- venue strategy (regulated listings where feasible)
- optional market making arrangements with governance and transparency
- redemption mechanisms only where structurally supportable and clearly documented

### Risk: Funding shortfall at primary close (debt offerings)

Debt offerings may not reach their target size within the offering window. If the structure uses escrow and closing thresholds, the borrower may accept a partial close or cancel, which can delay funding or result in no disbursement.

Mitigations:

- define **minimum close** thresholds and deadlines in the offering documents
- pre-agree borrower decision rules for partial close vs. cancellation
- disclose best-efforts nature and cancellation/refund mechanics clearly
- maintain auditable evidence of commitments, allocations, and close outcomes

### Risk: Pricing integrity and valuation mismatch

Real estate valuation cadence may not match trading expectations.

Mitigations:

- clear NAV methodology and reporting cadence
- governance over valuation sources and updates
- volatility controls or trading halts aligned to venue rules (where applicable)

## 3) Operational Risks

### Risk: Reconciliation failures between on-chain and off-chain registers

Hybrid systems introduce reconciliation complexity.

Mitigations:

- define an authoritative register and reconciliation cadence
- event-driven reconciliations after issuance and corporate actions
- independent audits of operational controls

### Risk: Servicing and payment errors

Distributions and redemptions require accurate calculations and approvals.

Mitigations:

- governed corporate action workflows with sequential approvals
- dual controls and segregation of duties
- exception handling and post-event reporting

### Risk: Escrow operational and settlement failures

Escrow-based funding introduces operational risks: misdirected funds, delayed releases, incorrect refunds, or disputes over conditions precedent.

Mitigations:

- use segregated escrow accounts with clear mandate (escrow agent/bank/custodian where appropriate)
- dual authorization for release of funds and documented conditions precedent
- reconciliation runbooks and time-bound refund procedures
- dispute resolution process and evidence retention (subscription logs, notices, approvals)

## 4) Technology and Security Risks

### Risk: Smart contract vulnerabilities

On-chain components may contain defects that cause loss or unauthorized transfers.

Mitigations:

- formal development lifecycle and security reviews
- independent smart contract audit before production
- limited and well-governed upgrade paths (if any), disclosed upfront
- emergency controls (freeze/hold) under strict governance and logging

### Risk: Key management compromise

Compromise of admin keys can lead to unauthorized actions.

Mitigations:

- strong key management (HSM or equivalent where appropriate)
- multi-party authorization for privileged actions
- access reviews, logging, and incident response playbooks

## 5) Privacy and Data Protection Risks

### Risk: Personal data exposure or unlawful cross-border transfers

Cross-border operations increase the number of parties handling personal data.

Mitigations:

- strict off-chain personal data boundary; no personal data on-chain
- data minimization, purpose limitation, and retention controls
- processor governance and contractual controls (sub-processing, audits)
- incident response and breach notification procedures aligned to UU PDP / PDPA

## 6) Governance and Conflict-of-Interest Risks

### Risk: Related-party transactions and misaligned incentives

Real estate structures can involve related parties (originator, manager, service providers).

Mitigations:

- disclosure of conflicts and related-party arrangements
- governance approvals and independent oversight where required
- audit trails for corporate actions and material decisions

## Cross-Border Implications (ASEAN Minimum)

Risk management must be implemented with jurisdiction awareness. Key implications:

- controls and disclosures may need to vary by jurisdiction and venue
- liquidity and market conduct controls are venue-specific
- privacy governance must cover cross-border data handling and accountability

The framework’s mitigation approach is to make controls explicit, auditable, and aligned with regulator expectations, rather than assuming uniformity across ASEAN.
