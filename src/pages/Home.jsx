import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const DANCE_IMGS = [
  siteAssets.stageRed,
  siteAssets.groupStage,
  siteAssets.soloRed,
  siteAssets.guruPortrait,
  siteAssets.duoStage,
  siteAssets.multiArms,
]

function ClassIcon({ type }) {
  if (type === 'regular') {
    return (
      <img src={siteAssets.classRegular} alt="" aria-hidden="true" />
    )
  }

  if (type === 'ladies') {
    return (
      <img src={siteAssets.valueDedication} alt="" aria-hidden="true" />
    )
  }
   if (type === 'online') {
    return (
      <img src={siteAssets.online} alt="" aria-hidden="true" />
    )
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <rect x="18" y="22" width="44" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M12 60h56M28 60v7h18v-7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M38 32h12v10H38z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M44 34c1 3 3 4 5 5-2 1-4 2-5 5-1-3-3-4-5-5 2-1 4-2 5-5Z" fill="currentColor" />
    </svg>
  )
}

function UniqueIcon({ type }) {
  if (type === 'calendar') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="10" y="14" width="30" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M10 22h30M18 10v8M32 10v8M16 28h6M25 28h6M16 35h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="47" cy="39" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M47 34v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'ladies') {
    return <img src={siteAssets.classLadies} alt="" aria-hidden="true" />
  }

  if (type === 'online') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="12" y="14" width="32" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="2.8" />
        <path d="M8 44h40M20 44v5h12v-5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 38c5-8 12-13 18-13s13 5 18 13c-6 4-12 6-18 6s-12-2-18-6Z" fill="currentColor" />
      <path d="M19 30 15 20M27 26l1-10M37 26l7-8M45 31l5-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="39" r="2" fill="#fff" />
      <circle cx="32" cy="41" r="2" fill="#fff" />
      <circle cx="42" cy="39" r="2" fill="#fff" />
    </svg>
  )
}

