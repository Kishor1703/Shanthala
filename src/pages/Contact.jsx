import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

export default function Contact() {
  useScrollReveal()

  return (
    <div className="page-enter">
      {/* <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.lampPose})` }}>
        <div>
          <h1>Contact Us</h1>
          <p>We would love to hear from you and help begin your Bharatanatyam journey.</p>
        </div>
      </div> */}

      <section className="contact-section contact-page-section" style={{ paddingTop: '6rem' }}>
        <img
          className="mandala-bg mandala-contact-left"
          src={siteAssets.heroLeft}
          alt=""
          aria-hidden="true"
        />
        <img
          className="mandala-bg mandala-contact-right"
          src={siteAssets.heroRight}
          alt=""
          aria-hidden="true"
        />
        <img
          className="mandala-bg mandala-contact-top"
          src={siteAssets.heroTop}
          alt=""
          aria-hidden="true"
        />
        <div className="container">
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

          <div className="contact-info-grid">
            {[
              { icon: 'EM', label: 'Email', value: 'info@shanthaladance.in' },
              { icon: 'PH', label: 'Phone', value: '+91 99867 30111', valueClassName: 'phone-number-text' },
              { icon: 'AD', label: 'Address', value: '25, 8th Main Rd, 10th Cross, 2nd Block, Jayanagar, Bengaluru 560011' },
            ].map((item, i) => (
              <div key={i} className="contact-info-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="contact-info-icon">{item.icon}</div>
                <h4>{item.label}</h4>
                <p className={item.valueClassName}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
