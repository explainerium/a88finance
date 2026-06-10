import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Render post content (Markdown — also tolerates raw HTML) to an HTML string.
 * Content authors are trusted internal ADMIN/AUTHOR users; if you ever open
 * authoring more widely, sanitize this output (e.g. isomorphic-dompurify).
 */
export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

/** Strip Markdown/HTML down to readable plain text. */
export function stripToText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/<\/?[^>]+>/g, " ") // html tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → link text
    .replace(/[#>*_~`|]+/g, " ") // markdown punctuation
    .replace(/^\s*[-+]\s+/gm, "") // list bullets
    .replace(/&[a-z]+;/gi, " ") // html entities
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Build an excerpt from content: strip to text, take ~`max` chars, trim at a
 * word boundary, append an ellipsis.
 */
export function makeExcerpt(content: string, max = 155): string {
  const text = stripToText(content);
  if (text.length <= max) return text;

  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const trimmed = (lastSpace > max * 0.5 ? slice.slice(0, lastSpace) : slice)
    .replace(/[.,;:!?-]+$/, "")
    .trim();
  return `${trimmed}…`;
}
