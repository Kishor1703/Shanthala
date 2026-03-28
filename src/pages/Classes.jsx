import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const classes = [
  {
    title: 'Kids & Beginners Batch',
    img: siteAssets.groupStack,
    desc: 'Designed for young learners, this batch introduces the fundamentals of Bharatanatyam through basic steps, rhythm, and simple expressions in a structured and enjoyable way.',
    eligibility: ['Age 5 years and above', 'Beginners with no prior experience', 'Open to all genders'],
  },
  {
    title: 'Regular Batch',
    img: siteAssets.classRegular,
    desc: 'This batch focuses on structured and progressive learning, helping students improve their technique, rhythm, and expressions with consistent practice.',
    eligibility: ['Students with basic knowledge of Bharatanatyam', 'Willingness to practice regularly', 'Open to all age groups', 'Open to all genders'],
  },
  {
    title: 'Ladies Special Batch',
    img: siteAssets.classLadies,
    desc: 'Specially designed for women who wish to restart their dance journey, this batch offers a comfortable and flexible learning environment.',
    eligibility: ['Women of all age groups', 'Those who have learned previously or are interested to restart', 'Working professionals and homemakers welcome'],
  },
  {
    title: 'Online Classes',
    img: siteAssets.online,
    desc: 'Online classes are conducted for students outside Bangalore and abroad, ensuring quality training with flexibility and convenience.',
    eligibility: ['Students residing outside Bangalore or India', 'Access to a stable internet connection', 'Commitment to regular participation'],
  },
]

export default function Classes() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <section className="classes-page">
        <div className="container">
          <div className="classes-header reveal">
            <h1>Bharatanatyam Classes</h1>
            <div className="classes-header-divider" aria-hidden="true">
              <span></span>
              <i></i>
              <span></span>
            </div>
          </div>

          <div className="classes-grid">
            {classes.map((cls, i) => (
              <article
                className="class-detail-card reveal"
                key={cls.title}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="class-card-media">
                  <img className="class-img" src={cls.img} alt={cls.title} />
                </div>
                <div className="class-detail-body">
                  <p className="class-copy">{cls.desc}</p>
                  <span className="eligibility-title">Eligibility</span>
                  <ul className="eligibility-list">
                    {cls.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h2>{cls.title}</h2>
                  <div className="class-card-action">
                    <button className="btn-primary">Enquire Now</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <article className="arangetram-card reveal">
            <div className="arangetram-layout">
              <div className="arangetram-media">
                <img src={siteAssets.hnStage} alt="Arangetram Training" className="arangetram-img" />
              </div>
              <div className="arangetram-content">
                <p className="class-copy">
                  Intensive and personalized training is provided for students preparing for their Arangetram, focusing on advanced techniques, expressions, and stage performance. The training emphasizes discipline, dedication, and a deep understanding of the art form, guiding students through every aspect of their preparation with care and attention.
                </p>
                <div className="training-cols">
                  <div className="training-col">
                    <h4>Training Includes</h4>
                    <ul className="eligibility-list">
                      {['Complete Margam', 'Makeup and presentation guidance', 'Music coordination with musicians', 'Costume and jewelry consultation', 'Rehearsals and stage practice', 'Event planning support'].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="training-col">
                    <h4>Training Includes</h4>
                    <ul className="eligibility-list">
                      {['Students with at least 5-7 years of regular training and guru approval', 'Commitment towards Arangetram preparation', 'Open to students from other institutions'].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <h2>Arangetram Training</h2>
                <button className="btn-primary">Enquire Now</button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
