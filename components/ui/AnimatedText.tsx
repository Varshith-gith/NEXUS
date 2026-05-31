'use client'

import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
  as: Tag = 'span',
}: Props) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotate: 3 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
