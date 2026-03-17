import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="px-5 pb-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col items-center text-center gap-5">
          {/* Logo */}
          <img
            src="/images/Trekon_Logo_Transparent.png"
            alt="Trekon"
            className="h-7 w-auto brightness-0 invert opacity-50"
            onError={(e) => {
              const t = e.target as HTMLImageElement
              t.style.display = 'none'
              t.insertAdjacentHTML(
                'afterend',
                '<span class="font-display font-bold text-ink-muted text-base tracking-tight">Trekon</span>'
              )
            }}
          />

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href="/#features" className="text-ink-muted text-xs hover:text-ink-secondary transition-colors">
              Features
            </a>
            <Link to="/blog" className="text-ink-muted text-xs hover:text-ink-secondary transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-ink-muted text-xs hover:text-ink-secondary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-ink-muted text-xs">
            &copy; {new Date().getFullYear()} Trekon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
