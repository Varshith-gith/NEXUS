'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}

export default function TiltCard({ children, className = '', maxTilt = 12, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-maxTilt, maxTilt]), { stiffness: 300, damping: 30 })

  // Glare — derive positions at top level (no inline useTransform in JSX)
  const glareX = useTransform(rawX, [-1, 1], ['20%', '80%'])
  const glareY = useTransform(rawY, [-1, 1], ['20%', '80%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(((e.clientX - rect.left)  / rect.width)  * 2 - 1)
    rawY.set(((e.clientY - rect.top)   / rect.height) * 2 - 1)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glare — CSS-driven using motion values via inline style (no hook in JSX) */}
      {glare && hovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
          }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
}
