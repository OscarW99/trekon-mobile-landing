import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CaretLeft, CaretRight } from "@phosphor-icons/react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { BlogPostMeta, formatDate } from "../lib/blog";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  },
}

const PER_PAGE = 9;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch("/blog-index.json")
      .then((r) => r.json())
      .then((list: BlogPostMeta[]) => setPosts(list || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Math.min(
    Math.max(1, Number.isFinite(rawPage) ? rawPage : 1),
    totalPages
  );
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return sorted.slice(start, start + PER_PAGE);
  }, [sorted, currentPage]);

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next <= 1) setSearchParams({});
    else setSearchParams({ page: String(next) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Ambient orb at top */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="mesh-orb w-96 h-96"
          style={{
            background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
            top: '-10%',
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
              to="/"
              className="inline-flex items-center gap-2 text-sm text-ink-muted
                transition-colors duration-200 group"
            >
              <ArrowLeft
                size={13}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-10"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 mb-4"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                The Trekon Blog
              </span>
            </div>
            <h1 className="font-display font-black text-4xl text-ink tracking-tighter leading-tight mb-2">
              Running insights
            </h1>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Training advice, race prep, and the science of running smarter.
            </p>
          </motion.div>

          {/* Post list */}
          {loading ? (
            <p className="text-ink-muted text-sm text-center py-16">Loading articles…</p>
          ) : sorted.length === 0 ? (
            <p className="text-ink-muted text-sm text-center py-16">
              No articles yet.
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {paginated.map((post) => (
                <motion.div key={post.slug} variants={itemVariants}>
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div
                      className="rounded-[1.5rem] overflow-hidden transition-all duration-400"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                      }}
                    >
                      {/* Cover */}
                      <div className="overflow-hidden h-44">
                        <img
                          src={post.image || "https://picsum.photos/seed/trekon-blog/800/450"}
                          alt={post.title}
                          className="w-full h-full object-cover
                            transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                            group-hover:scale-[1.04]"
                        />
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-ink-muted text-xs">{post.readTime || 1} min read</span>
                          <span className="text-ink-muted text-xs">·</span>
                          <time className="text-ink-muted text-xs">{formatDate(post.date)}</time>
                        </div>
                        <h2 className="font-display font-bold text-base text-ink tracking-tight leading-tight mb-2
                          group-hover:text-accent transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="text-ink-secondary text-xs leading-relaxed line-clamp-2">
                          {post.excerpt || post.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && sorted.length > PER_PAGE && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Blog pagination"
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs text-ink-muted
                  transition-colors hover:text-ink-secondary disabled:opacity-40 disabled:pointer-events-none"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <CaretLeft size={14} weight="bold" />
                Prev
              </button>
              <span className="px-3 text-xs text-ink-muted">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs text-ink-muted
                  transition-colors hover:text-ink-secondary disabled:opacity-40 disabled:pointer-events-none"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Next
                <CaretRight size={14} weight="bold" />
              </button>
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
