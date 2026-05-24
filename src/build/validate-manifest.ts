import fs from "fs";
import path from "path";

export function validateManifest(): void {
  const pkgPath = path.resolve("package.json");
  if (!fs.existsSync(pkgPath)) {
    throw new Error("package.json not found");
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const quartz = pkg.quartz;

  if (!quartz) {
    console.warn(
      "\x1b[33m⚠ No 'quartz' field in package.json. Plugin may not load correctly in Quartz.\x1b[0m",
    );
    return;
  }

  const warnings: string[] = [];

  if (!quartz.name) warnings.push("quartz.name is missing");
  if (!quartz.displayName) warnings.push("quartz.displayName is missing");
  if (!quartz.category) warnings.push("quartz.category is missing");
  if (!quartz.version) warnings.push("quartz.version is missing");

  if (warnings.length > 0) {
    console.warn("\x1b[33m⚠ Plugin manifest warnings:\x1b[0m");
    for (const w of warnings) {
      console.warn(`  - ${w}`);
    }
  }
}
