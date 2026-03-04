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
    title: 'Management Stok Barang',
    tags: ['HTML', 'Javascript', 'CSS'],
    year: 'Nov 30, 2025',
    role: 'Front End Developer',
    image: 'src/assets/projects/barangku.png',
    description:
      'Platform e-commerce lengkap dengan fitur cart, payment gateway Midtrans, manajemen produk, dan dashboard admin real-time. Dibangun dengan arsitektur microservice untuk skalabilitas tinggi.',
    details: [
      { label: 'Client',   value: 'Projek Ujian Akhir Semester Sekolah' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Front End Developer' },
      { label: 'Duration', value: '3 Months' },
    ],
    features: [
      'Autentikasi JWT dengan refresh token',
      'Payment gateway Midtrans & Xendit',
      'Real-time stock management',
      'Admin dashboard dengan analytics',
      'Optimasi SEO & Core Web Vitals',
    ],
    link: 'https://projek-barangku.netlify.app/',
    github: 'https://github.com/Renn6508/BarangKu',
  },
  {
    num: '02',
    title: 'Profile Web Company Seblak ',
    tags: ['HTML', 'Tailwind CSS', 'Next JS', 'Node JS',],
    year: 'Jan 22, 2025',
    role: 'Frontend Dev',
    image: 'src/assets/projects/seblak_sultan.png',
    description:
      'Dashboard visualisasi data interaktif untuk perusahaan logistik. Menampilkan data pengiriman real-time, heatmap rute, dan prediksi ML untuk optimasi armada.',
    details: [
      { label: 'Client',   value: 'Sizie April Profita' },
      { label: 'Year',     value: '2025' },
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
    link: 'https://praktikum-sizie.vercel.app/',
    github: 'https://github.com/Renn6508/praktikum-sizie',
  },
  {
    num: '03',
    title: 'Profile Company Web Krunchi Melt',
    tags: ['React Native', 'Firebase'],
    year: 'Aug 29, 2025',
    role: 'Frontend Developer',
    image: 'src/assets/projects/krunchimelt.png',
    description:
      'Aplikasi mobile banking lengkap dengan fitur transfer, tagihan, dan investasi. Menggunakan biometric authentication dan enkripsi end-to-end untuk keamanan maksimal.',
    details: [
      { label: 'Client',   value: 'Krunchi Melt' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Frontend Developer' },
      { label: 'Duration', value: '4 Months' },
    ],
    features: [
      'Biometric (fingerprint & FaceID)',
      'Transfer antar bank real-time',
      'Notifikasi push transaksi',
      'QR Code payment scanner',
      'Investasi reksa dana & saham',
    ],
    link: 'https://renn6508.github.io/html_catalog/',
    github: 'https://github.com/Renn6508/html_catalog',
  },
  {
    num: '04',
    title: 'Layout Profile Company H2OPURE Asia Bali',
    tags: ['Figma', 'UI UX Design',],
    year: 'Jan 12, 2024',
    role: 'Creative Graphic Designer',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    description:
      'Landing page SaaS dengan animasi 3D WebGL, scroll-driven storytelling, dan micro-interactions memukau. Lighthouse score 98+ dengan loading time < 1.5 detik.',
    details: [
      { label: 'Client',   value: 'H2OPURE Asia' },
      { label: 'Year',     value: '2024' },
      { label: 'Role',     value: 'Creative Graphic Designer' },
      { label: 'Duration', value: '4 months' },
    ],
    features: [
      'WebGL background dengan Three.js',
      'ScrollTrigger pinning & scrubbing',
      'Particle system interaktif',
      'Lottie animation integration',
      'A/B testing dengan Vercel Edge',
    ],
    link: 'https://www.figma.com/design/XFhqjrIOSDc46SRi68lLXt/H2OPURE-Layout-Company-Profile?node-id=0-1&t=o2ra5xEHrDERNGHj-1',
    github: null,
  },
  {
    num: '05',
    title: 'Business Portfolio',
    tags: ['Next JS', 'Tailwind CSS', 'HTML', 'TypeScript', 'React'],
    year: '2025',
    role: 'Fullstack Dev',
    image: 'src/assets/projects/rendyatmawijaya.png',
    description:
      'Backend scalable untuk platform sosial media dengan 50K+ pengguna aktif. GraphQL subscriptions, Redis caching, dan deployment AWS ECS untuk performa maksimal.',
    details: [
      { label: 'Client',   value: 'Rendy Atmawijaya' },
      { label: 'Year',     value: '2025' },
      { label: 'Role',     value: 'Fullstack Developer' },
      { label: 'Duration', value: '6 Months' },
    ],
    features: [
      'GraphQL subscriptions real-time',
      'Redis caching layer',
      'AWS S3 + CloudFront CDN',
      'Rate limiting & DDoS protection',
      '99.9% uptime SLA',
    ],
    link: 'https://rendy-atmawijaya.vercel.app/',
    github: 'https://github.com/Renn6508/rendy-atmawijaya-profile',
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
    title: 'Program Entrepreneur Vokasi Kreatif dan Terpadu (PERVEKT)',
    issuer: 'Dinas Pendidikan Provinsi Jawa Timur dengan Institut Teknologi Sepuluh Nopember',
    date: '2025',
    image: 'src/assets/certificate/pervekt.png',
    description: 'Pelatihan Keterampilan Kewirausahaan SMK.',
    pdfUrl: 'src/assets/Sertifikat_PERVEKT.pdf',
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
      <div className="loader-text">Loading Portfolio</div>
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
        {['about', 'skills', 'dashboard', 'work', 'contact'].map((s) => (
          <li key={s}>
            <a href={`#${s}`} onClick={(e) => { e.preventDefault(); scrollTo(s) }}>
              {s}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="src/assets/CV PKL 2026 Wilhelmina Lorenzia Wijaya.pdf"
        download="CV_PKL_2026 _WilhelminaLorenziaWijaya.pdf"
        className="nav-cv-btn"
      >
        Download CV ↓
      </a>
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
            text="WILHELMINA"
            triggerOnScroll={false}
            delay={2.6}
            stagger={0.06}
            y={80}
            duration={0.8}
            tag="span"
          />
          <span className="hero-title-alt">
            <SplitText
              text="LORENZIA.W"
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
                src="https://i.pinimg.com/736x/49/7d/36/497d366b9d8f08b07bd5bb582ba4c35d.jpg"
                alt="Profile"
              />
            </TiltedCard>
            <div className="about-image-badge">
              <span>2+</span>
              <small>Years Exp</small>
            </div>
          </div>

          <div className="about-text">
            <SplitText text="About Me" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="DARE TO BE BOLD" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
            <BlurText
              text="Hello! I'm Wilhelmina Lorenzia Wijaya, a Software Engineering (RPL) student at SMKN 1 Lumajang Vocational High School. I'm a disciplined, highly dedicated individual with a keen interest in software development. For me, coding isn't just a task, but a way to create solutions. I'm used to working neatly, paying attention to details, and always eager to learn new technologies."
              className="about-body"
              stagger={0.04}
              tag="p"
            />
            <BlurText
              text="As a Software Engineering student, I have a strong foundation in programming logic and application development. I am a fast learner and highly value discipline and responsibility. Through various school assignments and projects, I have learned to consistently complete work on time. I am ready to bring my positive energy and strong work ethic to a professional environment."
              className="about-body"
              stagger={0.04}
              delay={0.1}
              tag="p"
            />
            <div className="about-stats" ref={statsRef}>
              {[
                { val: 11, suffix: '+', label: 'Projects' },
                { val: 2,  suffix: '+', label: 'Years Exp' },
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
// DASHBOARD — GitHub & WakaTime Stats
// ─────────────────────────────────────────────
const GITHUB_USERNAME = 'Renn6508'
const WAKATIME_USERNAME = 'Renn6508'

function Dashboard() {
  const secRef = useRef(null)
  const [ghStats, setGhStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    totalStars: 0,
    topLanguages: [],
    recentRepos: [],
    loading: true,
    error: false,
  })
  const [wakaStats, setWakaStats] = useState({
    totalCodingTime: null,
    languages: [],
    loading: true,
    error: false,
  })

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const userData = await userRes.json()
        const reposData = await reposRes.json()

        // Calculate total stars
        const totalStars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)

        // Get top languages
        const langMap = {}
        reposData.forEach((repo) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1
          }
        })
        const topLanguages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / reposData.filter(r => r.language).length) * 100),
          }))

        // Get recent repos
        const recentRepos = reposData
          .filter((r) => !r.fork)
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            description: r.description || 'No description',
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
            updatedAt: new Date(r.updated_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            }),
          }))

        setGhStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          topLanguages,
          recentRepos,
          loading: false,
          error: false,
        })
      } catch {
        setGhStats((prev) => ({ ...prev, loading: false, error: true }))
      }
    }

    fetchGithubStats()
  }, [])

  // Fetch WakaTime stats
  useEffect(() => {
    const fetchWakaStats = async () => {
      try {
        const res = await fetch(`https://wakatime.com/api/v1/users/${WAKATIME_USERNAME}/stats/last_7_days`)
        if (!res.ok) throw new Error('WakaTime API error')
        const data = await res.json()

        setWakaStats({
          totalCodingTime: data.data?.human_readable_total || null,
          languages: (data.data?.languages || []).slice(0, 6).map((l) => ({
            name: l.name,
            percentage: Math.round(l.percent),
            hours: l.text,
          })),
          loading: false,
          error: false,
        })
      } catch {
        // WakaTime API may require auth — fallback to embed chart
        setWakaStats((prev) => ({ ...prev, loading: false, error: true }))
      }
    }

    fetchWakaStats()
  }, [])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-stat-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-stats-grid', start: 'top 80%' } }
      )
      gsap.fromTo('.dash-chart-section',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-chart-section', start: 'top 85%' } }
      )
      gsap.fromTo('.dash-repo-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-repos-grid', start: 'top 85%' } }
      )
      gsap.fromTo('.dash-lang-bar-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.dash-languages-section', start: 'top 80%' } }
      )
      gsap.fromTo('.dash-waka-section',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.dash-waka-section', start: 'top 85%' } }
      )
    }, secRef)
    return () => ctx.revert()
  }, [ghStats.loading, wakaStats.loading])

  const LANG_COLORS = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    HTML: '#E34F26',
    CSS: '#1572B6',
    Python: '#3776AB',
    PHP: '#777BB4',
    Dart: '#0175C2',
    Java: '#ED8B00',
    Lua: '#000080',
    Rust: '#DEA584',
    R: '#276DC3',
    Vue: '#4FC08D',
    SCSS: '#CC6699',
    Shell: '#89E051',
  }

  return (
    <section className="dashboard" id="dashboard" ref={secRef}>
      <div className="container">
        {/* ── Section Header ── */}
        <div className="dash-header">
          <div>
            <SplitText text="Coding Activity" className="section-label" tag="span" stagger={0.04} y={15} />
            <SplitText text="DEVELOPER DASHBOARD" className="section-title" tag="h2" stagger={0.04} y={50} duration={0.7} />
          </div>
          <p className="dash-subtitle">
            Real-time statistics pulled from GitHub & WakaTime APIs
          </p>
        </div>

        {/* ── Stats Overview Cards ── */}
        <div className="dash-stats-grid">
          {[
            {
              icon: '📦',
              value: ghStats.loading ? '...' : ghStats.publicRepos,
              label: 'Public Repos',
              color: 'rgba(232,0,30,0.15)',
            },
            {
              icon: '⭐',
              value: ghStats.loading ? '...' : ghStats.totalStars,
              label: 'Total Stars',
              color: 'rgba(247,223,30,0.12)',
            },
            {
              icon: '👥',
              value: ghStats.loading ? '...' : ghStats.followers,
              label: 'Followers',
              color: 'rgba(79,195,247,0.12)',
            },
            {
              icon: '🔗',
              value: ghStats.loading ? '...' : ghStats.following,
              label: 'Following',
              color: 'rgba(129,199,132,0.12)',
            },
          ].map((stat) => (
            <div className="dash-stat-card" key={stat.label}>
              <SpotlightCard className="dash-stat-inner" spotlightColor={stat.color}>
                <span className="dash-stat-icon">{stat.icon}</span>
                <div className="dash-stat-value">{stat.value}</div>
                <div className="dash-stat-label">{stat.label}</div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        {/* ── GitHub Contribution Chart ── */}
        <div className="dash-chart-section">
          <div className="dash-section-label">
            <span className="dash-label-dot" />
            <span>GITHUB CONTRIBUTIONS</span>
          </div>
          <SpotlightCard className="dash-chart-card" spotlightColor="rgba(232,0,30,0.08)">
            <div className="dash-chart-inner">
              <img
                src={`https://ghchart.rshah.org/E8001E/${GITHUB_USERNAME}`}
                alt="GitHub Contribution Chart"
                className="dash-contrib-chart"
                loading="lazy"
              />
            </div>
            <div className="dash-chart-footer">
              <span className="dash-chart-legend">
                <span className="dash-legend-box" style={{ background: 'rgba(232,0,30,0.2)' }} /> Less
              </span>
              <span className="dash-chart-legend">
                <span className="dash-legend-box" style={{ background: 'rgba(232,0,30,0.5)' }} /> Medium
              </span>
              <span className="dash-chart-legend">
                <span className="dash-legend-box" style={{ background: '#E8001E' }} /> More
              </span>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dash-chart-link"
              >
                View on GitHub <span>↗</span>
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* ── Two Column: Languages + WakaTime ── */}
        <div className="dash-two-col">
          {/* GitHub Top Languages */}
          <div className="dash-languages-section">
            <div className="dash-section-label">
              <span className="dash-label-dot" />
              <span>TOP LANGUAGES</span>
            </div>
            <SpotlightCard className="dash-lang-card" spotlightColor="rgba(232,0,30,0.08)">
              {ghStats.loading ? (
                <div className="dash-loading">Loading...</div>
              ) : ghStats.error ? (
                <div className="dash-loading">Unable to load language data</div>
              ) : (
                <div className="dash-lang-bars">
                  {ghStats.topLanguages.map((lang) => (
                    <div className="dash-lang-item" key={lang.name}>
                      <div className="dash-lang-header">
                        <span className="dash-lang-name">
                          <span
                            className="dash-lang-dot"
                            style={{ background: LANG_COLORS[lang.name] || '#8A9BAD' }}
                          />
                          {lang.name}
                        </span>
                        <span className="dash-lang-pct">{lang.percentage}%</span>
                      </div>
                      <div className="dash-lang-bar-track">
                        <div
                          className="dash-lang-bar-fill"
                          style={{
                            '--progress': `${lang.percentage}%`,
                            background: `linear-gradient(to right, ${LANG_COLORS[lang.name] || '#E8001E'}, ${LANG_COLORS[lang.name] || '#E8001E'}88)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SpotlightCard>
          </div>

          {/* WakaTime Coding Activity */}
          <div className="dash-waka-section">
            <div className="dash-section-label">
              <span className="dash-label-dot" />
              <span>WAKATIME CODING ACTIVITY</span>
            </div>
            <SpotlightCard className="dash-waka-card" spotlightColor="rgba(79,195,247,0.08)">
              {wakaStats.loading ? (
                <div className="dash-loading">Loading WakaTime data...</div>
              ) : wakaStats.error ? (
                <div className="dash-waka-embed">
                  <div className="dash-waka-fallback">
                    <div className="dash-waka-icon">⏱️</div>
                    <h4 className="dash-waka-title">Coding Activity</h4>
                    <p className="dash-waka-desc">
                      Track my real-time coding activity and language breakdown on WakaTime.
                    </p>
                    <a
                      href={`https://wakatime.com/@${WAKATIME_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dash-waka-link"
                    >
                      View on WakaTime <span>↗</span>
                    </a>
                  </div>
                  <div className="dash-waka-visual">
                    <img
                      src={`https://github-readme-stats.vercel.app/api/wakatime?username=${WAKATIME_USERNAME}&theme=transparent&hide_border=true&text_color=8A9BAD&title_color=E8001E&icon_color=E8001E&bg_color=00000000`}
                      alt="WakaTime Stats"
                      className="dash-waka-chart-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="dash-waka-data">
                  {wakaStats.totalCodingTime && (
                    <div className="dash-waka-total">
                      <span className="dash-waka-total-label">LAST 7 DAYS</span>
                      <span className="dash-waka-total-value">{wakaStats.totalCodingTime}</span>
                    </div>
                  )}
                  <div className="dash-waka-langs">
                    {wakaStats.languages.map((lang) => (
                      <div className="dash-lang-item" key={lang.name}>
                        <div className="dash-lang-header">
                          <span className="dash-lang-name">
                            <span
                              className="dash-lang-dot"
                              style={{ background: LANG_COLORS[lang.name] || '#4FC3F7' }}
                            />
                            {lang.name}
                          </span>
                          <span className="dash-lang-pct">{lang.percentage}%</span>
                        </div>
                        <div className="dash-lang-bar-track">
                          <div
                            className="dash-lang-bar-fill"
                            style={{
                              '--progress': `${lang.percentage}%`,
                              background: `linear-gradient(to right, ${LANG_COLORS[lang.name] || '#4FC3F7'}, ${LANG_COLORS[lang.name] || '#4FC3F7'}88)`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SpotlightCard>
          </div>
        </div>

        {/* ── Recent Repositories ── */}
        <div className="dash-repos-section">
          <div className="dash-section-label">
            <span className="dash-label-dot" />
            <span>RECENT REPOSITORIES</span>
          </div>
          <div className="dash-repos-grid">
            {ghStats.loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div className="dash-repo-card dash-repo-skeleton" key={i}>
                  <SpotlightCard className="dash-repo-inner" spotlightColor="rgba(232,0,30,0.06)">
                    <div className="dash-skeleton-line dash-skeleton-w60" />
                    <div className="dash-skeleton-line dash-skeleton-w90" />
                    <div className="dash-skeleton-line dash-skeleton-w40" />
                  </SpotlightCard>
                </div>
              ))
            ) : (
              ghStats.recentRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dash-repo-card"
                >
                  <SpotlightCard className="dash-repo-inner" spotlightColor="rgba(232,0,30,0.08)">
                    <div className="dash-repo-header">
                      <span className="dash-repo-icon">📁</span>
                      <span className="dash-repo-name">{repo.name}</span>
                    </div>
                    <p className="dash-repo-desc">{repo.description}</p>
                    <div className="dash-repo-meta">
                      {repo.language && (
                        <span className="dash-repo-lang">
                          <span
                            className="dash-lang-dot"
                            style={{ background: LANG_COLORS[repo.language] || '#8A9BAD' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="dash-repo-stat">⭐ {repo.stars}</span>
                      <span className="dash-repo-stat">🔱 {repo.forks}</span>
                      <span className="dash-repo-date">{repo.updatedAt}</span>
                    </div>
                  </SpotlightCard>
                </a>
              ))
            )}
          </div>
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
          text='"Do you see a man skilled in his work? He will stand before kings."'
          className="parallax-quote"
          stagger={0.06}
          duration={0.8}
          tag="h2"
        />
        <SplitText text="· Proverbs 22:29 ·" className="parallax-source" tag="p" stagger={0.05} y={20} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────
function CertificateModal({ certificate, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const isClosing = useRef(false)

  // GSAP open animation
  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    tl.fromTo(panelRef.current,
      { y: 80, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      '-=0.2'
    )
    return () => tl.kill()
  }, [])

  // GSAP close animation
  const handleClose = () => {
    if (isClosing.current) return
    isClosing.current = true

    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, {
      y: 60, opacity: 0, scale: 0.9,
      duration: 0.35, ease: 'power3.in',
    })
    tl.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
    }, '-=0.15')
  }

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="modal-overlay" onClick={handleClose} ref={overlayRef} style={{ opacity: 0 }}>
      <div className="certificate-modal-panel" onClick={(e) => e.stopPropagation()} ref={panelRef} style={{ opacity: 0 }}>
        <button className="modal-close" onClick={handleClose}>✕</button>

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
            <a
              href={certificate.pdfUrl}
              download={`${certificate.title.replace(/\s+/g, '_')}.pdf`}
              className="btn-download-pdf"
            >
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
// CONTACT  — Personal Info Cards
// ─────────────────────────────────────────────
function Contact() {
  const secRef   = useRef(null)
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  const COLLABORATORS = [
    {
      name: 'Amirah Syauqillah Harsono',
      role: 'Network Engineer & SysAdmin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
      url: 'https://amirah-portfolio.vercel.app/',
    },
    {
      name: 'Collaborator 2',
      role: 'Fullstack Developer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80',
      url: 'https://leosatriaa.vercel.app/',
    },
    {
      name: 'Collaborator 3',
      role: 'Mobile Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
      url: 'https://example.com/collaborator3',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.collab-card',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
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
              Saya adalah mahasiswa magang yang siap berkontribusi dan belajar.
              Jangan ragu untuk menghubungi saya melalui informasi kontak berikut.
            </p>
            <MagneticButton className="btn-primary" strength={0.35}>
              <a
                href="mailto:email@example.com"
                style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                Say Hello <span>→</span>
              </a>
            </MagneticButton>
          </div>

          <div className="collab-section" ref={rightRef}>
            <div className="collab-header">
              <span className="collab-label">PAST COLLABORATIONS</span>
              <p className="collab-desc">Rekan-rekan hebat yang pernah berkolaborasi dengan saya.</p>
            </div>
            <div className="collab-list">
              {COLLABORATORS.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collab-card-link"
                >
                  <SpotlightCard className="collab-card" spotlightColor="rgba(232,0,30,0.12)">
                    <div className="collab-avatar-wrap">
                      <img src={c.avatar} alt={c.name} className="collab-avatar" />
                      <div className="collab-avatar-ring" />
                    </div>
                    <div className="collab-info">
                      <span className="collab-name">{c.name}</span>
                      <span className="collab-role">{c.role}</span>
                    </div>
                    <div className="collab-visit">
                      <span>Visit</span>
                      <span className="collab-arrow">↗</span>
                    </div>
                  </SpotlightCard>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER — Modern & Minimalist
// ─────────────────────────────────────────────
function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } }
      )
      gsap.fromTo('.footer-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.footer-divider', start: 'top 95%' } }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const scrollTo = (id) =>
    gsap.to(window, { duration: 1.2, scrollTo: `#${id}`, ease: 'power3.inOut' })

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        {/* ── Top Grid ── */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand-col">
            <div className="footer-logo">WILHELMINA<span>.</span>PORTFOLIO</div>
            <p className="footer-tagline">
              Full Stack Developer &amp; Creative Coder — crafting digital experiences that push boundaries.
            </p>
            <div className="footer-status">
              <span className="footer-status-dot" />
              <span className="footer-status-text">Available for Internship</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-nav-list">
              {[
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Projects', id: 'work' },
                { label: 'Certificates', id: 'hero' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="footer-nav-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">CONNECT</h4>
            <ul className="footer-nav-list">
              {[
                { label: 'GitHub', url: 'https://github.com/Renn6508' },
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/wilhelmina-lorenzia-wijaya-97045b3a9/' },
                { label: 'Instagram', url: 'https://www.instagram.com/ren_eyebqgs/' },
                { label: 'Twitter / X', url: 'https://x.com/ren_atos_person' },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.url} className="footer-nav-link" target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="footer-link-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <ul className="footer-nav-list footer-contact-list">
              <li>
                <span className="footer-contact-label">Email</span>
                <a href="mailto:email@example.com" className="footer-nav-link">wilhelmina6508@gmail.com</a>
              </li>
              <li>
                <span className="footer-contact-label">Phone</span>
                <a href="tel:+62" className="footer-nav-link">+62 812-4212-4114</a>
              </li>
              <li>
                <span className="footer-contact-label">Location</span>
                <span className="footer-nav-link footer-location">Lumajang, Jawa Timur, Indonesia</span>
              </li>
            </ul>
          </div>  
        </div>

        {/* ── Divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} YOUR<span>.</span>NAME — All rights reserved</div>
          <div className="footer-credits">
            Designed &amp; Built with <span className="footer-heart">♥</span>
          </div>
        </div>
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
        <Dashboard />
        <Work />
        <ParallaxBand />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}