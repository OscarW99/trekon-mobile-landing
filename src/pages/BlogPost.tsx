import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ComingSoonModal from "../components/ComingSoonModal";
import {
  BlogPostMeta,
  estimateReadTime,
  formatDate,
  parseFrontmatterValue,
  stripMarkdownFence,
  stripRedundantFirstHeading,
} from "../lib/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [post, setPost] = useState<{
    title: string;
    date: string;
    content: string;
    readTimeMinutes?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch("/blog-index.json")
      .then((r) => r.json())
      .then((list: BlogPostMeta[]) => {
        setPosts(list || []);
        const current = list?.find((p) => p.slug === slug);
        if (!current) throw new Error("not-found");
        return fetch(`/blog/${current.filename}.md`).then((r) => r.text()).then((raw) => ({ raw, current }));
      })
      .then(({ raw, current }) => {
        const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        if (!fmMatch) throw new Error("invalid-markdown");
        const [, fm, body] = fmMatch;
        const title = parseFrontmatterValue(fm, "title")?.trim() || "Post";
        const date = parseFrontmatterValue(fm, "date")?.trim() || "";
        const md = stripRedundantFirstHeading(stripMarkdownFence(body), title);
        setPost({
          title,
          date,
          content: md,
          readTimeMinutes:
            typeof current.readTime === "number" && current.readTime > 0
              ? current.readTime
              : undefined,
        });
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const related = useMemo(() => {
    if (!slug) return [];
    return posts.filter((p) => p.slug !== slug).slice(0, 2);
  }, [posts, slug]);

  if (!slug) return <Navigate to="/blog" replace />;
  if (!loading && !post) return <Navigate to="/blog" replace />;

  const readMins =
    post?.readTimeMinutes ?? (post ? estimateReadTime(post.content) : 1);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Ambient orb */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="mesh-orb w-80 h-80"
          style={{
            background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      <main className="relative z-10 pt-24 pb-16 px-5">
        <div className="max-w-lg mx-auto">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-ink-muted
                transition-colors duration-200 group"
            >
              <ArrowLeft
                size={13}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              All articles
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Clock size={11} />
                {readMins} min read
              </span>
              <time className="text-xs text-ink-muted">{post ? formatDate(post.date) : ""}</time>
            </div>

            <h1 className="font-display font-black text-3xl text-ink tracking-tighter leading-tight mb-6">
              {post?.title}
            </h1>
          </motion.header>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="prose-article-mobile mb-12"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post?.content || ""}</ReactMarkdown>
          </motion.div>

          {/* Download CTA — same email capture as desktop footer modal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="mb-10"
          >
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="w-full rounded-2xl py-3.5 px-5 font-display font-semibold text-sm text-white
                transition-transform active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, rgba(74,222,128,0.35) 0%, rgba(34,197,94,0.5) 100%)',
                border: '1px solid rgba(74,222,128,0.35)',
              }}
            >
              Download the app
            </button>
          </motion.div>

          {/* Related posts */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <h3 className="font-display font-semibold text-sm uppercase tracking-[0.1em]
                text-ink-muted mb-4">
                More articles
              </h3>
              <div className="space-y-3">
                {related.map((rel) => (
                  <Link key={rel.slug} to={`/blog/${rel.slug}`} className="group block">
                    <div
                      className="flex gap-4 p-4 rounded-xl transition-colors duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <img
                        src={rel.image || "https://picsum.photos/seed/trekon-blog-related/300/300"}
                        alt={rel.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="font-display font-semibold text-sm text-ink leading-tight
                          group-hover:text-accent transition-colors duration-200 line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Article typography */}
      <style>{`
        .prose-article-mobile h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.375rem;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: #F0FDF4;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .prose-article-mobile h3 {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1.125rem;
          color: #F0FDF4;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-article-mobile p {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(240,253,244,0.6);
          margin-bottom: 1rem;
        }
        .prose-article-mobile ul, .prose-article-mobile ol {
          margin-bottom: 1rem;
          padding-left: 1.25rem;
        }
        .prose-article-mobile li {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(240,253,244,0.6);
          margin-bottom: 0.375rem;
        }
        .prose-article-mobile strong {
          font-weight: 600;
          color: #F0FDF4;
        }
        .prose-article-mobile a {
          color: #86efac;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          transition: color 0.15s ease;
        }
        .prose-article-mobile a:hover {
          color: #bbf7d0;
        }
        .prose-article-mobile img {
          border-radius: 0.75rem;
          max-width: 100%;
          height: auto;
        }
        .prose-article-mobile table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          border: 1px solid rgba(240, 253, 244, 0.16);
          border-radius: 0.75rem;
          overflow: hidden;
          display: table;
          table-layout: auto;
          background: rgba(255, 255, 255, 0.02);
        }
        .prose-article-mobile thead {
          background: rgba(134, 239, 172, 0.1);
        }
        .prose-article-mobile th,
        .prose-article-mobile td {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.875rem;
          line-height: 1.5;
          color: #F0FDF4;
          padding: 0.6rem 0.7rem;
          border-bottom: 1px solid rgba(240, 253, 244, 0.12);
          text-align: left;
          white-space: normal;
          vertical-align: top;
        }
        .prose-article-mobile th {
          font-weight: 700;
        }
        .prose-article-mobile tr:last-child td {
          border-bottom: 0;
        }
      `}</style>

      <ComingSoonModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
