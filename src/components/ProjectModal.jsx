import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * ProjectModal — Full-screen project detail overlay
 * GSAP: backdrop fade-in + panel slide-up + stagger content
 */
export default function ProjectModal({ project, onClose }) {
  const overlayRef  = useRef(null)
  const panelRef    = useRef(null)
  const contentRef  = useRef(null)
  const closeBtnRef = useRef(null)

  /* ── Open animation ── */
  useEffect(() => {
    if (!project) return

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out' }
    )
    .fromTo(panelRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.65, ease: 'power4.out' },
      '-=0.25'
    )
    .fromTo(Array.from(contentRef.current?.children ?? []),
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out' },
      '-=0.35'
    )
    .fromTo(closeBtnRef.current,
      { scale: 0, rotate: -90 },
      { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' },
      '-=0.5'
    )

    return () => { document.body.style.overflow = '' }
  }, [project])

  /* ── Close animation ── */
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(Array.from(contentRef.current?.children ?? []), {
      y: 25, opacity: 0, stagger: 0.035, duration: 0.25, ease: 'power2.in',
    })
    .to(panelRef.current, {
      yPercent: 100, duration: 0.5, ease: 'power4.in',
    }, '-=0.15')
    .to(overlayRef.current, { opacity: 0, duration: 0.3 }, '-=0.3')
  }

  /* ── Keyboard close ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!project) return null

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
    >
      <div className="modal-panel" ref={panelRef}>

        {/* ── Close btn ── */}
        <button className="modal-close" ref={closeBtnRef} onClick={handleClose} aria-label="Tutup">
          <span>✕</span>
        </button>

        {/* ── Hero image ── */}
        <div className="modal-hero">
          <img src={project.image} alt={project.title} className="modal-img" />
          <div className="modal-hero-overlay" />
          <div className="modal-hero-num">{project.num}</div>
        </div>

        {/* ── Content ── */}
        <div className="modal-body">
          <div className="modal-content" ref={contentRef}>

            {/* Tags */}
            <div className="modal-meta">
              {project.tags.map(t => (
                <span className="modal-tag" key={t}>{t}</span>
              ))}
            </div>

            {/* Title */}
            <h2 className="modal-title">{project.title}</h2>

            {/* Description */}
            <p className="modal-desc">{project.description}</p>

            {/* Detail grid */}
            <div className="modal-detail-grid">
              {project.details.map(d => (
                <div className="modal-detail-item" key={d.label}>
                  <div className="modal-detail-label">{d.label}</div>
                  <div className="modal-detail-value">{d.value}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="modal-features">
              <h3 className="modal-features-title">Key Features</h3>
              <ul className="modal-features-list">
                {project.features.map((f, i) => (
                  <li className="modal-feature-item" key={i}>
                    <span className="modal-feature-dot" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Action Buttons ── */}
            <div className="modal-actions">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-project"
              >
                <span>View Live Project</span>
                <span className="btn-arrow">↗</span>
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github"
                >
                  <span>Source Code</span>
                  <span className="btn-arrow">↗</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}