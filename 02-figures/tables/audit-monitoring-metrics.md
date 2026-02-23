# Audit and Monitoring Metrics (Illustrative)

This table provides example monitoring indicators suitable for a hybrid compliance architecture with event-sourced off-chain operations and restricted on-chain transfers. Metrics should be tailored per product model (debt/profit participation/sukuk/crowdfunding), jurisdiction, and venue.

| Monitoring domain | Metric (illustrative) | Why it matters | Typical governance owner |
| --- | --- | --- | --- |
| Identity/KYC operations | onboarding cycle time; KYC exception rate; periodic refresh completion | detects bottlenecks and compliance gaps | compliance committee |
| Eligibility and whitelist governance | whitelist grants/revocations volume; out-of-hours changes; override counts | detects misuse/control drift | compliance committee |
| Policy changes | policy version changes per month; emergency changes; changes without expected approvals | detects governance failures | change control board |
| Transfer controls | blocked transfer rate; top block reasons; exception approvals rate | detects misconfiguration and selling-restriction pressure | compliance committee |
| Escrow and settlement | escrow release SLA; refund SLA; mismatch between allocations and escrow balances | detects settlement risk and investor harm | operations + program governance |
| Register reconciliation | on-chain vs off-chain balance breaks; time-to-resolve breaks | ensures register integrity | operations + audit |
| Corporate actions | distribution error rate; late notices; reconciliation after actions | protects investors and reduces disputes | operations + audit |
| Key management / privileged actions | privileged action alerts; failed approval attempts; access review completion | detects security/control issues | security + change control |
| Privacy and data protection | access log anomalies; data retention compliance; incident response drill results | reduces UU PDP/PDPA risk | privacy/compliance |
| Venue and market conduct (where trading occurs) | spread/depth indicators; abnormal trading alerts; venue surveillance exceptions | supports orderly market posture | venue + program governance |
