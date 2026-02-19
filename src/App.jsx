import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import SpotlightCard  from './components/SpotlightCard'
import SplitText      from './components/SplitText'
import TiltedCard     from './components/TiltedCard'
import BlurText       from './components/BlurText'
import MagneticButton from './components/MagneticButton'
import ProjectModal   from './components/ProjectModal'

import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ─────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01',
    title: 'E-Commerce Platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    year: '2024',
    role: 'Full Stack Dev',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    description:
      'Platform e-commerce lengkap dengan fitur cart, payment gateway Midtrans, manajemen produk, dan dashboard admin real-time. Dibangun dengan arsitektur microservice untuk skalabilitas tinggi.',
    details: [
      { label: 'Client',   value: 'Tokobudi Indonesia' },
      { label: 'Year',     value: '2024' },
      { label: 'Role',     value: 'Full Stack Developer' },
      { label: 'Duration', value: '3 Months' },
    ],
    features: [
      'Autentikasi JWT dengan refresh token',
      'Payment gateway Midtrans & Xendit',
      'Real-time stock management',
      'Admin dashboard dengan analytics',
      'Optimasi SEO & Core Web Vitals',
    ],
    link: 'https://example.com/ecommerce',
    github: 'https://github.com/yourname/ecommerce',
  },
  {
    num: '02',
    title: 'Dashboard Analytics',
    tags: ['Next.js', 'D3.js', 'PostgreSQL'],
    year: '2024',
    role: 'Frontend Dev',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    description:
      'Dashboard visualisasi data interaktif untuk perusahaan logistik. Menampilkan data pengiriman real-time, heatmap rute, dan prediksi ML untuk optimasi armada.',
    details: [
      { label: 'Client',   value: 'LogiTrack Corp' },
      { label: 'Year',     value: '2024' },
      { label: 'Role',     value: 'Frontend Developer' },
      { label: 'Duration', value: '2 Months' },
    ],
    features: [
      'Chart interaktif dengan D3.js & Recharts',
      'Real-time data via WebSocket',
      'Export PDF & Excel report',
      'Filter & drill-down multi-level',
      'Dark / Light mode toggle',
    ],
    link: 'https://example.com/dashboard',
    github: 'https://github.com/yourname/dashboard',
  },
  {
    num: '03',
    title: 'Mobile Banking App',
    tags: ['React Native', 'Firebase'],
    year: '2023',
    role: 'Mobile Dev',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80',
    description:
      'Aplikasi mobile banking lengkap dengan fitur transfer, tagihan, dan investasi. Menggunakan biometric authentication dan enkripsi end-to-end untuk keamanan maksimal.',
    details: [
      { label: 'Client',   value: 'FinTech Startup' },
      { label: 'Year',     value: '2023' },
      { label: 'Role',     value: 'Mobile Developer' },
      { label: 'Duration', value: '4 Months' },
    ],
    features: [
      'Biometric (fingerprint & FaceID)',
      'Transfer antar bank real-time',
      'Notifikasi push transaksi',
      'QR Code payment scanner',
      'Investasi reksa dana & saham',
    ],
    link: 'https://example.com/banking',
    github: null,
  },
  {
    num: '04',
    title: 'SaaS Landing Page',
    tags: ['GSAP', 'Three.js', 'Vite'],
    year: '2024',
    role: 'Creative Dev',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    description:
      'Landing page SaaS dengan animasi 3D WebGL, scroll-driven storytelling, dan micro-interactions memukau. Lighthouse score 98+ dengan loading time < 1.5 detik.',
    details: [
      { label: 'Client',   value: 'Cloudy SaaS' },
      { label: 'Year',     value: '2024' },
      { label: 'Role',     value: 'Creative Developer' },
      { label: 'Duration', value: '3 Weeks' },
    ],
    features: [
      'WebGL background dengan Three.js',
      'ScrollTrigger pinning & scrubbing',
      'Particle system interaktif',
      'Lottie animation integration',
      'A/B testing dengan Vercel Edge',
    ],
    link: 'https://example.com/saas',
    github: 'https://github.com/yourname/saas-landing',
  },
  {
    num: '05',
    title: 'Social Media API',
    tags: ['GraphQL', 'Redis', 'AWS'],
    year: '2023',
    role: 'Backend Dev',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80',
    description:
      'Backend scalable untuk platform sosial media dengan 50K+ pengguna aktif. GraphQL subscriptions, Redis caching, dan deployment AWS ECS untuk performa maksimal.',
    details: [
      { label: 'Client',   value: 'SociaLink App' },
      { label: 'Year',     value: '2023' },
      { label: 'Role',     value: 'Backend Developer' },
      { label: 'Duration', value: '5 Months' },
    ],
    features: [
      'GraphQL subscriptions real-time',
      'Redis caching layer',
      'AWS S3 + CloudFront CDN',
      'Rate limiting & DDoS protection',
      '99.9% uptime SLA',
    ],
    link: 'https://example.com/api-docs',
    github: 'https://github.com/yourname/social-api',
  },
]

