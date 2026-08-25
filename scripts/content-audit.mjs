import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const roots = ["src/app", "src/components"];
const extensions = new Set([".ts", ".tsx"]);
const prohibited = [
  ["guaranteed savings", /guaranteed savings/i],
  ["zero bill", /zero bill/i],
  ["free electricity", /free electricity/i],
  ["fixed ROI claim", /4\s*[–-]\s*5\s*year ROI/i],
  ["unconfirmed 25-year warranty", /25\s*[–-]\s*year warranty/i],
  ["unconfirmed 5-year workmanship term", /5\s*[–-]\s*year workmanship/i],
  ["authorized partner claim", /authorized partner/i],
  ["fixed response or installation promise", /(?:respond|response|install(?:ation|ed)?)\s+(?:in|within)\s+\d+\s*(?:hour|day|week)s?/i],
  ["invented proof count", /\b\d+[+,]?\s+(?:customers?|projects?|installations?)\b/i],
];

function filesUnder(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

const failures = [];
for (const file of roots.flatMap(filesUnder).filter((file) => extensions.has(extname(file)))) {
  const source = readFileSync(file, "utf8");
  for (const [label, pattern] of prohibited) {
    if (pattern.test(source)) failures.push(`${relative(process.cwd(), file)}: ${label}`);
  }
}

if (failures.length) {
  console.error("Content-truth audit failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Content-truth audit passed.");