export default function Home() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <section className="hero" style={{ '--hero-image': `url(${siteAssets.heroFigure})` }}>
        <img className="hero-ornament hero-ornament-top" src={siteAssets.heroTop} alt="" aria-hidden="true" />
        <img className="hero-ornament hero-ornament-left" src={siteAssets.heroLeft} alt="" aria-hidden="true" />
        <img className="hero-ornament hero-ornament-right" src={siteAssets.heroRight} alt="" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-line"></div>
          <h1 className="hero-title">WELCOME TO OUR<br />DANCE SCHOOL</h1>
          <p className="hero-subtitle">Embracing the rich heritage of Bharatanatyam</p>
          <p className="hero-desc">Experience the divine art of classical Indian dance, where tradition meets grace, and every movement tells a story</p>
        </div>
      </section>

      <section className="about-strip">
        <div className="container">
          <div className="divider"><div className="divider-diamond"></div></div>
          <div className="reveal">
            {/* <span className="section-tag">Our Art</span> */}
            <h2 className="section-title" style={{ textAlign: 'center', fontStyle: 'var(--font-body)', textTransform: 'uppercase' }}>The Art of Bharatanatyam</h2>
          </div>
          <p className="reveal" style={{ transitionDelay: '0.15s' }}>
            At Shanthala Nritya Angala, we are dedicated to preserving and promoting the ancient classical dance form of Bharatanatyam. Our school nurtures students in the authentic tradition, emphasizing technique, expression, and spiritual connection.
          </p>
          <p className="reveal" style={{ transitionDelay: '0.25s', marginTop: '1rem' }}>
            Through disciplined training and devotion, we guide each student on their journey to master this sacred art form that has been passed down through generations.
          </p>
          {/* <div className="divider reveal" style={{ transitionDelay: '0.35s' }}><div className="divider-diamond"></div></div> */}
        </div>
      </section>

      <section className="about-band">
        <div className="about-band-image">
          <img src={siteAssets.groupStage} alt="" aria-hidden="true" />
        </div>
        <div className="container">
          <div className="about-band-panel reveal">
            <h2>About Us</h2>
            <p style={{ transitionDelay: '0.15s' }}>
              Our dance school is rooted in the rich tradition of Bharatanatyam and is committed to imparting this classical art form with sincerity and discipline. Over the years, we have created a space where students can learn not only the technical aspects of dance but also its deeper cultural and spiritual significance.
            </p>
            <Link to="/about" className="about-band-link">
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className="guru-section">
        <div className="container">
          <div className="divider"><div className="divider-diamond"></div></div>
          <div className="guru-grid">
            <div className="guru-image-wrap reveal-left">
              <img
                src={siteAssets.guruPortrait}
                alt="Guru Bianca Radhakrishna"
              />
            </div>
            <div className="reveal-right">
              <span className="guru-tag">Our Guru</span>
              <h2 className="guru-name">Bianca<br />Radhakrishna</h2>
              <p className="guru-bio">
                A distinguished Bharatanatyam exponent with over two decades of experience in preserving and propagating this classical art form. Her journey in dance has been marked by dedication, artistic excellence, and a profound commitment to traditional values.
              </p>
              <p className="guru-bio">
                Guru Bianca Radhakrishna has trained under renowned masters and has performed at prestigious venues across the world. Her teaching methodology combines rigorous traditional training with a deep understanding of the spiritual essence of Bharatanatyam.
              </p>
              <Link to="/guru" className="guru-link">See More about our Guru -&gt;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="classes-section">
        <div className="container">
          <div className="classes-header reveal">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Classes Offered</h2>
            <p >
              Our classes focus on building strong fundamentals in Bharatanatyam, nurturing grace, discipline, and expression in every student
            </p>
          </div>
          <div className="classes-grid">
            {[
              { icon: 'regular', title: 'Regular Classes', desc: <>Structured training for<br />students aged 5 and above</> },
              { icon: 'ladies', title: 'Ladies Batch', desc: 'Special batch for women restarting their dance journey' },
              { icon: 'online', title: 'Online Classes', desc: 'Learn from anywhere with guided online sessions' },
            ].map((c, i) => (
              <div className="class-card reveal" key={c.title} style={{ transitionDelay: `${i * 0.12}s` }}>
                <span className="class-icon">
                  <ClassIcon type={c.icon} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="class-card-divider">
                  <span></span>
                  <i></i>
                  <span></span>
                </div>
              </div>
            ))}
          </div>
          <div className="classes-cta reveal">
            <Link to="/classes" className="btn-primary">View All Classes</Link>
          </div>
          <div className="section-ornament reveal" aria-hidden="true">
            <span></span>
            <img src={siteAssets.design} alt="" />
            <span></span>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header reveal">
            <span className="section-tag">Gallery</span>
            <h2 className="section-title" style={{ fontStyle: 'var(--font-body)', textTransform: 'uppercase' }}>A Glimpse Into Our Dance Journey</h2>
          </div>
          <div className="gallery-grid">
            {[
              { cls: 'tall', img: DANCE_IMGS[0] },
              { cls: '', img: DANCE_IMGS[2] },
              { cls: '', img: DANCE_IMGS[3] },
              { cls: '', img: DANCE_IMGS[4] },
              { cls: 'wide', img: DANCE_IMGS[1] },
            ].map((item, i) => (
              <div className={`gallery-item ${item.cls} reveal`} key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <img className="gallery-placeholder" src={item.img} alt={`Dance ${i + 1}`} />
                <div className="gallery-overlay"></div>
              </div>
            ))}
          </div>
          <div className="gallery-cta reveal">
            <Link to="/gallery" className="btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="divider"><div className="divider-diamond"></div></div>
          <div className="contact-card reveal">
            <h2>Contact Us</h2>
            <div className="form-row">
              <input className="form-input" type="text" placeholder="Name" />
              <input className="form-input" type="email" placeholder="Email" />
            </div>
            <div className="form-stack">
              <input className="form-input form-input-phone" type="tel" placeholder="Phone Number" />
              <textarea className="form-input form-input-message" placeholder="Message"></textarea>
            </div>
            <div className="form-submit">
              <button className="btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
