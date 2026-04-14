/**
 * Build public/blog-index.json and public/sitemap.xml from public/blog/*.md.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const blogDir = path.join(publicDir, "blog");
const SITE_URL = (process.env.SITE_URL || "https://m.trekon.run").replace(/\/$/, "");
const STATIC_SITEMAP_PATHS = ["/", "/contact", "/blog"];

if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

function parseFrontmatterValue(frontmatter, key) {
  const line = frontmatter
    .split(/\r?\n/)
    .find((l) => l.trimStart().startsWith(`${key}:`));
  if (!line) return null;
  const raw = line.replace(/^[^:]+:\s*/, "").trim();
  if (!raw) return "";
  if (raw.startsWith('"') && raw.endsWith('"') && raw.length >= 2) return raw.slice(1, -1).replace(/\\"/g, '"');
  if (raw.startsWith("'") && raw.endsWith("'") && raw.length >= 2) return raw.slice(1, -1).replace(/''/g, "'");
  return raw;
}

function stripMarkdownFence(text) {
  let s = text.trim();
  if (/^```(?:markdown)?\s*\n?/i.test(s)) s = s.replace(/^```(?:markdown)?\s*\n?/i, "");
  if (/\n?```\s*$/.test(s)) s = s.replace(/\n?```\s*$/, "").trim();
  return s;
}

function excerptFromMarkdown(md, maxLen = 160) {
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

function estimateReadTime(markdown) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function firstImageUrl(body) {
  const m = body.match(/!\[[^\]]*\]\((#[^)]*|[^)\s]+)\)/);
  return m && m[1] && !m[1].startsWith("#") ? m[1] : null;
}

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
const list = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) continue;
  const [, fm, bodyRaw] = match;
  const body = stripMarkdownFence(bodyRaw);
  const title = parseFrontmatterValue(fm, "title")?.trim() || "Post";
  const date = parseFrontmatterValue(fm, "date")?.trim() || "";
  const slug = parseFrontmatterValue(fm, "slug")?.trim() || file.replace(/\.md$/, "");
  const filename = file.replace(/\.md$/, "");
  const image = firstImageUrl(body);
  list.push({
    file,
    filename,
    title,
    date,
    slug,
    excerpt: excerptFromMarkdown(body),
    readTime: estimateReadTime(body),
    ...(image ? { image } : {}),
  });
}

list.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
const deduped = [];
const seenSlugs = new Set();
for (const post of list) {
  if (!post.slug) continue;
  if (seenSlugs.has(post.slug)) continue;
  seenSlugs.add(post.slug);
  deduped.push(post);
}
fs.writeFileSync(path.join(publicDir, "blog-index.json"), JSON.stringify(deduped, null, 2));

const entries = [];
for (const p of STATIC_SITEMAP_PATHS) {
  entries.push({
    loc: `${SITE_URL}${p}`,
    changefreq: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? "1.0" : "0.8",
  });
}
for (const post of deduped) {
  entries.push({
    loc: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastmod: post.date || undefined,
    changefreq: "monthly",
    priority: "0.7",
  });
}

const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
for (const e of entries) {
  lines.push("  <url>");
  lines.push(`    <loc>${escapeXml(e.loc)}</loc>`);
  if (e.lastmod) lines.push(`    <lastmod>${escapeXml(e.lastmod)}</lastmod>`);
  if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
  if (e.priority) lines.push(`    <priority>${e.priority}</priority>`);
  lines.push("  </url>");
}
lines.push("</urlset>");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), `${lines.join("\n")}\n`);
