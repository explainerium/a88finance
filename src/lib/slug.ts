/** Turn arbitrary text into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // drop special chars
    .replace(/[\s_-]+/g, "-") // collapse whitespace/underscores to single dash
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

/**
 * Given a desired base slug and an async existence check, return a unique slug
 * by appending an incrementing numeric suffix:
 *   car-loan-tips → car-loan-tips-2 → car-loan-tips-3 → …
 * `exists` should return true when a slug is already taken by *another* record.
 */
export async function uniqueSlug(
  base: string,
  exists: (candidate: string) => Promise<boolean>,
): Promise<string> {
  const safeBase = base || "post";
  let candidate = safeBase;
  let suffix = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await exists(candidate)) {
    suffix += 1;
    candidate = `${safeBase}-${suffix}`;
  }
  return candidate;
}
