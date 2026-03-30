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
      

      <section className="gallery-page">
        <div className="container">
          <h1 className="cp-heading" style={{ textAlign: "center" }}>
  Gallery
</h1>
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
