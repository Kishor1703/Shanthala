import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const testimonials = [
  { initials: 'AV', name: 'Ashwini Valageri', age: 32, stars: 5, text: "Bianca is a deeply dedicated and passionate classical dancer. As someone in my mid 30s looking to reignite my love for dance, I enrolled in her classes and I've enjoyed every single session. She teaches with remarkable patience, respects each student's individual pace and makes learning fun and effortless." },
  { initials: 'SG', name: 'Suma G Prakash', age: 35, stars: 5, text: "My daughter is lucky to be getting trained with the energetic, talented teacher Ms. Bianca. She is not just a teacher but also a mentor helping us build a strong foundation with Bharatiya samskaras and confidence." },
  { initials: 'DP', name: 'Dhriti Prakash', age: 18, stars: 5, text: 'Truly an amazing class. Bianca maam is one of the most dedicated people who makes a positive impact in the way we experience Bharatanatyam both as an art form and as a part of life.' },
  { initials: 'AM', name: 'Ayumi Miura', age: 25, stars: 5, text: 'My Bharatanatyam journey has been almost 10 years, and I feel very lucky to have finally found this place. Watching her perform and learning from her has been deeply motivating.' },
]

function ValueIcon({ type }) {
  if (type === 'discipline') {
    return <img src={siteAssets.disciplineIcon} alt="" aria-hidden="true" />
  }

  if (type === 'dedication') {
    return <img src={siteAssets.valueDiscipline} alt="" aria-hidden="true" />
  }

  if (type === 'spirituality') {
     return<img src={siteAssets.spi} alt="" aria-hidden="true" />
  }

  return (
    <img src={siteAssets.grow} alt="" aria-hidden="true" />
  )
}

export default function About() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.multiArms})` }}>
        <div>
          <h1>About Us</h1>
          <p>A sanctuary where tradition meets grace, and every dancer embarks on a journey of artistic excellence and spiritual growth through the timeless art of Bharatanatyam.</p>
        </div>
      </div>

      <section className="about-intro">
        <div className="container">
          <div className="divider"><div className="divider-diamond"></div></div>
          <div className="about-intro-text">
            <div className="reveal">
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title" style={{ fontStyle: 'var(--font-body)' }}>Shanthala Nritya Angala</h2>
            </div>
            <p className="reveal" style={{ transitionDelay: '0.15s' }}>
              Shanthala Nritya Angala is a dedicated space for learning Bharatanatyam, rooted in tradition and guided by discipline, grace, and cultural values. Established with a passion for classical dance, the school provides a nurturing environment for students of all ages to explore and grow in their artistic journey.
            </p>
            <p className="reveal" style={{ transitionDelay: '0.25s' }}>
              With a focus on strong fundamentals, expression, and spiritual connection, Shanthala Nritya Angala encourages every student to learn with sincerity, confidence, and devotion to the art form.
            </p>
          </div>
          <div className="divider reveal"><div className="divider-diamond"></div></div>
        </div>
      </section>

      <section className="journey-section">
        <div className="container">
          <div className="journey-grid">
            <div className="reveal-left unique-copy">
              <img src={siteAssets.guruPortrait} alt="Journey" />
            </div>
            <div className="journey-text reveal-right">
              <span className="section-tag">Our Story</span>
              <h2>Our Journey</h2>
              <p>Shanthala Nritya Angala was born from a deep passion for Bharatanatyam and a vision to create a space where this magnificent art form could flourish. Founded by Guru Bianca Radhakrishna, the school emerged from years of rigorous training, performance, and a burning desire to pass on this sacred tradition to the next generation.</p>
              <p>What began as a small group of dedicated students has blossomed into a vibrant community of dancers, each contributing their unique voice to the rich tapestry of classical dance. Our journey has been one of continuous learning, growth, and unwavering commitment to excellence.</p>
              <p>Inspired by the grace and spirituality inherent in Bharatanatyam, we strive to create not just skilled dancers, but artists who understand and embody the soul of this timeless tradition.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="values-header reveal">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>What We Stand For</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Our Values</h2>
            <p>The principles that guide our teaching and shape our community.</p>
          </div>
          <div className="values-grid">
            {[
              { icon: 'discipline', title: 'Discipline', desc: 'Regular practice and dedication form the foundation of mastery in Bharatanatyam.' },
              { icon: 'dedication', title: 'Dedication', desc: 'Wholehearted commitment to the art form and continuous pursuit of excellence.' },
              { icon: 'spirituality', title: 'Spirituality', desc: 'Understanding the deeper spiritual essence that makes Bharatanatyam sacred.' },
              { icon: 'growth', title: 'Growth', desc: 'Continuous evolution as artists and individuals through lifelong learning.' },
            ].map((v, i) => (
              <div className="value-card reveal" key={v.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="value-icon">
                  <ValueIcon type={v.icon} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="unique-section">
        <div className="container">
          <div className="unique-header reveal">
            <h2 className="section-title">What Makes Us Unique</h2>
          </div>
          <div className="unique-grid">
            <div className="reveal-left unique-copy">
              <ul className="unique-list">
                {[
                  { icon: 'calendar', title: 'Flexible Batches', desc: 'Classes available throughout the week to suit different schedules.' },
                  { icon: 'ladies', title: 'Ladies Special Batch', desc: 'A welcoming space for women restarting their journey.' },
                  { icon: 'online', title: 'Online and Offline Classes', desc: 'Learn from anywhere with both in-person and virtual sessions.' },
                  { icon: 'arangetram', title: 'Arangetram Training', desc: 'Special guidance for students preparing for Arangetram.' },
                ].map((item, i) => (
                  <li className="unique-item" key={i}>
                    <div className="unique-item-icon">
                      {item.icon === 'calendar' && (
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <rect x="10" y="14" width="30" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
                          <path d="M10 22h30M18 10v8M32 10v8M16 28h6M25 28h6M16 35h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="47" cy="39" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
                          <path d="M47 34v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                      )}
                      {item.icon === 'ladies' && <img src={siteAssets.classLadies} alt="" aria-hidden="true" />}
                      {item.icon === 'online' && (
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <rect x="12" y="14" width="32" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="2.8" />
                          <path d="M8 44h40M20 44v5h12v-5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                        </svg>
                      )}
                      {item.icon === 'arangetram' && (
                        <svg viewBox="0 0 64 64" aria-hidden="true">
                          <path d="M14 38c5-8 12-13 18-13s13 5 18 13c-6 4-12 6-18 6s-12-2-18-6Z" fill="currentColor" />
                          <path d="M19 30 15 20M27 26l1-10M37 26l7-8M45 31l5-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="22" cy="39" r="2" fill="#fff" />
                          <circle cx="32" cy="41" r="2" fill="#fff" />
                          <circle cx="42" cy="39" r="2" fill="#fff" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-right">
              <img src={siteAssets.lampPose} alt="What makes us unique" style={{ width: '100%', height: '480px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header reveal">
            <span className="section-tag">Student Stories</span>
            <h2 className="section-title" style={{ fontStyle: 'italic' }}>Testimonials</h2>
            <p>See what our students and parents are saying.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div className="testimonial-info">
                    <h4>{t.name}</h4>
                    <span>Age {t.age}</span>
                  </div>
                  <div className="stars" style={{ marginLeft: 'auto' }}>{'*****'.slice(0, t.stars)}</div>
                </div>
                <p className="testimonial-text">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
