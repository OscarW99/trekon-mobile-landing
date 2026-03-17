import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from '@phosphor-icons/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { blogPosts, getReadTime } from '../lib/blog-data'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

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

export default function Blog() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

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
          {sorted.length === 0 ? (
            <p className="text-ink-muted text-sm text-center py-16">
              No articles yet. Add posts to{' '}
              <code className="font-mono text-xs bg-surface-light rounded px-1.5 py-0.5">
                src/lib/blog-data.ts
              </code>
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {sorted.map((post) => (
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
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover
                            transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
                            group-hover:scale-[1.04]"
                        />
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-ink-muted text-xs">{getReadTime(post.content)} min read</span>
                          <span className="text-ink-muted text-xs">·</span>
                          <time className="text-ink-muted text-xs">{formatDate(post.date)}</time>
                        </div>
                        <h2 className="font-display font-bold text-base text-ink tracking-tight leading-tight mb-2
                          group-hover:text-accent transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="text-ink-secondary text-xs leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
