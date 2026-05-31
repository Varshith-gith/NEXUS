'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch,  setIsTouch]  = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 60 })
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 60 })

  // Ring lags for trailing effect
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 })

  // Glow lags even more
  const glowX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const glowY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if ('ontouchstart' in window) { setIsTouch(true); return }
    setIsTouch(false)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }

    const checkInteractive = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [role="button"], input, select, textarea, label, [data-cursor-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkInteractive)
    window.addEventListener('mousedown', () => setClicking(true))
    window.addEventListener('mouseup',   () => setClicking(false))
    document.documentElement.addEventListener('mouseleave', () => setVisible(false))
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkInteractive)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        className="fixed top-0 left-0 z-[9990] pointer-events-none rounded-full"
        style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:  hovering ? 120 : 80,
          height: hovering ? 120 : 80,
          opacity: visible ? (hovering ? 0.15 : 0.08) : 0,
          background: hovering
            ? 'radial-gradient(circle, #8B5CF6, transparent)'
            : 'radial-gradient(circle, #3B82F6, transparent)',
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:       hovering ? 52 : clicking ? 20 : 36,
          height:      hovering ? 52 : clicking ? 20 : 36,
          borderWidth: hovering ? 2 : 1,
          borderColor: hovering ? 'rgba(139,92,246,0.9)' : 'rgba(59,130,246,0.5)',
          borderStyle: 'solid',
          opacity:     visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:           clicking ? 14 : hovering ? 10 : 6,
          height:          clicking ? 14 : hovering ? 10 : 6,
          backgroundColor: hovering ? '#a78bfa' : '#60a5fa',
          opacity:         visible ? 1 : 0,
          boxShadow:       hovering
            ? '0 0 12px 3px rgba(139,92,246,0.6)'
            : '0 0 8px 2px rgba(59,130,246,0.5)',
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />
    </>
  )
}
