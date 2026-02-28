# Security Runbook

## Scope and Policy

- Deployment target: Vercel.
- Blocking scope: production-impacting security issues only.
- Non-blocking scope: dev-toolchain vulnerabilities are tracked in the risk register and reviewed regularly.

## Security Commands

```bash
npm run security:audit:prod
npm run security:audit:all
npm run security:secrets
npm run security:links
npm run security:headers
npm run security:report
```

## CI Security Gates

Blocking checks:

- `npm run security:audit:prod` fails if production dependencies have any high/critical vulnerabilities.
- `npm run security:secrets` fails on high-confidence secret patterns in tracked files.
- `npm run security:links` fails if any `_blank` links omit `rel="noopener noreferrer"`.
- `npm run security:headers` fails if required runtime security headers are missing.

Report-only checks:

- `npm run security:audit:all` captures full dependency vulnerability status, including dev tooling.

## Runtime Header Policy

Configured in `next.config.js` for all routes:

- `Content-Security-Policy`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

## Third-Party Script Exception

The app intentionally loads Beam analytics from `https://beamanalytics.b-cdn.net/beam.min.js`.

- Rationale: portfolio analytics requirement.
- Control: CDN script origin and Beam ingest endpoints are explicitly allowlisted in CSP `script-src` and `connect-src`.
- Residual risk: third-party supply-chain exposure if CDN asset changes.
- Mitigation: monitor vendor updates and revalidate CSP + script necessity during weekly audit.

## Cadence

- Automated CI security checks on pull requests and weekly schedule.
- Weekly review of `docs/security/risk-register.md`.
- Reassess dependency exceptions when upstream fixes become available.
