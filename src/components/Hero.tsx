import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'

// Apple logo inline SVG
const AppleSVG = () => (
  <svg className="flex-shrink-0" width="16" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
  </svg>
)

function StoreBadge({ platform, onClick }: { platform: 'ios' | 'android'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ width: '160px' }}
      className="flex items-center gap-3 bg-black/60 rounded-[0.875rem] px-4 py-2.5
        border border-white/15 transition-all duration-300 active:scale-[0.97]
        hover:bg-black/80"
    >
      {platform === 'ios' ? (
        <AppleSVG />
      ) : (
        <img
          src="/images/google-play-logo.png"
          alt=""
          width="18"
          height="20"
          className="flex-shrink-0 object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      <div className="text-left">
        <p className="text-white/55 text-[9px] uppercase tracking-widest leading-none font-medium whitespace-nowrap">
          {platform === 'ios' ? 'Download on the' : 'Get it on'}
        </p>
        <p className="text-white text-[13px] font-semibold leading-tight mt-0.5 whitespace-nowrap">
          {platform === 'ios' ? 'App Store' : 'Google Play'}
        </p>
      </div>
    </button>
  )
}

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <section className="relative min-h-[100dvh] overflow-hidden flex flex-col">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/Website Images/Banner_Man_Running.jpg)' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(8,12,8,0.5) 0%, rgba(8,12,8,0.3) 40%, rgba(8,12,8,0.8) 80%, rgba(8,12,8,0.98) 100%)',
            }}
          />
        </div>

        {/* Ambient emerald orbs */}
        <div
          className="mesh-orb w-96 h-96 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
        />
        <div
          className="mesh-orb w-64 h-64 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
            bottom: '20%',
            right: '-5%',
            animationDelay: '1.5s',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 pt-28 pb-16 w-full max-w-sm mx-auto flex-1 justify-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
              Coming soon
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="font-display font-black text-5xl text-ink tracking-tighter leading-[0.92] mb-5"
          >
            Run Smarter.
            <br />
            <span className="text-accent">Train Your Way.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="text-ink-secondary text-base leading-relaxed mb-8 max-w-[34ch]"
          >
            Custom plans that fit your pace, goals, and schedule
          </motion.p>

          {/* Store badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <StoreBadge platform="ios" onClick={() => setShowVideo(true)} />
            <StoreBadge platform="android" onClick={() => setShowVideo(true)} />
          </motion.div>

          {/* CTA — scroll to benefits */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            onClick={() =>
              document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="w-full glass-panel text-ink font-semibold text-sm py-3.5 rounded-2xl
              transition-all duration-300 active:scale-[0.97]"
          >
            Learn more
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-11 right-0 w-9 h-9 rounded-full glass-panel
                  flex items-center justify-center text-ink-secondary"
              >
                <X size={16} weight="bold" />
              </button>
              <div className="rounded-3xl overflow-hidden bg-black">
                <video autoPlay loop muted playsInline className="w-full h-auto" onClick={() => setShowVideo(false)}>
                  <source src="/videos/ComingSoon.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-ink-muted text-xs text-center mt-4">Tap anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
