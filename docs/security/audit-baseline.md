# Security Audit Baseline

Date: 2026-02-22  
Repository: `/Users/yashjankay/Desktop/Playground/yj-portfolio`

## 1. System Inventory

### Application Surface

- Framework: Next.js App Router (React 19 + TypeScript).
- Runtime: Client-rendered portfolio with static content and no backend API routes.
- Static assets: Images under `public/`.
- External dependencies:
  - Beam analytics script from `https://beamanalytics.b-cdn.net/beam.min.js`.
  - External outbound links to GitHub and LinkedIn.

### Security-Relevant Files

- Runtime security headers: `next.config.js`
- Third-party script loading: `app/layout.tsx`
- External links: `components/ProjectsSection.tsx`, `components/Footer.tsx`
- CI gate: `.github/workflows/security.yml`
- Security scripts: `scripts/security/*.mjs`

## 2. Trust Boundaries

1. Browser client boundary
   - User executes JS/CSS and receives HTTP response headers.
2. Third-party analytics boundary
   - Browser loads external script from Beam CDN.
3. Vercel edge/runtime boundary
   - Host-level transport and header delivery path.

## 3. Attack Surface Classification

| Category | In Scope | Current Controls |
| --- | --- | --- |
| Supply chain | npm dependencies (prod + dev) | `npm audit` scripts, CI checks, risk register |
| Client-side navigation abuse | External `_blank` links | `noopener noreferrer` policy + check script |
| Misconfiguration/headers | CSP and security headers | Route-wide header policy in `next.config.js` + runtime verification script |
| Secret exposure | Tracked source and config files | Pattern-based secret scan script in CI |

## 4. Hardening Checklist

| Control | Status | Evidence |
| --- | --- | --- |
| Production dependency blockers defined | Pass | `scripts/security/audit-prod.mjs` |
| Full dependency visibility (report-only) | Pass | `scripts/security/audit-all.mjs` |
| Secret scanning automated | Pass | `scripts/security/secrets-scan.mjs` |
| Runtime security headers enforced | Pass | `next.config.js` + `scripts/security/check-headers.mjs` |
| External link policy enforced | Pass | `components/*` + `scripts/security/check-links.mjs` |
| CI security workflow active | Pass | `.github/workflows/security.yml` |

## 5. Verification Procedure

1. `npm run lint`
2. `npm run build`
3. `npm run security:audit:prod`
4. `npm run security:audit:all`
5. `npm run security:secrets`
6. `npm run security:links`
7. Start app (`npm run start -- --hostname 127.0.0.1 --port 3001`)
8. `SECURITY_CHECK_URL=http://127.0.0.1:3001 npm run security:headers`
9. `npm run security:report`

## 6. Notes

- No server-side API surface exists in this repository at this time.
- Dev-toolchain vulnerabilities are tracked but non-blocking by policy.
