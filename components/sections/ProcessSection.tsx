'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Lightbulb, Pen, Code2, TestTube, Rocket, HeartHandshake } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'

const steps = [
  { icon: Search,         number: '01', title: 'Discovery',    description: 'Deep dive into your business goals, user needs, and competitive landscape to identify opportunities.', color: '#3B82F6', duration: '1–2 Weeks' },
  { icon: Lightbulb,      number: '02', title: 'Strategy',     description: 'Define the product roadmap, technology architecture, and success metrics for your project.', color: '#8B5CF6', duration: '1 Week' },
  { icon: Pen,            number: '03', title: 'Design',       description: 'Create intuitive UI/UX designs with interactive prototypes tested against real users.', color: '#06B6D4', duration: '2–3 Weeks' },
  { icon: Code2,          number: '04', title: 'Development',  description: 'Agile sprints with daily updates, code reviews, and continuous integration for quality delivery.', color: '#10B981', duration: '4–12 Weeks' },
  { icon: TestTube,       number: '05', title: 'Testing',      description: 'Rigorous QA across devices, load testing, security audits, and user acceptance testing.', color: '#F59E0B', duration: '1–2 Weeks' },
  { icon: Rocket,         number: '06', title: 'Launch',       description: 'Zero-downtime deployments, monitoring setup, and performance optimization from day one.', color: '#EC4899', duration: '1 Week' },
  { icon: HeartHandshake, number: '07', title: 'Support',      description: 'Ongoing maintenance, feature additions, and 24/7 monitoring to keep your product thriving.', color: '#8B5CF6', duration: 'Ongoing' },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = step.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pl-16 md:pl-0`}
    >
      {/* Timeline node */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
          style={{ backgroundColor: step.color + '20', borderColor: step.color }}
          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ delay: index * 0.08 + 0.1, duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: step.color }}
            animate={inView ? { scale: [0, 1] } : {}}
            transition={{ delay: index * 0.08 + 0.3 }}
          />
        </motion.div>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ borderColor: step.color + '60', border: '1px solid' }}
          animate={inView ? { scale: [1, 2, 1], opacity: [0.8, 0, 0.8] } : {}}
          transition={{ delay: index * 0.08 + 0.4, duration: 2, repeat: Infinity }}
        />
      </div>

      <div className={`md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <motion.div
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="glass-card rounded-2xl p-6 transition-colors duration-300 group cursor-pointer relative overflow-hidden"
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 0% 100%, ${step.color}12, transparent 60%)` }}
          />

          <div className={`flex items-center gap-4 mb-4`}>
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: step.color + '20', border: `1px solid ${step.color}30` }}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon size={20} style={{ color: step.color }} />
            </motion.div>
            <div>
              <div className="text-xs font-mono text-gray-500 mb-0.5">{step.number}</div>
              <h3 className="text-white font-bold text-lg">{step.title}</h3>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.description}</p>

          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: step.color + '15', color: step.color }}
            whileHover={{ scale: 1.05 }}
          >
            Duration: {step.duration}
          </motion.div>

          {/* Bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  )
}

export default function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true })

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-sm text-blue-400 font-medium">How We Work</span>
          </motion.div>

          <AnimatedText
            text="A Process Built for Predictable Excellence"
            as="h2"
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
            stagger={0.06}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Seven proven stages from idea to ongoing success — with full transparency at every step.
          </motion.p>
        </motion.div>

        <div className="relative" ref={lineRef}>
          {/* Animated timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5 overflow-hidden">
            <motion.div
              className="w-full"
              style={{ background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6, transparent)' }}
              initial={{ height: '0%' }}
              animate={lineInView ? { height: '100%' } : {}}
              transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
            />
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
