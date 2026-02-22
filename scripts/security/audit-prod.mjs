import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { spawnSync } from "node:child_process"

const reportsDir = resolve("docs/security/reports")
const outputFile = resolve(reportsDir, "npm-audit-prod.json")
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm"

mkdirSync(reportsDir, { recursive: true })

const audit = spawnSync(npmCmd, ["audit", "--omit=dev", "--json"], {
  encoding: "utf8",
})

if (audit.error) {
  console.error(audit.error.message)
  process.exit(1)
}

if (![0, 1].includes(audit.status ?? 1)) {
  console.error(audit.stderr || "Failed to run npm audit --omit=dev")
  process.exit(audit.status ?? 1)
}

const raw = audit.stdout?.trim()
if (!raw) {
  console.error("npm audit did not return JSON output for production dependencies.")
  process.exit(1)
}

let report
try {
  report = JSON.parse(raw)
} catch (error) {
  console.error("Unable to parse production audit JSON.")
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}

writeFileSync(outputFile, `${JSON.stringify(report, null, 2)}\n`, "utf8")

const counts = report?.metadata?.vulnerabilities ?? {}
const high = Number(counts.high ?? 0)
const critical = Number(counts.critical ?? 0)
const moderate = Number(counts.moderate ?? 0)
const low = Number(counts.low ?? 0)

console.log(`Production audit report written to ${outputFile}`)
console.log(`Production vulnerability counts: critical=${critical}, high=${high}, moderate=${moderate}, low=${low}`)

if (high + critical > 0) {
  console.error("Blocking policy violated: production dependencies have high/critical vulnerabilities.")
  process.exit(1)
}
