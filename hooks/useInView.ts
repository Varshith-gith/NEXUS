'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

export function useInView(threshold = 0.1): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
