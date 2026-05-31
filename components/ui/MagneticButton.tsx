'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function MagneticButton({ children, className = '', strength = 0.35, onClick, type = 'button' }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovering, setHovering] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovering(false)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: hovering ? 1.04 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}
