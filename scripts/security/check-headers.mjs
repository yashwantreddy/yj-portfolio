const baseUrl = process.env.SECURITY_CHECK_URL || "http://127.0.0.1:3000"
const url = new URL("/", baseUrl).toString()

let response
try {
  response = await fetch(url, { redirect: "manual" })
} catch (error) {
  console.error(`Failed to request ${url}`)
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}

if (!response.ok && !(response.status >= 300 && response.status < 400)) {
  console.error(`Unexpected status code ${response.status} from ${url}`)
  process.exit(1)
}

const requiredHeaders = {
  "content-security-policy": "Content-Security-Policy",
  "x-content-type-options": "X-Content-Type-Options",
  "referrer-policy": "Referrer-Policy",
  "permissions-policy": "Permissions-Policy",
  "x-frame-options": "X-Frame-Options",
}

const missing = []
for (const [key, label] of Object.entries(requiredHeaders)) {
  if (!response.headers.get(key)) {
    missing.push(label)
  }
}

const csp = response.headers.get("content-security-policy") || ""
const cspChecks = [
  "default-src 'self'",
  "frame-ancestors 'none'",
  "https://beamanalytics.b-cdn.net",
]

const failedCspChecks = cspChecks.filter((entry) => !csp.includes(entry))

const xcto = response.headers.get("x-content-type-options")
const referrerPolicy = response.headers.get("referrer-policy")
const xfo = response.headers.get("x-frame-options")

if (xcto && xcto.toLowerCase() !== "nosniff") {
  missing.push("X-Content-Type-Options must be nosniff")
}

if (referrerPolicy && referrerPolicy.toLowerCase() !== "strict-origin-when-cross-origin") {
  missing.push("Referrer-Policy must be strict-origin-when-cross-origin")
}

if (xfo && xfo.toUpperCase() !== "DENY") {
  missing.push("X-Frame-Options must be DENY")
}

if (failedCspChecks.length > 0) {
  missing.push(`Content-Security-Policy missing expected directives: ${failedCspChecks.join(", ")}`)
}

if (missing.length > 0) {
  console.error("Runtime header verification failed:")
  for (const issue of missing) {
    console.error(`- ${issue}`)
  }
  process.exit(1)
}

console.log(`Runtime security headers verified for ${url}`)
