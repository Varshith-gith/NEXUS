'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Smartphone, Palette, TrendingUp, Search, Brain, Cloud, Users } from 'lucide-react'
import TiltCard from '@/components/ui/TiltCard'
import FloatingOrbs from '@/components/ui/FloatingOrbs'
import AnimatedText from '@/components/ui/AnimatedText'

const services = [
  { icon: Code2,       title: 'Full Stack Development',  description: 'End-to-end web applications built with modern frameworks, scalable architecture, and pixel-perfect implementation.', stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL'], color: '#3B82F6', glow: 'rgba(59,130,246,0.25)' },
  { icon: Smartphone,  title: 'Mobile App Development',  description: 'Native and cross-platform mobile experiences for iOS and Android that users love and businesses rely on.', stack: ['React Native', 'Flutter', 'Swift', 'Kotlin'], color: '#8B5CF6', glow: 'rgba(139,92,246,0.25)' },
  { icon: Palette,     title: 'UI/UX Design',            description: 'Strategic design that converts visitors into customers — beautiful interfaces backed by user research.', stack: ['Figma', 'Framer', 'Prototyping', 'Research'], color: '#06B6D4', glow: 'rgba(6,182,212,0.25)' },
  { icon: TrendingUp,  title: 'Digital Marketing',       description: 'Data-driven campaigns that generate qualified leads and deliver measurable ROI for your business.', stack: ['Google Ads', 'Meta', 'Analytics', 'CRO'], color: '#10B981', glow: 'rgba(16,185,129,0.25)' },
  { icon: Search,      title: 'SEO Optimization',        description: 'Technical and content SEO strategies that drive organic growth and establish long-term digital authority.', stack: ['Technical SEO', 'Content', 'Link Building', 'Analytics'], color: '#F59E0B', glow: 'rgba(245,158,11,0.25)' },
  { icon: Brain,       title: 'AI & Automation',         description: 'Custom AI solutions and intelligent automation that transform business processes and unlock new capabilities.', stack: ['OpenAI', 'LangChain', 'Python', 'MLOps'], color: '#EC4899', glow: 'rgba(236,72,153,0.25)' },
  { icon: Cloud,       title: 'Cloud Solutions',         description: 'Enterprise-grade cloud infrastructure on AWS, Azure, and GCP with 99.99% uptime SLA.', stack: ['AWS', 'Azure', 'Kubernetes', 'Terraform'], color: '#06B6D4', glow: 'rgba(6,182,212,0.25)' },
  { icon: Users,       title: 'IT Consulting',           description: 'Strategic technology advisory that aligns your IT investments with business objectives for maximum impact.', stack: ['Strategy', 'Architecture', 'Audit', 'Roadmap'], color: '#8B5CF6', glow: 'rgba(139,92,246,0.25)' },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard maxTilt={10} className="group h-full">
        <motion.div
          className="relative h-full rounded-2xl p-6 glass-card overflow-hidden cursor-pointer"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ borderColor: hovered ? service.color + '50' : 'rgba(255,255,255,0.05)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow bg */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow}, transparent 70%)` }}
          />

          {/* Animated border shimmer */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `linear-gradient(135deg, ${service.color}30, transparent 50%, ${service.color}15)` }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: service.color + '20', border: `1px solid ${service.color}30` }}
              animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 8 : 0, y: hovered ? -4 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon size={22} style={{ color: service.color }} />
            </motion.div>

            <motion.h3
              className="text-white font-bold text-lg mb-3"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>

            <div className="flex flex-wrap gap-2">
              {service.stack.map((tech, ti) => (
                <motion.span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: service.color + '15', color: service.color, border: `1px solid ${service.color}25` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 + ti * 0.05 + 0.3 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom shimmer line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Corner accent */}
          <motion.div
            className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: service.color + '20' }}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
          </motion.div>
        </motion.div>
      </TiltCard>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg" />
      <FloatingOrbs count={3} />

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
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-blue-400 font-medium">What We Build</span>
          </motion.div>

          <AnimatedText
            text="Services That Scale Your Business"
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
            From concept to launch, we deliver end-to-end digital solutions that drive measurable growth.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
