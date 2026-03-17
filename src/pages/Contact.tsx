import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { submitToGAS } from '../lib/gas'

type Status = 'idle' | 'sending' | 'sent'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Please enter your name.'
    if (!email.trim()) e.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = 'Please enter a valid email address.'
    if (!message.trim()) e.message = 'Please enter your message.'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    submitToGAS({ type: 'contact', name: name.trim(), email: email.trim(), message: message.trim() })
      .then(() => setStatus('sent'))
      .catch(() => setStatus('sent'))
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="pt-24 pb-20 px-5">
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
              className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink-secondary
                transition-colors duration-200 group"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 mb-5"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                Get in touch
              </span>
            </div>
            <h1 className="font-display font-black text-4xl text-ink tracking-tighter leading-[0.95] mb-3">
              Contact us
            </h1>
            <p className="text-ink-secondary text-sm leading-relaxed">
              Have a question about Trekon? Fill in the form and we will get back to you as soon as we can.
            </p>
          </motion.div>

          {/* Form / Success */}
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="rounded-[1.75rem] p-8 text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}
              >
                <PaperPlaneTilt size={24} weight="fill" className="text-accent" />
              </div>
              <h2 className="font-display font-bold text-2xl text-ink tracking-tight mb-2">
                Message sent
              </h2>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Thanks for reaching out. We will be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="rounded-[1.75rem] p-6"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-ink mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl text-ink text-sm placeholder:text-ink-muted
                      outline-none transition-colors duration-200
                      focus:ring-2 focus:ring-accent/20
                      ${errors.name ? 'border border-red-500/60 bg-red-500/5' : 'border border-white/10 bg-white/5'}`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-ink mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl text-ink text-sm placeholder:text-ink-muted
                      outline-none transition-colors duration-200
                      focus:ring-2 focus:ring-accent/20
                      ${errors.email ? 'border border-red-500/60 bg-red-500/5' : 'border border-white/10 bg-white/5'}`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-ink mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to know?"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl text-ink text-sm placeholder:text-ink-muted
                      outline-none transition-colors duration-200 resize-none
                      focus:ring-2 focus:ring-accent/20
                      ${errors.message ? 'border border-red-500/60 bg-red-500/5' : 'border border-white/10 bg-white/5'}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-background
                    font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-300
                    ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]
                    disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  {status !== 'sending' && <PaperPlaneTilt size={15} weight="fill" />}
                </button>

              </form>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
