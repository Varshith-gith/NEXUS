'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO, FinTrack Inc.',
    quote: 'Nexus Digital transformed our entire technology stack in 6 months. Their engineering quality is exceptional — every PR is a masterclass in clean code. Delivery was on time, on budget, and beyond expectations.',
    rating: 5,
    color: '#3B82F6',
    initials: 'SC',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Founder, MedConnect',
    quote: 'We went from concept to 500K users in 18 months. The Nexus team felt like having a world-class CTO embedded in our startup. They understood our vision and built something truly special.',
    rating: 5,
    color: '#8B5CF6',
    initials: 'MR',
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'VP Engineering, LogistiX',
    quote: 'The system they built handles 1 million shipments per day without breaking a sweat. ROI was 4x within the first year. I recommend Nexus to every CTO I know.',
    rating: 5,
    color: '#06B6D4',
    initials: 'PP',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CEO, ShopFlow',
    quote: 'Our conversion rate increased 60% after the redesign. Nexus understood our business metrics as deeply as they understood the code. A truly rare combination.',
    rating: 5,
    color: '#10B981',
    initials: 'DK',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [inView])

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section ref={ref} id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 sec-bg" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-15 transition-all duration-1000 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${t.color}, transparent)` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-500/20 mb-6">
            <Star size={12} className="text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">Client Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-6 left-8 opacity-10">
            <Quote size={80} className="text-white" />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-gray-400 text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === current ? t.color : 'rgba(255,255,255,0.2)',
                    width: i === current ? '24px' : '8px',
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
