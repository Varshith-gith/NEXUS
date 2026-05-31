'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import FloatingOrbs from '@/components/ui/FloatingOrbs'

const techGroups = [
  {
    label: 'Frontend',
    color: '#3B82F6',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  },
  {
    label: 'Backend',
    color: '#8B5CF6',
    techs: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI'],
  },
  {
    label: 'Mobile',
    color: '#06B6D4',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    label: 'Cloud',
    color: '#10B981',
    techs: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
  },
  {
    label: 'Database',
    color: '#F59E0B',
    techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Supabase'],
  },
  {
    label: 'AI / ML',
    color: '#EC4899',
    techs: ['OpenAI', 'LangChain', 'TensorFlow', 'PyTorch'],
  },
]

function TechBadge({ tech, color, delay }: { tech: string; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300"
      style={{
        background: hovered ? color + '20' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 0 20px ${color}30` : 'none',
      }}
    >
      <span className="text-sm font-medium" style={{ color: hovered ? color : '#9CA3AF' }}>
        {tech}
      </span>
    </motion.div>
  )
}

export default function TechStackSection() {
  return (
    <section id="technologies" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg" />
      <FloatingOrbs count={2} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Our Tech Arsenal</span>
          </div>
          <AnimatedText
            text="Built With the Best Tools"
            as="h2"
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
            stagger={0.08}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We use battle-tested technologies and cutting-edge frameworks to build solutions that scale to millions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.6 }}
              className="relative glass-card rounded-2xl p-6 transition-colors duration-300 group"
              whileHover={{ y: -4 }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 0% 0%, ${group.color}10, transparent 60%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: group.color + '20', border: `1px solid ${group.color}30` }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech, ti) => (
                    <TechBadge key={tech} tech={tech} color={group.color} delay={gi * 0.05 + ti * 0.03} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
