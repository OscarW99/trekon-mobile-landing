import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ComingSoonModal from './ComingSoonModal'

const NAV_OFFSET = 64

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

const navLinks = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'Training', href: '/#benefits', sectionId: 'benefits' },
  { label: 'Features', href: '/#features', sectionId: 'features' },
  { label: 'Blog', href: '/blog', sectionId: null },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    // Lock body without layout/viewport jump while overlay animates.
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    return () => {
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      const y = Math.abs(parseInt(top || '0', 10)) || 0
      window.scrollTo(0, y)
    }
  }, [menuOpen])

  // After navigating to home, scroll to the stored section
  useEffect(() => {
    if (location.pathname !== '/') return
    const target = sessionStorage.getItem('scrollTo')
    if (target) {
      sessionStorage.removeItem('scrollTo')
      setTimeout(() => scrollToSection(target), 80)
    }
  }, [location.pathname])

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent, sectionId: string) => {
      e.preventDefault()
      setMenuOpen(false)
      if (sectionId === 'home') {
        if (location.pathname !== '/') navigate('/')
        else window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (location.pathname === '/') {
        scrollToSection(sectionId)
      } else {
        sessionStorage.setItem('scrollTo', sectionId)
        navigate('/')
      }
    },
    [location.pathname, navigate]
  )

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center z-10"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <img
            src="/images/Trekon_Logo_Transparent.png"
            alt="Trekon"
            className="h-8 w-auto brightness-0 invert"
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.style.display = 'none'
              t.insertAdjacentHTML('afterend', '<span class="font-display font-bold text-ink text-lg tracking-tight">Trekon</span>')
            }}
          />
        </Link>

        {/* Hamburger */}
        <button
          className="z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full glass-panel"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-4 h-[1.5px] bg-ink rounded-full"
            animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          />
          <motion.span
            className="block w-4 h-[1.5px] bg-ink rounded-full"
            animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          />
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center px-6"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="mesh-orb w-80 h-80"
              style={{
                background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            <nav
              className="relative z-10 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 12, opacity: 0 }}
                  transition={{ delay: i * 0.07 + 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                >
                  {link.sectionId ? (
                    <a
                      href={link.href}
                      className="block text-4xl font-display font-bold text-ink tracking-tight hover:text-accent transition-colors duration-200"
                      onClick={(e) => handleAnchorClick(e, link.sectionId!)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="block text-4xl font-display font-bold text-ink tracking-tight hover:text-accent transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.button
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 bg-accent text-background font-bold text-lg px-10 py-4 rounded-full"
                onClick={() => { setMenuOpen(false); setShowVideo(true) }}
                style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
              >
                Download free app
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ComingSoonModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </>
  )
}
