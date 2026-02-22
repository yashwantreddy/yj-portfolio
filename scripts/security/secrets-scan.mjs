import { readFileSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { resolve, extname, basename } from "node:path"

const gitCmd = process.platform === "win32" ? "git.exe" : "git"
const tracked = spawnSync(gitCmd, ["ls-files", "-z"], {
  encoding: "utf8",
})

if (tracked.error) {
  console.error(tracked.error.message)
  process.exit(1)
}

if (tracked.status !== 0) {
  console.error(tracked.stderr || "Unable to list tracked files.")
  process.exit(tracked.status ?? 1)
}

const textExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".txt",
  ".yml",
  ".yaml",
  ".env",
  ".css",
  ".html",
])

const patterns = [
  { name: "Private key", regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g },
  { name: "AWS access key", regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g },
  { name: "GitHub token", regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}\b/g },
  { name: "GitHub fine-grained PAT", regex: /\bgithub_pat_[A-Za-z0-9_]{60,}\b/g },
  { name: "Slack token", regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g },
  { name: "Google API key", regex: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { name: "Stripe secret key", regex: /\bsk_(?:live|test)_[0-9A-Za-z]{20,}\b/g },
  { name: "Suspicious password assignment", regex: /\bpassword\b\s*[:=]\s*['"][^'"\n]{8,}['"]/gi },
]

const files = tracked.stdout.split("\0").filter(Boolean)
const findings = []

for (const relativePath of files) {
  const ext = extname(relativePath).toLowerCase()
  const fileName = basename(relativePath)
  const isEnvFile = fileName === ".env" || fileName.startsWith(".env.")
  if (!textExtensions.has(ext) && !isEnvFile) {
    continue
  }

  const fullPath = resolve(relativePath)
  let content
  try {
    content = readFileSync(fullPath, "utf8")
  } catch {
    continue
  }

  if (content.includes("\u0000")) {
    continue
  }

  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0
    let match
    while ((match = pattern.regex.exec(content)) !== null) {
      const before = content.slice(0, match.index)
      const line = before.split("\n").length
      findings.push({
        file: relativePath,
        line,
        pattern: pattern.name,
      })
    }
  }
}

if (findings.length > 0) {
  console.error("Potential secrets detected:")
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} (${finding.pattern})`)
  }
  process.exit(1)
}

console.log(`Secrets scan passed across ${files.length} tracked files.`)
