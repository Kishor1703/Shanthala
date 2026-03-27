import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

export default function Guru() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.guruPortrait})` }}>
        <div>
          <h1>About Our Guru</h1>
          <p>A life dedicated to the art of Bharatanatyam, preserving its essence and passing on its grace.</p>
        </div>
      </div>

      <section className="guru-page">
        <div className="container">
          <div className="guru-hero-grid">
            <div className="reveal-left">
              <img
                src={siteAssets.guruPortrait}
                alt="Guru Bianca Radhakrishna"
              />
            </div>
            <div className="guru-detail-text reveal-right">
              <span className="section-tag">Our Guru</span>
              <h2>Bianca<br />Radhakrishna</h2>
              <p>A distinguished Bharatanatyam exponent with over two decades of experience in preserving and propagating this classical art form. Her journey in dance has been marked by dedication, artistic excellence, and a profound commitment to traditional values.</p>
              <p>Guru Bianca Radhakrishna has trained under renowned masters and has performed at prestigious venues across the world. Her teaching methodology combines rigorous traditional training with a deep understanding of the spiritual essence of Bharatanatyam.</p>
              <p>She has performed at international festivals, received recognition from prestigious cultural organizations, and continues to be an ambassador for this ancient art form on global platforms.</p>
              <p>Her classes are known for their warmth, rigor, and the rare ability to make each student feel seen, whether a five-year-old or a returning adult learner. She believes that Bharatanatyam is not just dance, but a path of inner transformation.</p>
            </div>
          </div>

          <div className="guru-achievements">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">Milestones</span>
              <h2 className="section-title" style={{ fontStyle: 'italic' }}>Achievements & Recognition</h2>
            </div>
            <div className="guru-achievements-grid">
              {[
                { icon: 'IP', title: 'International Performances', desc: 'Performed at prestigious venues across India, Japan, Europe, and the Americas.' },
                { icon: '20+', title: 'Years of Teaching', desc: 'Over two decades shaping the next generation of Bharatanatyam artists.' },
                { icon: 'CA', title: 'Cultural Awards', desc: 'Recipient of multiple recognitions for contributions to classical dance.' },
              ].map((a, i) => (
                <div key={i} className="guru-achievement-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className="guru-achievement-icon">{a.icon}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
