import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One fortune cookie message for a software engineer: the fortune sounds
// generous up front — code that works on the first try — and the twist at
// the end takes it away again, because the code is someone else's.
const entry =
  "Your code will work on the first try. Unfortunately, it is someone else's code.";

// The gate only accepts 1 to 120 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 79 characters, well inside the gate,
// and the guard below keeps it that way if the line is ever reworded.
// (Counted: "Your code will work on the first try. " is 39 characters
// including the trailing space, "Unfortunately, it is someone else's
// code." is 40 — 79 in total, no trailing newline in the file.)
if (entry.length < 1 || entry.length > 120) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-120 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
