'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Lock, Cpu, Eye, LifeBuoy } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'
import FloatingOrbs from '@/components/ui/FloatingOrbs'

const reasons = [
  {
    icon: Cpu,
    title: 'Expert Engineering Team',
    description: 'Senior engineers with 5–15 years of experience across every technology we use. No juniors on client projects.',
    color: '#3B82F6',
  },
  {
    icon: Zap,
    title: 'Agile Delivery',
    description: 'Bi-weekly sprints with live demos, transparent progress tracking, and the flexibility to pivot when needed.',
    color: '#8B5CF6',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'SOC2-aligned practices, penetration testing, GDPR compliance, and end-to-end encryption as standard.',
    color: '#06B6D4',
  },
  {
    icon: Shield,
    title: 'Modern Technology',
    description: 'We use the latest frameworks and tools — not legacy stacks — so your investment stays relevant for years.',
    color: '#10B981',
  },
  {
    icon: Eye,
    title: 'Full Transparency',
    description: 'Real-time access to project dashboards, code repositories, and Slack channels — no black boxes, ever.',
    color: '#F59E0B',
  },
  {
    icon: LifeBuoy,
    title: 'Long-Term Partnership',
    description: 'We are not a project shop. 60% of our revenue comes from clients who have been with us 3+ years.',
    color: '#EC4899',
  },
]

export default function WhyUsSection() {
  return (
    <section id="why-us" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg-soft" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <FloatingOrbs count={2} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-sm text-green-400 font-medium">Why Nexus Digital</span>
          </div>
          <AnimatedText
            text="The Difference Is in the Details"
            as="h2"
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
            stagger={0.07}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Six reasons why category-defining companies choose us as their long-term technology partner.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative glass-card rounded-2xl p-7 overflow-hidden transition-all duration-300"
                whileHover={{ y: -6 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 100%, ${reason.color}15, transparent 60%)` }}
                />
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: reason.color + '15', border: `1px solid ${reason.color}25` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon size={24} style={{ color: reason.color }} />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-3">{reason.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
