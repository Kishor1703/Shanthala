import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

export default function Contact() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.lampPose})` }}>
        <div>
          <h1>Contact Us</h1>
          <p>We would love to hear from you and help begin your Bharatanatyam journey.</p>
        </div>
      </div>

      <section className="contact-section contact-page-section" style={{ paddingTop: '6rem' }}>
        <svg className="mandala-bg" style={{ left: '-5%', bottom: '-10%', width: '400px' }} viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="240" stroke="#C9973A" strokeWidth="1" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="250" y1="10" x2="250" y2="490" stroke="#C9973A" strokeWidth="0.5" transform={`rotate(${i * 30} 250 250)`} />
          ))}
        </svg>
        <div className="container">
          <div className="contact-card reveal">
            <h2>Contact Us</h2>
            <div className="form-row">
              <input className="form-input" type="text" placeholder="Name" />
              <input className="form-input" type="email" placeholder="Email" />
            </div>
            <input className="form-input" type="tel" placeholder="Phone Number" style={{ width: '100%', marginBottom: '1rem' }} />
            <textarea className="form-input" placeholder="Message"></textarea>
            <div className="form-submit">
              <button className="btn-primary">Submit</button>
            </div>
          </div>

          <div className="contact-info-grid">
            {[
              { icon: 'EM', label: 'Email', value: 'info@shanthaladance.in' },
              { icon: 'PH', label: 'Phone', value: '+91 99867 30111' },
              { icon: 'AD', label: 'Address', value: '25, 8th Main Rd, 10th Cross, 2nd Block, Jayanagar, Bengaluru 560011' },
            ].map((item, i) => (
              <div key={i} className="contact-info-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="contact-info-icon">{item.icon}</div>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
