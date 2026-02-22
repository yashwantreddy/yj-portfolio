import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { spawnSync } from "node:child_process"

const gitCmd = process.platform === "win32" ? "git.exe" : "git"
const list = spawnSync(gitCmd, ["ls-files", "app", "components"], {
  encoding: "utf8",
})

if (list.error) {
  console.error(list.error.message)
  process.exit(1)
}

if (list.status !== 0) {
  console.error(list.stderr || "Unable to list app/component files.")
  process.exit(list.status ?? 1)
}

const files = list.stdout
  .split("\n")
  .map((item) => item.trim())
  .filter((item) => item.endsWith(".tsx") || item.endsWith(".jsx"))

const findings = []

for (const relativePath of files) {
  if (!existsSync(resolve(relativePath))) {
    continue
  }

  const content = readFileSync(resolve(relativePath), "utf8")
  const tags = content.matchAll(/<(a|Link)\b[\s\S]*?>/g)
  for (const tagMatch of tags) {
    const tag = tagMatch[0]
    if (!/target\s*=\s*["_']_blank["_']/.test(tag)) {
      continue
    }

    const relMatch = tag.match(/rel\s*=\s*["']([^"']+)["']/)
    const relValues = new Set((relMatch?.[1] || "").split(/\s+/).filter(Boolean))
    const hasNoopener = relValues.has("noopener")
    const hasNoreferrer = relValues.has("noreferrer")

    if (hasNoopener && hasNoreferrer) {
      continue
    }

    const index = tagMatch.index ?? 0
    const line = content.slice(0, index).split("\n").length
    findings.push({
      file: relativePath,
      line,
      reason: "target=\"_blank\" missing rel=\"noopener noreferrer\"",
    })
  }
}

if (findings.length > 0) {
  console.error("External link policy violations found:")
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} (${finding.reason})`)
  }
  process.exit(1)
}

console.log(`External link policy check passed across ${files.length} source files.`)
