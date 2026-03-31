import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'
import { apiFetch } from '../lib/api'

const galleryImages = [
  { url: siteAssets.soloRed, title: 'Performance still 1' },
  { url: siteAssets.sunsetDance, title: 'Performance still 2' },
  { url: siteAssets.blueCurtain, title: 'Performance still 3' },
  { url: siteAssets.guruPortrait, title: 'Guru portrait' },
  { url: siteAssets.groupStage, title: 'Stage performance' },
  { url: siteAssets.hero, title: 'Hero gallery frame' },
  { url: siteAssets.redBlack, title: 'Performance still 4' },
  { url: siteAssets.smileRed, title: 'Performance still 5' },
  { url: siteAssets.lampPose, title: 'Performance still 6' },
  { url: siteAssets.groupStack, title: 'Group performance' },
  { url: siteAssets.multiArms, title: 'Class performance' },
  { url: siteAssets.hnStage, title: 'Stage moment' },
]

export default function Gallery() {
  useScrollReveal()
  const [photos, setPhotos] = useState(galleryImages)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadPhotos() {
      try {
        const data = await apiFetch('/api/photos')
        if (ignore) return

        if (Array.isArray(data) && data.length > 0) {
          setPhotos(data)
        } else {
          setPhotos(galleryImages)
        }
        setError('')
      } catch (fetchError) {
        if (!ignore) {
          setPhotos(galleryImages)
          setError('')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadPhotos()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="page-enter">
      <section className="gallery-page">
        <div className="container">
          <h1 className="cp-heading" style={{ textAlign: 'center' }}>Gallery</h1>
          <div className="divider reveal"><div className="divider-diamond"></div></div>
          {loading ? <p className="gallery-status">Loading gallery...</p> : null}
          {error ? <p className="gallery-status gallery-status--error">{error}</p> : null}
          <div className="gallery-masonry reveal">
            {photos.map((photo, i) => (
              <div className="gallery-masonry-item" key={photo._id || photo.url || i}>
                <img src={photo.url} alt={photo.altText || photo.title || `Gallery ${i + 1}`} loading="lazy" />
                <div className="gallery-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
