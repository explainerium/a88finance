import "dotenv/config";
import { execSync } from "node:child_process";

/**
 * Runs `prisma migrate deploy`, but only when DATABASE_URL is available — so the
 * build never hard-fails just because the env var isn't configured yet. Once
 * DATABASE_URL is set (the normal case on Vercel after adding env vars),
 * migrations are applied automatically on each deploy.
 */
if (!process.env.DATABASE_URL) {
  console.warn(
    [
      "",
      "──────────────────────────────────────────────────────────────",
      "[migrate] DATABASE_URL is not set — skipping `prisma migrate deploy`.",
      "[migrate] The build will continue, but the app needs a database.",
      "[migrate] Add DATABASE_URL (and the other env vars) in your Vercel",
      "[migrate] project settings for ALL environments, then redeploy.",
      "──────────────────────────────────────────────────────────────",
      "",
    ].join("\n"),
  );
  process.exit(0);
}

try {
  execSync("prisma migrate deploy", { stdio: "inherit" });
} catch {
  console.error("[migrate] `prisma migrate deploy` failed (see output above).");
  process.exit(1);
}
