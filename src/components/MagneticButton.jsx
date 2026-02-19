import { useRef } from 'react'

/**
 * MagneticButton — React Bits
 * Tombol yang bergerak magnetik mengikuti kursor mouse
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  style = {},
  onClick,
}) {
  const btnRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleMouseLeave = () => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <button
      ref={btnRef}
      className={className}
      style={{
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}