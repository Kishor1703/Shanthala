import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { apiFetch } from '../lib/api'
import { siteAssets } from '../siteAssets'

export default function Gallery() {
  useScrollReveal()
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadPhotos() {
      try {
        const data = await apiFetch('/api/photos')
        if (ignore) return

        setPhotos(Array.isArray(data) ? data : [])
        setError('')
      } catch (fetchError) {
        if (!ignore) {
          setPhotos([])
          setError(fetchError.message || 'Unable to load gallery images right now.')
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
        <img className="page-bg-design page-bg-design--gallery-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--gallery-center" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--gallery-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">
          <h1 className="cp-heading" style={{ textAlign: 'center' }}>Gallery</h1>
          <div className="divider reveal"><div className="divider-diamond"></div></div>
          {loading ? <p className="gallery-status">Loading gallery...</p> : null}
          {error ? <p className="gallery-status gallery-status--error">{error}</p> : null}
          {!loading && !error && photos.length === 0 ? (
            <p className="gallery-status">No gallery images have been uploaded yet.</p>
          ) : null}
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