const SKILLS = [
  { icon: '⚡', name: 'Frontend',  desc: 'React, Next.js, TypeScript, Tailwind CSS, GSAP — antarmuka cepat & memukau.', level: '01' },
  { icon: '🔧', name: 'Backend',   desc: 'Node.js, Express, GraphQL, REST API, auth & keamanan sistem produksi.', level: '02' },
  { icon: '🗄️', name: 'Database', desc: 'MongoDB, PostgreSQL, Redis — desain skema & optimasi query.', level: '03' },
  { icon: '🎨', name: 'UI / UX',   desc: 'Figma, prototipe interaktif, design system, user research.', level: '04' },
  { icon: '☁️', name: 'DevOps',    desc: 'Docker, CI/CD, AWS, Vercel deployment & monitoring infrastruktur.', level: '05' },
  { icon: '📱', name: 'Mobile',    desc: 'React Native, Expo — aplikasi cross-platform iOS & Android.', level: '06' },
]

const PROGRAMMING_LANGUAGES = [
  { name: 'HTML', percentage: 95 },
  { name: 'CSS', percentage: 90 },
  { name: 'JavaScript', percentage: 92 },
  { name: 'Python', percentage: 75 },
  { name: 'PHP', percentage: 70 },
  { name: 'Next.js', percentage: 88 },
  { name: 'Lua', percentage: 60 },
  { name: 'Dart', percentage: 80 },
  { name: 'Rust', percentage: 55 },
  { name: 'R', percentage: 65 },
  { name: 'Java', percentage: 78 },
  { name: 'REST API', percentage: 90 },
]

const FRAMEWORKS_TOOLS = [
  { name: 'Git', percentage: 95 },
  { name: 'Github', percentage: 95 },
  { name: 'VSCode', percentage: 98 },
  { name: 'Composer', percentage: 80 },
  { name: 'Figma', percentage: 85 },
  { name: 'Canva', percentage: 80 },
  { name: 'Inkscape', percentage: 75 },
  { name: 'Node.js', percentage: 90 },
  { name: 'React', percentage: 92 },
  { name: 'Flutter', percentage: 82 },
  { name: 'MySql', percentage: 88 },
  { name: 'PostgreSQL', percentage: 85 },
]

