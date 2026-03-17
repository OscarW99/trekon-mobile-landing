import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Tag } from '@phosphor-icons/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getPostBySlug, getRecentPosts } from '../lib/blog-data'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const related = getRecentPosts(3).filter((p) => p.slug !== post.slug).slice(0, 2)

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
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em]
                font-semibold text-accent rounded-full px-3 py-1"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
                <Tag size={9} weight="fill" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Clock size={11} />
                {post.readTime} min
              </span>
              <time className="text-xs text-ink-muted">{formatDate(post.date)}</time>
            </div>

            <h1 className="font-display font-black text-3xl text-ink tracking-tighter leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-ink-secondary text-base leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Cover image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
            </div>
          </motion.div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="prose-article-mobile mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.12em] font-semibold
                          text-accent mb-1">
                          {rel.category}
                        </span>
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
      `}</style>

      <Footer />
    </div>
  )
}
