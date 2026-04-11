export type BlogPostMeta = {
  file: string;
  filename: string;
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  readTime?: number;
  image?: string;
};

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function estimateReadTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function excerptFromMarkdown(md: string, maxLen = 180): string {
  const s = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+.*/gm, " ")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= maxLen) return s;
  return `${s.slice(0, maxLen - 1).trim()}…`;
}

export function parseFrontmatterValue(frontmatter: string, key: string): string | null {
  const line = frontmatter
    .split(/\r?\n/)
    .find((l) => l.trimStart().startsWith(`${key}:`));
  if (!line) return null;

  const raw = line.replace(/^[^:]+:\s*/, "").trim();
  if (!raw) return "";
  if (raw.startsWith('"') && raw.endsWith('"') && raw.length >= 2) {
    return raw.slice(1, -1).replace(/\\"/g, '"');
  }
  if (raw.startsWith("'") && raw.endsWith("'") && raw.length >= 2) {
    return raw.slice(1, -1).replace(/''/g, "'");
  }
  return raw;
}

export function stripMarkdownFence(text: string): string {
  let s = text.trim();
  if (/^```(?:markdown)?\s*\n?/i.test(s)) s = s.replace(/^```(?:markdown)?\s*\n?/i, "");
  if (/\n?```\s*$/.test(s)) s = s.replace(/\n?```\s*$/, "").trim();
  return s;
}

export function stripRedundantFirstHeading(md: string, postTitle: string): string {
  const t = postTitle.trim().toLowerCase();
  const m = md.match(/^#\s+(.+?)(\n\n?|$)/);
  if (!m) return md;
  const headingText = m[1].trim().toLowerCase();
  if (headingText !== t) return md;
  return md.slice(m[0].length).trimStart();
}