const GALLERY_IMGS = [
  { src: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?w=600&q=70', label: 'Mountain Summit' },
  { src: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=600&q=70', label: 'Wild Forest' },
  { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=70', label: 'Open Horizon' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70', label: 'Snow Peak' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=70', label: 'Valley Depths' },
]

const CERTIFICATES = [
  {
    id: 1,
    title: 'React Developer Certification',
    issuer: 'Udemy',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e0?w=600&q=70',
    description: 'Complete React.js course covering hooks, state management, and advanced patterns.',
    pdfUrl: '#',
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=70',
    description: 'Full stack development course including frontend, backend, and database design.',
    pdfUrl: '#',
  },
  {
    id: 3,
    title: 'JavaScript ES6+ Mastery',
    issuer: 'LinkedIn Learning',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=70',
    description: 'Advanced JavaScript concepts and modern ES6+ features.',
    pdfUrl: '#',
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Interaction Design Foundation',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=70',
    description: 'UI/UX design principles, user research, and design thinking.',
    pdfUrl: '#',
  },
  {
    id: 5,
    title: 'Node.js Backend Development',
    issuer: 'Udemy',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e0?w=600&q=70',
    description: 'Build scalable backend applications with Node.js and Express.',
    pdfUrl: '#',
  },
  {
    id: 6,
    title: 'Flutter Mobile Development',
    issuer: 'Udacity',
    date: '2023',
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&q=70',
    description: 'Cross-platform mobile development using Flutter framework.',
    pdfUrl: '#',
  },
]

// ─────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mX = 0, mY = 0, rX = 0, rY = 0, rafId

    const onMove = (e) => {
      mX = e.clientX; mY = e.clientY
      gsap.to(dotRef.current, { x: mX, y: mY, duration: 0.05, overwrite: true })
    }

    const lerp = () => {
      rX += (mX - rX) * 0.12
      rY += (mY - rY) * 0.12
      gsap.set(ringRef.current, { x: rX, y: rY })
      rafId = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(lerp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cursor">
      <div className="cursor-dot"  ref={dotRef}  style={{ position: 'fixed', top: 0, left: 0 }} />
      <div className="cursor-ring" ref={ringRef} style={{ position: 'fixed', top: 0, left: 0 }} />
    </div>
  )
}

// ─────────────────────────────────────────────
// LOADER
// ─────────────────────────────────────────────
function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let n = 0
    const iv = setInterval(() => {
      n += Math.random() * 12
      if (n >= 100) { n = 100; clearInterval(iv) }
      setPct(Math.floor(n))
    }, 80)

    const t = setTimeout(() => {
      gsap.to(ref.current, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power3.inOut',
        onComplete: onDone,
      })
    }, 2200)

    return () => { clearInterval(iv); clearTimeout(t) }
  }, [onDone])

  return (
    <div className="loader" ref={ref}>
      <div className="loader-pct">{pct.toString().padStart(3, '0')}</div>
      <div className="loader-bar-wrap"><div className="loader-bar" /></div>
      <div className="loader-text">Loading Experience</div>
    </div>
  )
}

