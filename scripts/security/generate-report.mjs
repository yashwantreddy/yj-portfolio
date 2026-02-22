import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const reportsDir = resolve("docs/security/reports")
mkdirSync(reportsDir, { recursive: true })

const prodPath = resolve(reportsDir, "npm-audit-prod.json")
const allPath = resolve(reportsDir, "npm-audit-all.json")
const outPath = resolve(reportsDir, "security-summary.md")

const now = new Date().toISOString()

const parseJsonIfExists = (path) => {
  if (!existsSync(path)) return null
  try {
    return JSON.parse(readFileSync(path, "utf8"))
  } catch {
    return null
  }
}

const prod = parseJsonIfExists(prodPath)
const all = parseJsonIfExists(allPath)

const prodCounts = prod?.metadata?.vulnerabilities ?? {}
const allCounts = all?.metadata?.vulnerabilities ?? {}
const prodHigh = Number(prodCounts.high ?? 0)
const prodCritical = Number(prodCounts.critical ?? 0)
const hasProdBlockers = prodHigh + prodCritical > 0

const topDevFindings = Object.keys(all?.vulnerabilities ?? {}).slice(0, 10)

const lines = [
  "# Security Summary",
  "",
  `Generated: ${now}`,
  "",
  "## Blocking Policy",
  "",
  "- Scope: production dependency vulnerabilities only.",
  `- Status: ${hasProdBlockers ? "FAIL" : "PASS"} (critical=${prodCritical}, high=${prodHigh})`,
  "",
  "## Production Dependency Audit",
  "",
  existsSync(prodPath) ? `- Source: \`docs/security/reports/npm-audit-prod.json\`` : "- Source: missing",
  `- Counts: critical=${Number(prodCounts.critical ?? 0)}, high=${Number(prodCounts.high ?? 0)}, moderate=${Number(
    prodCounts.moderate ?? 0
  )}, low=${Number(prodCounts.low ?? 0)}`,
  "",
  "## Full Dependency Audit (Report-Only)",
  "",
  existsSync(allPath) ? `- Source: \`docs/security/reports/npm-audit-all.json\`` : "- Source: missing",
  `- Counts: critical=${Number(allCounts.critical ?? 0)}, high=${Number(allCounts.high ?? 0)}, moderate=${Number(
    allCounts.moderate ?? 0
  )}, low=${Number(allCounts.low ?? 0)}`,
  "",
  "## Top Non-Blocking Findings",
  "",
]

if (topDevFindings.length === 0) {
  lines.push("- None")
} else {
  for (const finding of topDevFindings) {
    lines.push(`- ${finding}`)
  }
}

lines.push("", "## Notes", "", "- Full audit findings may include dev-only toolchain advisories.")

writeFileSync(outPath, `${lines.join("\n")}\n`, "utf8")
console.log(`Security summary written to ${outPath}`)
