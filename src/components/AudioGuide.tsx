import { motion } from 'framer-motion'
import { Headphones, SpeakerHigh } from '@phosphor-icons/react'

const quotes = [
  '"This lap is 1 mile at 8:45 per mile pace."',
  '"Halfway there, keep it up!"',
  '"Segment complete in 3 minutes 45 seconds. Average pace: 5 minutes 20 seconds per kilometer."',
  '"Almost there. Next up is 60 seconds rest."',
  '"Next interval in 10 seconds."',
  '"Current pace 9:00/mile. Target 8:30. Pick it up!"',
]

export default function AudioGuide() {
  return (
    <section className="py-20 px-5">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Card with accent gradient */}
          <div
            className="relative overflow-hidden rounded-[1.75rem] p-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(26,77,46,0.8) 0%, rgba(15,46,26,0.9) 100%)',
              border: '1px solid rgba(74,222,128,0.15)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Background orb */}
            <div
              className="mesh-orb w-48 h-48"
              style={{
                background: 'radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)',
                top: '-30%',
                right: '-10%',
              }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-start gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.2)' }}
              >
                <Headphones size={18} weight="light" className="text-accent" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-ink tracking-tight leading-tight">
                  Focus on your stride,
                  <br />
                  not your screen.
                </h2>
              </div>
            </div>

            <p className="relative z-10 text-ink-secondary text-sm leading-relaxed mb-6">
              Real-time audio cues for intervals, pace changes, and workout progress.
              Choose your voice and guidance level.
            </p>

            {/* Quote examples */}
            <div className="relative z-10 space-y-2">
              {quotes.slice(0, 4).map((quote, i) => (
                <div
                  key={quote}
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    opacity: 1 - i * 0.15,
                  }}
                >
                  <SpeakerHigh
                    size={13}
                    weight="fill"
                    className="text-accent flex-shrink-0 mt-0.5"
                  />
                  <p className="text-ink-secondary text-xs leading-snug italic">{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
