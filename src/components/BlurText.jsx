import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * BlurText — React Bits
 * Setiap kata muncul dengan efek blur yang memudar (filter blur)
 */
export default function BlurText({
  text = '',
  className = '',
  delay = 0,
  duration = 0.7,
  stagger = 0.06,
  triggerOnScroll = true,
  tag: Tag = 'p',
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const words = ref.current.querySelectorAll('.blur-word')
    if (!words.length) return

    const anim = () =>
      gsap.fromTo(
        words,
        { filter: 'blur(10px)', opacity: 0, y: 15 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
        }
      )

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 88%',
        once: true,
        onEnter: anim,
      })
    } else {
      anim()
    }
  }, [text, delay, duration, stagger, triggerOnScroll])

  const words = text.split(' ').map((word, i) => (
    <span
      key={i}
      className="blur-word"
      style={{ display: 'inline-block', marginRight: '0.3em' }}
    >
      {word}
    </span>
  ))

  return (
    <Tag ref={ref} className={className}>
      {words}
    </Tag>
  )
}