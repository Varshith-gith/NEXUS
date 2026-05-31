'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { getLenisInstance } from '@/lib/lenis'

/* ── Link columns (GitHub-style 4-column grid) ─────────────── */
const COLUMNS = [
  {
    heading: 'Services',
    links: [
      'Full Stack Dev',
      'Mobile Apps',
      'UI/UX Design',
      'AI & Automation',
      'Cloud Solutions',
      'SEO Optimization',
      'E-Commerce',
      'IT Consulting',
    ],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Portfolio', 'Our Process', 'Careers', 'Press Kit', 'Blog'],
  },
  {
    heading: 'Resources',
    links: ['Case Studies', 'Documentation', 'Tech Blog', 'Changelog', 'System Status', 'Community'],
  },
  {
    heading: 'Support',
    links: ['Contact Us', 'Get a Quote', 'Schedule a Call', 'Enterprise', 'Training', 'Help Center'],
  },
]

/* ── Social SVGs (no deprecated lucide brand icons) ────────── */
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.907-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

const SOCIALS = [
  { Icon: XIcon,         label: 'X (Twitter)' },
  { Icon: LinkedInIcon,  label: 'LinkedIn' },
  { Icon: GitHubIcon,    label: 'GitHub' },
  { Icon: InstagramIcon, label: 'Instagram' },
]

const LEGAL = ['Privacy', 'Terms', 'Cookie Policy', 'Security']

/* ── Component ──────────────────────────────────────────────── */
export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenisInstance()
    if (lenis) lenis.scrollTo(el, { duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Fully transparent — Three.js animation visible beneath */}

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">

        {/* ── Top: logo + 4 columns ─────────────────────────── */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Logo block */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <motion.button
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2.5 mb-5 group"
              whileHover={{ x: 2 }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Zap size={18} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
              </div>
              <span className="text-white font-bold text-lg leading-none">
                Nexus<span className="text-gradient">Digital</span>
              </span>
            </motion.button>

            <p className="text-gray-300 text-[13px] leading-relaxed max-w-[200px]">
              Building world-class digital products for ambitious companies.
            </p>
          </div>

          {/* 4 link columns */}
          {COLUMNS.map((col, ci) => (
            <div key={col.heading}>
              <h4 className="text-white text-[13px] font-semibold mb-4 tracking-wide">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, li) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + li * 0.03 }}
                  >
                    <a
                      href="#"
                      className="text-gray-300 text-[13px] hover:text-white transition-colors duration-150 block"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ───────────────────────────────────────── */}
        <div className="border-t border-white/8" />

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: brand + copyright + legal links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-gray-300 text-[12px]">
            <span className="font-medium text-gray-300">Nexus Digital, Inc.</span>
            <span>© {new Date().getFullYear()}</span>
            {LEGAL.map(item => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right: social icon row */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                className="text-gray-300 hover:text-white transition-colors duration-150"
                whileHover={{ y: -2, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
