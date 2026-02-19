import { useRef, useState } from 'react'

/**
 * SpotlightCard — React Bits
 * Radial glow spotlight yang mengikuti posisi mouse di atas card
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(232, 0, 30, 0.15)',
  style = {},
}) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="spotlight-glow"
        style={{
          background: `radial-gradient(circle 220px at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`,
          opacity,
          transition: 'opacity 0.3s',
        }}
      />
      {children}
    </div>
  )
}