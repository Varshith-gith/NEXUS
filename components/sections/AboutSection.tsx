'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Globe, Users, Zap } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'
import FloatingOrbs from '@/components/ui/FloatingOrbs'

const metrics = [
  { icon: Zap,   value: 250, suffix: '+', label: 'Projects Delivered', color: '#3B82F6' },
  { icon: Users, value: 100, suffix: '+', label: 'Happy Clients',       color: '#8B5CF6' },
  { icon: Globe, value: 15,  suffix: '+', label: 'Countries Served',    color: '#06B6D4' },
  { icon: Award, value: 8,   suffix: '+', label: 'Years Experience',    color: '#10B981' },
]

function CounterNumber({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [inView, target])
  return <>{count}{suffix}</>
}

const timeline = [
  { year: '2016', title: 'Founded',              description: 'Started as a small web development studio with 3 passionate developers.' },
  { year: '2018', title: 'First Enterprise',     description: 'Landed first Fortune 500 contract, scaled the team to 15 engineers.' },
  { year: '2020', title: 'Global Expansion',     description: 'Expanded to 10+ countries, opened European operations in Berlin.' },
  { year: '2022', title: 'AI Division',          description: 'Launched dedicated AI & ML practice with 20+ data scientists.' },
  { year: '2024', title: 'Industry Leader',      description: 'Recognized as top IT services company in 5 global markets.' },
]

export default function AboutSection() {
  const metricsRef = useRef<HTMLDivElement>(null)
  const metricsInView = useInView(metricsRef, { once: true })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg-soft" />
      <FloatingOrbs count={2} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Our Story</span>
            </motion.div>

            <AnimatedText
              text="Built by Builders, For Builders"
              as="h2"
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight"
              stagger={0.08}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg leading-relaxed mb-6"
            >
              We started as developers frustrated by the gap between what clients needed and what agencies delivered. So we built the company we wished existed.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 leading-relaxed mb-10"
            >
              Today, Nexus Digital is a team of 80+ engineers, designers, and strategists building digital products that move markets.
            </motion.p>

            <div className="space-y-4">
              {[
                'Quality-first engineering culture',
                'Dedicated project managers on every engagement',
                'Transparent pricing with no hidden fees',
                'Post-launch support and maintenance included',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 6 }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.2, backgroundColor: 'rgba(59,130,246,0.3)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </motion.div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative pl-6 border-l border-white/10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative mb-7 last:mb-0"
                >
                  {/* Node */}
                  <motion.div
                    className="absolute -left-[29px] w-4 h-4 rounded-full bg-blue-600 border-2 border-[#050505]"
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1, duration: 0.4 }}
                  />

                  <motion.div
                    whileHover={{ x: 8, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="glass-card rounded-xl p-4 hover:border-blue-500/30 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <motion.span
                        className="text-blue-400 font-mono text-sm font-bold"
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.year}
                      </motion.span>
                      <span className="text-white font-semibold">{item.title}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Metrics */}
        <div ref={metricsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative glass-card rounded-2xl p-6 text-center overflow-hidden group cursor-default"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${metric.color}25, transparent 70%)` }}
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={24} className="mx-auto mb-3 opacity-60" style={{ color: metric.color }} />
                </motion.div>
                <motion.div
                  className="text-4xl font-black text-white mb-1"
                  style={{ textShadow: `0 0 30px ${metric.color}60` }}
                >
                  <CounterNumber target={metric.value} suffix={metric.suffix} inView={!!metricsInView} />
                </motion.div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
                {/* Glow ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: metric.color + '30' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
