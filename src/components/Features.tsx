import { motion } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'

interface Feature {
  eyebrow: string
  title: string
  description: string
  bullets: string[]
  image: string
  imageAlt: string
}

const features: Feature[] = [
  {
    eyebrow: 'Personalized plans',
    title: 'Personalized training plans',
    description:
      'Science-backed training that evolves with you. If you\'ve got pavement, you\'ve got a plan.',
    bullets: [
      'Speed workouts, tempo runs, and race-day prep',
      'Workouts calibrated to your fitness level',
      'Plans that automatically adjust based on progress',
      'Upload an existing plan and break it into guided workouts',
    ],
    image: '/images/WorkoutPlans.svg',
    imageAlt: 'Trekon workout plan view',
  },
  {
    eyebrow: 'Flexible scheduling',
    title: 'Flexible scheduling',
    description:
      'Life happens. Smart scheduling technology that works around your busy life, not against it.',
    bullets: [
      'Drag and drop workouts with automatic adjustments',
      'Recovery-aware: rest days protected, tough sessions sensibly spaced',
      'Syncs with your existing calendar',
    ],
    image: '/images/trekon_calendar.svg',
    imageAlt: 'Calendar view of training schedule',
  },
  {
    eyebrow: 'Track and analyse',
    title: 'Track workouts and analyse performance',
    description:
      'Accurate tracking and in-depth analytics to monitor progress and reach your goals.',
    bullets: [
      'Distance, pace, and route as you run',
      'Analyse trends, measure improvements, get race time predictions',
      'Seamlessly sync with Strava',
    ],
    image: '/images/trekon_tracking.svg',
    imageAlt: 'Workout tracking analytics',
  },
]

export default function Features() {
  return (
    <section id="features" className="pb-4 px-5">
      <div className="max-w-lg mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={feature.eyebrow}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              delay: 0,
              duration: 0.7,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="mb-4"
          >
            {/* Double-bezel card */}
            <div
              className="p-[1px] rounded-[1.75rem]"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="rounded-[calc(1.75rem-1px)] overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                {/* Image */}
                <div className="bg-surface-light p-6 flex items-center justify-center min-h-48">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full max-h-52 object-contain animate-float"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-flex items-center rounded-full px-3 py-1 mb-4"
                    style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-accent">
                      {feature.eyebrow}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-xl text-ink tracking-tight leading-tight mb-3">
                    {feature.title}
                  </h2>
                  <p className="text-ink-secondary text-sm leading-relaxed mb-5">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="text-accent flex-shrink-0 mt-0.5"
                        />
                        <span className="text-ink-secondary text-sm leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
