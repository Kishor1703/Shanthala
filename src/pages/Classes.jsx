import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const classes = [
  {
    title: 'Kids & Beginners Batch',
    img: siteAssets.groupStack,
    desc: 'Designed for young learners, this batch introduces the fundamentals of Bharatanatyam through basic steps, rhythm, and simple expressions in a structured and enjoyable way.',
    eligibility: ['Age 5 years and above', 'Beginners with no prior experience', 'Open to all genders'],
    reverse: false,
  },
  {
    title: 'Regular Batch',
    img: siteAssets.stageRed,
    desc: 'This batch focuses on structured and progressive learning, helping students improve their technique, rhythm, and expressions with consistent practice.',
    eligibility: ['Students with basic knowledge of Bharatanatyam', 'Willingness to practice regularly', 'Open to all age groups', 'Open to all genders'],
    reverse: true,
  },
  {
    title: 'Ladies Special Batch',
    img: siteAssets.hero,
    desc: 'Specially designed for women who wish to restart their dance journey, this batch offers a comfortable and flexible learning environment.',
    eligibility: ['Women of all age groups', 'Those who have learned previously or are interested to restart', 'Working professionals and homemakers welcome'],
    reverse: false,
  },
  {
    title: 'Online Classes',
    img: siteAssets.sunsetDance,
    desc: 'Online classes are conducted for students outside Bangalore and abroad, ensuring quality training with flexibility and convenience.',
    eligibility: ['Students residing outside Bangalore or India', 'Access to a stable internet connection', 'Commitment to regular participation'],
    reverse: true,
  },
]

export default function Classes() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.stageRed})` }}>
        <div>
          <h1>Bharatanatyam Classes</h1>
          <p>Find the perfect batch for your journey, every stage of learning honoured and guided.</p>
        </div>
      </div>

      <section className="classes-page">
        <div className="container">
          {classes.map((cls, i) => (
            <div
              className={`class-detail-card ${cls.reverse ? 'reverse' : ''} reveal`}
              key={cls.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <img className="class-img" src={cls.img} alt={cls.title} />
              <div className="class-detail-body">
                <h2>{cls.title}</h2>
                <p>{cls.desc}</p>
                <span className="eligibility-title">Eligibility</span>
                <ul className="eligibility-list">
                  {cls.eligibility.map((e, j) => <li key={j}>{e}</li>)}
                </ul>
                <div style={{ marginTop: '1.5rem' }}>
                  <button className="btn-primary">Enquire Now</button>
                </div>
              </div>
            </div>
          ))}

          <div className="arangetram-card reveal">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <img
                  src={siteAssets.hnStage}
                  alt="Arangetram"
                  style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h2>Arangetram Training</h2>
                <p>Intensive and personalized training is provided for students preparing for their Arangetram, focusing on advanced techniques, expressions, and stage performance. The training emphasizes discipline, dedication, and a deep understanding of the art form.</p>
                <div className="training-cols">
                  <div>
                    <h4>Training Includes</h4>
                    <ul className="eligibility-list">
                      {['Complete Margam', 'Makeup and presentation guidance', 'Music coordination with musicians', 'Costume and jewelry consultation', 'Rehearsals and stage practice', 'Event planning support'].map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Eligibility</h4>
                    <ul className="eligibility-list">
                      {['Students with at least 5-7 years of regular training and guru approval', 'Commitment towards Arangetram preparation', 'Open to students from other institutions'].map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button className="btn-primary">Enquire Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
