import { useState } from 'react'
import { motion } from 'framer-motion'
import ComingSoonModal from './ComingSoonModal'

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

export default function AppDownload() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <section className="pt-4 pb-20 px-5">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-[2rem] p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="mesh-orb w-56 h-56"
                style={{
                  background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
                  top: '-20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6"
                  style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                    Ready to start
                  </span>
                </div>

                <h2 className="font-display font-black text-3xl text-ink tracking-tighter leading-tight mb-4">
                  Start your journey today
                </h2>
                <p className="text-ink-secondary text-sm leading-relaxed mb-8 max-w-[30ch] mx-auto">
                  Download the free app and get your first personalised training plan in minutes.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <StoreBadge platform="ios" onClick={() => setShowVideo(true)} />
                  <StoreBadge platform="android" onClick={() => setShowVideo(true)} />
                </div>

                <p className="text-ink-muted text-xs mt-5">
                  Free download. No subscription required. Works offline.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </>
  )
}
