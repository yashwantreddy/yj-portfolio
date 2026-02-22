# Security Risk Register

Date: 2026-02-22  
Repository: `/Users/yashjankay/Desktop/Playground/yj-portfolio`

## Severity Legend

- P0: Critical, exploitable now, immediate fix.
- P1: High, meaningful exploitability or severe impact.
- P2: Medium, limited exploitability or constrained impact.
- P3: Low, hardening/defense in depth.

## Active Risks

| ID | Category | Severity | Scope | Status | Disposition | Owner | Target |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Dependency vulnerabilities (`eslint`/`minimatch` chain) | P1 | Dev-only | Open | Accepted with monitoring (non-blocking) | Repo maintainer | Reassess weekly |
| R-002 | Third-party analytics supply-chain exposure (Beam CDN script) | P2 | Runtime | Open | Mitigated via CSP allowlist + documented exception | Repo maintainer | Reassess monthly |
| R-003 | Reverse-tabnabbing risk on external links | P1 | Runtime | Closed | Fixed by enforcing `rel="noopener noreferrer"` | Repo maintainer | Completed |
| R-004 | Missing route-wide security headers | P1 | Runtime | Closed | Fixed in `next.config.js` + runtime verification script | Repo maintainer | Completed |
| R-005 | Accidental secret commit risk | P1 | Repo hygiene | Mitigated | Automated secret scan in CI | Repo maintainer | Ongoing |

## Findings Detail

### R-001: Dev-only Vulnerability Chain

- Source: `npm audit --json`
- Current signal: high vulnerabilities in lint/tooling dependency chain, primarily tied to `minimatch` advisories.
- Runtime impact: none observed in production dependency graph.
- Policy impact: non-blocking (tracked/report-only).
- Next action:
  1. Recheck weekly via CI schedule.
  2. Upgrade chain when upstream stable fixes are available and compatible.

### R-002: Third-Party Script Trust

- Source: `app/layout.tsx`
- Risk: malicious CDN update could execute in client context.
- Controls:
  - CSP restricted to explicit Beam domain for `script-src` and `connect-src`.
  - Script use documented in `SECURITY.md` with monitoring requirement.

## Closed/Verified Controls

- Production dependency blockers currently enforced in CI via `security:audit:prod`.
- Runtime headers verified via `security:headers`.
- External link policy verified via `security:links`.
- Secret scanning verified via `security:secrets`.