// ─────────────────────────────────────────────
// NAVBAR  ← DIPASTIKAN ADA DAN VISIBLE
// ─────────────────────────────────────────────
function Navbar() {
  const ref = useRef(null)

  useEffect(() => {
    // Navbar muncul setelah loader selesai
    gsap.fromTo(
      ref.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.3 }
    )

    // Background muncul saat scroll
    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () =>
        gsap.to(ref.current, {
          background: 'rgba(8,10,12,0.92)',
          backdropFilter: 'blur(12px)',
          duration: 0.4,
        }),
      onLeaveBack: () =>
        gsap.to(ref.current, {
          background: 'transparent',
          backdropFilter: 'blur(0px)',
          duration: 0.4,
        }),
    })
  }, [])

  const scrollTo = (id) =>
    gsap.to(window, { duration: 1.2, scrollTo: `#${id}`, ease: 'power3.inOut' })

  return (
    <nav className="navbar" ref={ref}>
      <div className="nav-logo">
        YOUR<span>.</span>NAME
      </div>
      <ul className="nav-links">
        {['about', 'skills', 'work', 'contact'].map((s) => (
          <li key={s}>
            <a href={`#${s}`} onClick={(e) => { e.preventDefault(); scrollTo(s) }}>
              {s}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  const bgRef  = useRef(null)
  const cueRef = useRef(null)

  useEffect(() => {
    // Parallax bg
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
    // Scroll cue muncul
    gsap.to(cueRef.current, { opacity: 1, duration: 0.6, delay: 3.5 })
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" ref={bgRef}>
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-content">
        <SplitText
          text="Portfolio · Full Stack Developer"
          className="hero-eyebrow"
          triggerOnScroll={false}
          delay={2.4}
          stagger={0.03}
          y={20}
          tag="span"
        />
        <h1 className="hero-title">
          <SplitText
            text="EXPLORE"
            triggerOnScroll={false}
            delay={2.6}
            stagger={0.06}
            y={80}
            duration={0.8}
            tag="span"
          />
          <span className="hero-title-alt">
            <SplitText
              text="CREATE"
              triggerOnScroll={false}
              delay={2.9}
              stagger={0.06}
              y={80}
              duration={0.8}
              tag="span"
            />
          </span>
        </h1>
        <BlurText
          text="Crafting digital experiences that push boundaries"
          className="hero-subtitle"
          triggerOnScroll={false}
          delay={3.2}
          stagger={0.07}
          tag="p"
        />
      </div>

      <div className="hero-scroll-cue" ref={cueRef} style={{ opacity: 0 }}>
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// TICKER
// ─────────────────────────────────────────────
function Ticker() {
  const items = ['React', 'Node.js', 'TypeScript', 'UI/UX Design', 'GSAP', 'Next.js', 'Three.js', 'Figma', 'MongoDB', 'REST APIs']
  const doubled = [...items, ...items]
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            {item}<span className="ticker-sep"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
function About() {
  const secRef   = useRef(null)
  const imgRef   = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' } }
      )
      // Count-up stats
      statsRef.current.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.dataset.val)
        const suffix = el.dataset.suffix || ''
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
            })
          },
        })
      })
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about" id="about" ref={secRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap" ref={imgRef}>
            <TiltedCard maxTilt={8} scale={1.02}>
              <img
                className="about-image"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                alt="Profile"
              />
            </TiltedCard>
            <div className="about-image-badge">
              <span>3+</span>
              <small>Years Exp</small>
            </div>
          </div>

          <div className="about-text">
            <SplitText text="About Me" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="DARE TO BE BOLD" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
            <BlurText
              text="Saya adalah seorang Full Stack Developer yang bersemangat menciptakan pengalaman digital yang luar biasa. Dengan perpaduan antara desain yang kuat dan kode yang bersih, saya membangun produk yang tidak hanya berfungsi sempurna — tetapi juga meninggalkan kesan mendalam."
              className="about-body"
              stagger={0.04}
              tag="p"
            />
            <BlurText
              text="Terinspirasi oleh alam yang tak terbatas, saya percaya bahwa tidak ada tantangan yang terlalu besar untuk ditaklukkan."
              className="about-body"
              stagger={0.04}
              delay={0.1}
              tag="p"
            />
            <div className="about-stats" ref={statsRef}>
              {[
                { val: 20, suffix: '+', label: 'Projects' },
                { val: 3,  suffix: '+', label: 'Years Exp' },
                { val: 100, suffix: '%', label: 'Satisfaction' },
              ].map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-number" data-val={s.val} data-suffix={s.suffix}>
                    {s.val}{s.suffix}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// INTERSHIP AVAILABILITY
// ─────────────────────────────────────────────
function InternshipAvailability() {
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.internship-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.internship-card', start: 'top 80%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="internship" id="internship" ref={secRef}>
      <div className="container">
        <div className="internship-header">
          <SplitText text="Opportunity" className="section-label" tag="span" stagger={0.04} y={15} />
          <SplitText text="INTERNSHIP AVAILABILITY" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
        </div>

        <SpotlightCard className="internship-card" spotlightColor="rgba(232,0,30,0.12)">
          <div className="internship-content">
            <div className="internship-item">
              <span className="internship-label">INTERNSHIP PLAN</span>
              <p className="internship-value">July 2025 - December 2026</p>
            </div>
            <div className="internship-divider" />
            <div className="internship-item">
              <span className="internship-label">DURATION</span>
              <p className="internship-value">6 Months</p>
            </div>
            <div className="internship-divider" />
            <div className="internship-item">
              <span className="internship-label">LOCATION</span>
              <p className="internship-value">Anywhere / Remote</p>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SKILLS  — SpotlightCard (React Bits)
// ─────────────────────────────────────────────
function SkillProficiency() {
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate bars
      gsap.fromTo('.skill-bar-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: '.skill-categories', start: 'top 75%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="skill-categories" ref={secRef}>
      <div className="skill-category">
        <h3 className="skill-category-title">LANGUAGES</h3>
        <div className="skill-bars">
          {PROGRAMMING_LANGUAGES.map((skill) => (
            <div className="skill-bar-item" key={skill.name}>
              <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-percent">{skill.percentage}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ '--progress': `${skill.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">FRAMEWORKS & TOOLS</h3>
        <div className="skill-bars">
          {FRAMEWORKS_TOOLS.map((skill) => (
            <div className="skill-bar-item" key={skill.name}>
              <div className="skill-bar-header">
                <span className="skill-bar-name">{skill.name}</span>
                <span className="skill-bar-percent">{skill.percentage}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ '--progress': `${skill.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// SKILLS  — SpotlightCard (React Bits)
// ─────────────────────────────────────────────
function Skills() {
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-card-wrap',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 75%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="skills" id="skills" ref={secRef}>
      <div className="container">
        <div className="skills-header">
          <div>
            <SplitText text="What I Do" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="SKILLS & EXPERTISE" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
          </div>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-card-wrap" key={s.name}>
              <SpotlightCard className="skill-card" spotlightColor="rgba(232,0,30,0.12)">
                <span className="skill-icon">{s.icon}</span>
                <div className="skill-name">{s.name}</div>
                <div className="skill-desc">{s.desc}</div>
                <div className="skill-level">{s.level}</div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        {/* Skill Proficiency Bars */}
        <div className="skills-proficiency-wrapper">
          <SkillProficiency />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// WORK  ← ARROW membuka ProjectModal
// ─────────────────────────────────────────────
function Work() {
  const [selected, setSelected] = useState(null)
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-item',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.work-list', start: 'top 80%' } }
      )
      gsap.fromTo('.work-preview-card-wrap',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.work-preview-grid', start: 'top 85%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  const openModal = (project) => setSelected(project)

  return (
    <section className="work" id="work" ref={secRef}>
      <div className="container">

        <div className="work-header">
          <SplitText text="Selected Work" className="section-label" tag="span" stagger={0.04} y={15} />
          <SplitText text="PROJECTS" className="section-title" tag="h2" stagger={0.05} y={50} duration={0.7} />
        </div>

        {/* ── List row — klik arrow → modal ── */}
        <div className="work-list">
          {PROJECTS.map((p) => (
            <div
              key={p.num}
              className="work-item"
              onClick={() => openModal(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(p)}
            >
              <span className="work-num">{p.num}</span>

              <div className="work-item-center">
                <span className="work-title">{p.title}</span>
                <span className="work-year">{p.year}</span>
              </div>

              <div className="work-tags">
                {p.tags.map((t) => (
                  <span className="work-tag" key={t}>{t}</span>
                ))}
              </div>

              {/* ── Arrow CTA ── */}
              <div className="work-cta" aria-label="Lihat detail project">
                <span className="work-cta-text">Detail</span>
                <span className="work-arrow">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Card preview dengan TiltedCard + SpotlightCard ── */}
        <div className="work-preview-grid">
          {PROJECTS.slice(0, 3).map((p) => (
            <div className="work-preview-card-wrap" key={p.num}>
              <TiltedCard maxTilt={10} scale={1.04}>
                <SpotlightCard
                  className="work-preview-card"
                  spotlightColor="rgba(232,0,30,0.1)"
                >
                  <div className="work-preview-img-wrap">
                    <img src={p.image} alt={p.title} className="work-preview-img" />
                    <div className="work-preview-img-overlay" />
                  </div>
                  <div className="work-preview-info">
                    <span className="work-preview-num">{p.num}</span>
                    <h3 className="work-preview-title">{p.title}</h3>
                    <div className="work-preview-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="work-tag">{t}</span>
                      ))}
                    </div>
                    <button
                      className="work-preview-btn"
                      onClick={() => openModal(p)}
                    >
                      Open Project <span>→</span>
                    </button>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

// ─────────────────────────────────────────────
// PARALLAX BAND
// ─────────────────────────────────────────────
function ParallaxBand() {
  const bgRef = useRef(null)

  useEffect(() => {
    gsap.to(bgRef.current, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  return (
    <div className="parallax-band">
      <div className="parallax-bg" ref={bgRef} />
      <div className="parallax-content">
        <BlurText
          text='"The best views come after the hardest climbs"'
          className="parallax-quote"
          stagger={0.06}
          duration={0.8}
          tag="h2"
        />
        <SplitText text="· Philosophy ·" className="parallax-source" tag="p" stagger={0.05} y={20} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────
function CertificateModal({ certificate, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} ref={modalRef}>
      <div className="certificate-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="certificate-modal-image">
          <img src={certificate.image} alt={certificate.title} />
        </div>

        <div className="certificate-modal-body">
          <div className="certificate-modal-meta">
            <span className="certificate-issuer">{certificate.issuer}</span>
            <span className="certificate-date">{certificate.date}</span>
          </div>

          <h2 className="certificate-modal-title">{certificate.title}</h2>

          <p className="certificate-modal-description">{certificate.description}</p>

          <div className="certificate-modal-actions">
            <a href={certificate.pdfUrl} className="btn-download-pdf" download>
              <span>📥 Download Certificate</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Gallery() {
  const [selectedCert, setSelectedCert] = useState(null)
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-card',
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.h-scroll-track', start: 'top 85%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="gallery-section" ref={secRef}>
      <div className="gallery-title-wrap container">
        <SplitText text="Professional Achievements" className="section-label" tag="span" stagger={0.04} y={15} />
        <SplitText text="CERTIFICATES" className="section-title" tag="h2" stagger={0.05} y={50} duration={0.7} />
      </div>
      <div className="h-scroll-track">
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="gallery-card"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedCert(cert)}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedCert(cert)}
          >
            <TiltedCard maxTilt={8} scale={1.03}>
              <img src={cert.image} alt={cert.title} />
              <div className="gallery-card-label">{cert.title}</div>
              <div className="gallery-cert-overlay">
                <span className="gallery-cert-click">Click for details</span>
              </div>
            </TiltedCard>
          </div>
        ))}
      </div>

      {selectedCert && <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />}
    </div>
  )
}

// ─────────────────────────────────────────────
// CONTACT  — MagneticButton (React Bits)
// ─────────────────────────────────────────────
function Contact() {
  const secRef   = useRef(null)
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(rightRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="contact" id="contact" ref={secRef}>
      <div className="container">
        <div className="contact-inner">
          <div ref={leftRef}>
            <span className="section-label">Get In Touch</span>
            <SplitText
              text="LET'S WORK TOGETHER"
              className="contact-cta"
              tag="h2"
              stagger={0.05}
              y={50}
              duration={0.7}
            />
            <p className="contact-body">
              Punya proyek yang menarik? Saya selalu terbuka untuk kesempatan baru
              dan kolaborasi kreatif. Mari kita ciptakan sesuatu yang luar biasa bersama.
            </p>
            <MagneticButton className="btn-primary" strength={0.35}>
              <a
                href="mailto:hello@yourname.dev"
                style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                Say Hello <span>→</span>
              </a>
            </MagneticButton>
          </div>

          <form className="contact-form" ref={rightRef} onSubmit={(e) => e.preventDefault()}>
            {[
              { id: 'name',    type: 'text',  label: 'Your Name' },
              { id: 'email',   type: 'email', label: 'Email Address' },
              { id: 'subject', type: 'text',  label: 'Subject' },
            ].map((f) => (
              <div className="form-group" key={f.id}>
                <input className="form-input" type={f.type} placeholder={f.label} id={f.id} />
                <label className="form-label" htmlFor={f.id}>{f.label}</label>
              </div>
            ))}
            <div className="form-group">
              <textarea className="form-textarea" placeholder="Message" id="message" rows={4} />
              <label className="form-label" htmlFor="message">Your Message</label>
            </div>
            <MagneticButton className="btn-primary" strength={0.3} style={{ width: 'fit-content' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Send Message <span>→</span>
              </span>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">YOUR<span>.</span>NAME</div>
      <div className="footer-copy">© 2025 — All rights reserved</div>
      <div className="footer-socials">
        {['GitHub', 'LinkedIn', 'Dribbble', 'Twitter'].map((s) => (
          <a href="#" key={s}>{s}</a>
        ))}
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <InternshipAvailability />
        <Skills />
        <Work />
        <ParallaxBand />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}