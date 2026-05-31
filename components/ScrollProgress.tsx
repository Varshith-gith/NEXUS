'use client'

import { useScroll, motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9997] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #3B82F6, #06B6D4, #8B5CF6)',
        boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)',
      }}
    />
  )
}
