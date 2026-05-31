'use client'

import { motion } from 'framer-motion'

const orbs = [
  { color: '#3B82F6', size: 400, x: '10%',  y: '20%',  delay: 0,   duration: 18 },
  { color: '#8B5CF6', size: 300, x: '75%',  y: '60%',  delay: 3,   duration: 22 },
  { color: '#06B6D4', size: 250, x: '50%',  y: '10%',  delay: 6,   duration: 16 },
  { color: '#3B82F6', size: 200, x: '85%',  y: '15%',  delay: 9,   duration: 20 },
  { color: '#8B5CF6', size: 350, x: '20%',  y: '75%',  delay: 4,   duration: 24 },
]

export default function FloatingOrbs({ count = 3 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.slice(0, count).map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top:  orb.y,
            translateX: '-50%',
            translateY: '-50%',
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
