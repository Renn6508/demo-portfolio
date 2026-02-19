import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SplitText — React Bits
 * Memisahkan teks menjadi span per karakter dan animasi dengan GSAP
 */
export default function SplitText({
  text = '',
  className = '',
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  y = 60,
  stagger = 0.04,
  triggerOnScroll = true,
  tag: Tag = 'span',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const inners = containerRef.current.querySelectorAll('.split-char-inner')
    if (!inners.length) return

    const anim = () =>
      gsap.fromTo(
        inners,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration, ease, stagger, delay }
      )

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: anim,
      })
    } else {
      anim()
    }
  }, [text, delay, duration, ease, y, stagger, triggerOnScroll])

  const chars = text.split('').map((char, i) => (
    <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
      <span className="split-char-inner" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    </span>
  ))

  return (
    <Tag ref={containerRef} className={className}>
      {chars}
    </Tag>
  )
}