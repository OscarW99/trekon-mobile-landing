import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import { submitToGAS } from '../lib/gas'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ComingSoonModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    submitToGAS({ type: 'email_capture', email: trimmed })
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
      setError('')
    }, 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ backgroundColor: 'rgba(4,8,4,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full glass-panel
                flex items-center justify-center"
              aria-label="Close"
            >
              <X size={15} weight="bold" className="text-ink" />
            </button>

            {/* Card */}
            <div
              className="rounded-[1.75rem] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Video */}
              <div className="relative bg-black overflow-hidden" style={{ aspectRatio: '9/5' }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    const el = e.currentTarget.parentElement
                    if (el) el.style.display = 'none'
                  }}
                >
                  <source src="/videos/ComingSoon.mp4" type="video/mp4" />
                </video>
                <div
                  className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(18,24,18,1), transparent)' }}
                />
              </div>

              {/* Content */}
              <div className="px-6 pt-4 pb-7">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
                        style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                          Launching soon
                        </span>
                      </div>

                      <h2 className="font-display font-black text-2xl text-ink tracking-tight leading-tight mb-2">
                        Trekon is almost here.
                      </h2>
                      <p className="text-ink-secondary text-sm leading-relaxed mb-5">
                        Drop your email and be first in line when we go live. No spam, just the launch notification.
                      </p>

                      <form onSubmit={handleSubmit} noValidate>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value)
                                if (error) setError('')
                              }}
                              placeholder="your@email.com"
                              autoComplete="email"
                              className={`w-full px-4 py-3 rounded-xl text-sm text-ink placeholder:text-ink-muted
                                border outline-none transition-colors duration-200
                                focus:ring-2 focus:ring-accent/20 bg-white/5
                                ${error ? 'border-red-500/60' : 'border-white/10'}`}
                            />
                            {error && (
                              <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 bg-accent text-background font-semibold
                              text-sm px-4 py-3 rounded-xl whitespace-nowrap flex-shrink-0
                              transition-all duration-300 active:scale-[0.97] group"
                          >
                            Notify me
                            <ArrowRight
                              size={14}
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                          </button>
                        </div>
                      </form>

                      <p className="text-ink-muted text-xs mt-4">
                        Available on iOS and Android. Free download.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      className="py-3"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}
                        >
                          <CheckCircle size={20} weight="fill" className="text-accent" />
                        </div>
                        <h2 className="font-display font-bold text-xl text-ink tracking-tight">
                          You're on the list.
                        </h2>
                      </div>
                      <p className="text-ink-secondary text-sm leading-relaxed">
                        We'll send one email when Trekon goes live. That's it.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
