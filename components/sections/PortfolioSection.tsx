'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import TiltCard from '@/components/ui/TiltCard'
import AnimatedText from '@/components/ui/AnimatedText'

const categories = ['All', 'Web Apps', 'Mobile', 'SaaS', 'AI', 'E-Commerce']

const projects = [
  { id: 1, title: 'FinTrack Pro',  category: 'SaaS',       description: 'Real-time financial analytics platform processing $2B in transactions monthly.', tags: ['Next.js', 'PostgreSQL', 'AWS'],   color: '#3B82F6', metrics: ['$2B Processed', '50K Users', '99.99% Uptime'] },
  { id: 2, title: 'MedConnect',    category: 'Mobile',     description: 'Telemedicine app connecting 500K patients with doctors in real-time video sessions.', tags: ['React Native', 'Node.js', 'WebRTC'], color: '#8B5CF6', metrics: ['500K Patients', '10K Doctors', '4.9★ Rating'] },
  { id: 3, title: 'ShopFlow AI',   category: 'E-Commerce', description: 'AI-powered e-commerce platform with personalized recommendations engine.', tags: ['Next.js', 'Python', 'OpenAI'],  color: '#06B6D4', metrics: ['340% ROI', '2M Products', '60% Lift'] },
  { id: 4, title: 'LogistiX',      category: 'Web Apps',   description: 'Enterprise logistics management system for a global shipping company.', tags: ['React', 'NestJS', 'Redis'],     color: '#10B981', metrics: ['200 Countries', '1M/Day', '40% Efficiency'] },
  { id: 5, title: 'NeuralDesk',    category: 'AI',         description: 'AI-powered customer support automation reducing ticket volume by 70%.', tags: ['Python', 'LangChain', 'GPT-4'], color: '#EC4899', metrics: ['70% Automation', '2 Min', '98% Satisfaction'] },
  { id: 6, title: 'EduPulse',      category: 'SaaS',       description: 'Interactive learning management system used by 200+ universities globally.', tags: ['React', 'Django', 'PostgreSQL'], color: '#F59E0B', metrics: ['200+ Uni', '2M Students', '4.8★ Rating'] },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <TiltCard maxTilt={8} className="group h-full">
        <motion.div
          className="relative overflow-hidden rounded-2xl glass-card p-6 h-full cursor-pointer"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ borderColor: hovered ? project.color + '50' : 'rgba(255,255,255,0.05)' }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}15, transparent 70%)` }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <motion.span
                  className="text-xs font-medium px-2.5 py-1 rounded-full mb-3 inline-block"
                  style={{ backgroundColor: project.color + '20', color: project.color }}
                  whileHover={{ scale: 1.05 }}
                >
                  {project.category}
                </motion.span>
                <h3 className="text-white font-bold text-xl">{project.title}</h3>
              </div>
              <motion.div
                animate={{ opacity: hovered ? 1 : 0, rotate: hovered ? 0 : -45, scale: hovered ? 1 : 0.7 }}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"
                transition={{ duration: 0.25 }}
              >
                <ExternalLink size={14} className="text-white" />
              </motion.div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map(tag => (
                <motion.span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 border border-white/5"
                  whileHover={{ scale: 1.05, borderColor: project.color + '40', color: project.color }}
                  transition={{ duration: 0.15 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {project.metrics.map((metric, mi) => (
                <motion.div
                  key={metric}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: mi * 0.1 + index * 0.05 + 0.3 }}
                >
                  <div className="text-xs font-semibold text-white">{metric}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </TiltCard>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Our Work</span>
          </motion.div>

          <AnimatedText
            text="Projects That Define Excellence"
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
            A curated selection of our most impactful digital solutions across industries.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'glass text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
