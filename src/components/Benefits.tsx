import { motion } from 'framer-motion'
import { Target, TrendUp, Headphones } from '@phosphor-icons/react'

const benefits = [
  {
    icon: Target,
    title: 'Personal pacing',
    description: 'Workouts calibrated to your fitness level — not a generic plan built for someone else.',
  },
  {
    icon: TrendUp,
    title: 'Smart adaptation',
    description: 'Plans automatically adjust based on your progress, keeping every session purposeful.',
  },
  {
    icon: Headphones,
    title: 'Audio guidance',
    description: 'Real-time voice cues so you can focus on your stride, not your screen.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-5">
      <div className="max-w-lg mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="font-display font-bold text-2xl text-ink tracking-tight mb-2">
            Training built for real life
          </h2>
          <p className="text-ink-secondary text-sm leading-relaxed">
            No track required. Just pavement and a plan.
          </p>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4"
        >
          {benefits.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex items-start gap-4 p-5 rounded-2xl glass-panel"
            >
              {/* Icon container */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.15)' }}
              >
                <Icon size={20} weight="light" className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-ink text-base mb-1">{title}</h3>
                <p className="text-ink-secondary text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
