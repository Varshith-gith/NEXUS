'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ScrambleText({ text, trigger }: { text: string; trigger: boolean }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!trigger) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) =>
            i < iteration
              ? text[i]
              : char === ' '
              ? ' '
              : LETTERS[Math.floor(Math.random() * LETTERS.length)]
          )
          .join('')
      )
      if (iteration >= text.length) clearInterval(interval)
      iteration += 0.4
    }, 40)
    return () => clearInterval(interval)
  }, [trigger, text])

  return <span>{display}</span>
}

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [done,     setDone]     = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    // Skip loader on subsequent visits in same session
    if (sessionStorage.getItem('nexus-loaded')) { setDone(true); return }
    setMounted(true)

    const start = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setDone(true)
          sessionStorage.setItem('nexus-loaded', '1')
        }, 300)
      }
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {!done && mounted && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.12), transparent)' }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <Zap size={32} className="text-white" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ filter: 'blur(16px)', zIndex: -1 }}
            />
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl font-black tracking-tight text-white mb-12"
          >
            <span>NEXUS</span>
            <span className="text-gradient">DIGITAL</span>
          </motion.div>

          {/* Progress track */}
          <div className="relative w-56">
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                  boxShadow: '0 0 12px rgba(139,92,246,0.6)',
                }}
              />
            </div>
            <motion.div
              className="mt-3 text-center font-mono text-xs text-gray-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ScrambleText text={`LOADING ${Math.round(Math.min(progress, 100))}%`} trigger={mounted} />
            </motion.div>
          </div>

          {/* Corner decorations */}
          {[
            'top-6 left-6 border-t border-l',
            'top-6 right-6 border-t border-r',
            'bottom-6 left-6 border-b border-l',
            'bottom-6 right-6 border-b border-r',
          ].map((cls) => (
            <motion.div
              key={cls}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`absolute w-8 h-8 border-blue-500/40 ${cls}`}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
