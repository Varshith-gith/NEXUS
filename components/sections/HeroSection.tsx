'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'

const words          = ['Growth', 'Impact', 'Scale', 'Success', 'Future']
const headlineWords  = ['Building', 'Digital', 'Experiences', 'That', 'Drive']

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  useEffect(() => {
    const id = setInterval(() => setWordIndex(p => (p + 1) % words.length), 2500)
    return () => clearInterval(id)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bare-minimum gradient — just softens the very bottom edge */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none z-10" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-10" />

      <motion.div style={{ opacity, y }} className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 mb-8"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-gray-300 font-medium">Trusted by 100+ companies worldwide</span>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-6">
            {headlineWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.2em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0, rotate: 4 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 60, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -60, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-gradient"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10"
          >
            We help startups, enterprises, and organizations build scalable web platforms,
            mobile apps, AI solutions, and digital products that transform industries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              onClick={() => scrollTo('contact')}
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base flex items-center gap-3 shadow-2xl shadow-blue-500/30 overflow-hidden"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Start Your Project</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo('portfolio')}
              className="group px-8 py-4 rounded-2xl glass border border-white/15 text-white font-semibold text-base flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <Play size={12} className="text-white ml-0.5" />
              </motion.div>
              View Our Work
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex items-center gap-8 mt-14 pt-10 border-t border-white/10"
          >
            {[
              { value: '250+', label: 'Projects Delivered' },
              { value: '100+', label: 'Happy Clients' },
              { value: '15+',  label: 'Countries' },
              { value: '8+',   label: 'Years Experience' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('services')}
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-blue-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
