'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { getLenisInstance } from '@/lib/lenis'

const navItems = [
  { label: 'Home',         href: '#home' },
  { label: 'Services',     href: '#services' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Portfolio',    href: '#portfolio' },
  { label: 'Process',      href: '#process' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navigation() {
  const [scrolled,      setScrolled]    = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen,    setMobileOpen]  = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navItems.map(item => item.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use Lenis for smooth scrolling; fall back to native if not ready
  const scrollTo = (href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenisInstance()
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const isDark = theme === 'dark'

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div
          className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-2xl shadow-black/20' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollTo('#home')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-50 -z-10" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Nexus<span className="text-gradient">Digital</span>
              </span>
            </motion.div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    activeSection === item.href.slice(1)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right side: theme toggle + CTA + mobile menu */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-white/20"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Sun size={16} className="text-yellow-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Moon size={16} className="text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA — desktop */}
              <motion.button
                onClick={() => scrollTo('#contact')}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={14} />
                Start Your Project
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-lg glass flex items-center justify-center text-white"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 glass-strong rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => scrollTo('#contact')}
                className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold"
              >
                Start Your Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
