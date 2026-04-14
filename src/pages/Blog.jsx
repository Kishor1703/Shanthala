import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'
import './Blog.css'

export default function Blog() {
  useScrollReveal()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadBlogs() {
      try {
        const data = await apiFetch('/api/blogs')
        if (ignore) return
        setBlogs(Array.isArray(data) ? data : [])
        setError('')
      } catch (fetchError) {
        if (!ignore) {
          setBlogs([])
          setError(fetchError.message || 'Unable to load blogs right now.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadBlogs()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="page-enter">
      <section className="blog-page">
        <img className="page-bg-design page-bg-design--blog-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--blog-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">
          <div className="blog-hero reveal">
            <div className="blog-hero-story">
              <div className="blog-hero-copy">
                <h1 className="cpp-heading blog-heading">Stories, reflections, and milestones from our dance community.</h1>
              </div>
              <div className="blog-hero-visual reveal-right">
                <div className="blog-hero-image-frame">
                  <img src={siteAssets.mandala} alt="Bharatanatyam performance" className="blog-hero-image-main" />
                </div>
              </div>
            </div>
            <div className="blog-hero-card">
              <p className="blog-hero-card-label">Share with us</p>
              <h2>Have a story, reflection, or update to share with our community?</h2>
              <p>We would love to feature your voice in the Shanthala blog space.</p>
              <Link className="btn-primary blog-hero-button" to="/blog/submit">Share Your Blog</Link>
            </div>
          </div>

          <div className="divider reveal"><div className="divider-diamond"></div></div>

          {loading ? <p className="blog-status">Loading blogs...</p> : null}
          {error ? <p className="blog-status blog-status--error">{error}</p> : null}
          {!loading && !error && blogs.length === 0 ? (
            <div className="blog-empty reveal">
              <h2>No blogs published yet</h2>
              <p>The first story can begin here. Share an article with the community and it will appear on this page.</p>
              <Link className="btn-primary" to="/blog/submit">Submit a Blog</Link>
            </div>
          ) : null}

          {!loading && !error && blogs.length > 0 ? (
            <div className="blog-grid">
              {blogs.map((blog, index) => (
                <Link
                  className="blog-card-link reveal"
                  key={blog._id || blog.title || index}
                  style={{ transitionDelay: `${index * 0.08}s` }}
                  to={`/blog/${blog._id}`}
                >
                  <article className="blog-card">
                    <img className="blog-card-thumb" src={blog.thumbnailUrl} alt={blog.thumbnailAlt || blog.title} />
                    <div className="blog-card-body">
                      <h3>{blog.title}</h3>
                      <p className="blog-card-excerpt">{blog.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
