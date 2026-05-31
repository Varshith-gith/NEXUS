'use client'

import { useEffect } from 'react'
import { setLenisInstance } from '@/lib/lenis'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import TechStackSection from '@/components/sections/TechStackSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProcessSection from '@/components/sections/ProcessSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import PageLoader from '@/components/PageLoader'
import ScrollProgress from '@/components/ScrollProgress'
import GlobalBackground from '@/components/GlobalBackground'

export default function HomePage() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        })
        setLenisInstance(lenis)

        let animId: number
        function raf(time: number) {
          lenis.raf(time)
          animId = requestAnimationFrame(raf)
        }
        animId = requestAnimationFrame(raf)

        cleanup = () => {
          cancelAnimationFrame(animId)
          lenis.destroy()
          setLenisInstance(null)
        }
      } catch (e) {
        console.warn('Lenis init skipped', e)
      }
    }

    initLenis()
    return () => cleanup?.()
  }, [])

  return (
    <>
      <GlobalBackground />
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <main className="relative">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TechStackSection />
        <PortfolioSection />
        <ProcessSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
