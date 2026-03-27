import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'

const galleryImages = [
  siteAssets.soloRed,
  siteAssets.sunsetDance,
  siteAssets.blueCurtain,
  siteAssets.guruPortrait,
  siteAssets.groupStage,
  siteAssets.hero,
  siteAssets.redBlack,
  siteAssets.smileRed,
  siteAssets.lampPose,
  siteAssets.groupStack,
  siteAssets.multiArms,
  siteAssets.hnStage,
]

export default function Gallery() {
  useScrollReveal()

  return (
    <div className="page-enter">
      <div className="page-hero page-hero-photo" style={{ '--page-hero-image': `url(${siteAssets.groupStage})` }}>
        <div>
          <h1>Gallery</h1>
          <p>A visual celebration of movement, grace, and the timeless beauty of Bharatanatyam.</p>
        </div>
      </div>

      <section className="gallery-page">
        <img
          className="mandala-bg mandala-gallery-left"
          src={siteAssets.heroLeft}
          alt=""
          aria-hidden="true"
        />
        <img
          className="mandala-bg mandala-gallery-right"
          src={siteAssets.heroRight}
          alt=""
          aria-hidden="true"
        />
        <img
          className="mandala-bg mandala-gallery-top"
          src={siteAssets.heroTop}
          alt=""
          aria-hidden="true"
        />
        <div className="container">
          <div className="divider reveal"><div className="divider-diamond"></div></div>
          <div className="gallery-masonry reveal">
            {galleryImages.map((src, i) => (
              <div className="gallery-masonry-item" key={i}>
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
                <div className="gallery-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
