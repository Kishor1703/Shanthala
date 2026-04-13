import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { siteAssets } from '../siteAssets'
import './Blog.css'

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function getReadTime(content) {
  const words = String(content || '').trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 180))} min read`
}

export default function Blog() {
  useScrollReveal()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const featuredBlog = useMemo(() => blogs[0] || null, [blogs])
  const remainingBlogs = useMemo(() => blogs.slice(1), [blogs])

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
                <span className="section-tag">Community Journal</span>
                <h1 className="cpp-heading blog-heading">Stories, reflections, and milestones from our dance community.</h1>
                <p className="blog-hero-text">
                  Explore shared experiences, student journeys, performance memories, and thoughtful writing inspired by Bharatanatyam.
                </p>
              </div>
              {/* <div className="blog-hero-visual reveal-right">
                <div className="blog-hero-image-frame">
                  <img src={siteAssets.groupStage} alt="Students performing Bharatanatyam on stage" className="blog-hero-image-main" />
                </div>
                <div className="blog-hero-image-accent">
                  <img src={siteAssets.duoStage} alt="Bharatanatyam performance detail" className="blog-hero-image-secondary" />
                </div>
              </div> */}
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

          {!loading && !error && featuredBlog ? (
            <article className="blog-featured reveal">
              <div className="blog-featured-media">
                <img src={featuredBlog.thumbnailUrl} alt={featuredBlog.thumbnailAlt || featuredBlog.title} />
              </div>
              <div className="blog-featured-content">
                <div className="blog-meta">
                  <span>{formatDate(featuredBlog.createdAt)}</span>
                  <span>{getReadTime(featuredBlog.content)}</span>
                </div>
                <h2>{featuredBlog.title}</h2>
                <p className="blog-featured-author">By {featuredBlog.authorName}</p>
                <p className="blog-featured-excerpt">{featuredBlog.excerpt}</p>
                <div className="blog-rich-text">
                  {featuredBlog.content.split(/\n+/).filter(Boolean).map((paragraph, index) => (
                    <p key={`${featuredBlog._id || featuredBlog.title}-featured-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ) : null}

          {!loading && !error && remainingBlogs.length > 0 ? (
            <div className="blog-grid">
              {remainingBlogs.map((blog, index) => (
                <article className="blog-card reveal" key={blog._id || blog.title || index} style={{ transitionDelay: `${index * 0.08}s` }}>
                  <img className="blog-card-thumb" src={blog.thumbnailUrl} alt={blog.thumbnailAlt || blog.title} />
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>{formatDate(blog.createdAt)}</span>
                      <span>{getReadTime(blog.content)}</span>
                    </div>
                    <h3>{blog.title}</h3>
                    <p className="blog-card-author">By {blog.authorName}</p>
                    <p className="blog-card-excerpt">{blog.excerpt}</p>
                    <div className="blog-rich-text blog-rich-text--compact">
                      {blog.content.split(/\n+/).filter(Boolean).slice(0, 2).map((paragraph, paragraphIndex) => (
                        <p key={`${blog._id || blog.title}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
