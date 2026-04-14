import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

export default function BlogDetail() {
  useScrollReveal()
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadBlog() {
      try {
        const data = await apiFetch(`/api/blogs/${blogId}`)
        if (ignore) return
        setBlog(data)
        setError('')
      } catch (fetchError) {
        if (ignore) return
        setBlog(null)
        setError(fetchError.message || 'Unable to load this blog right now.')
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadBlog()

    return () => {
      ignore = true
    }
  }, [blogId])

  return (
    <div className="page-enter">
      <section className="blog-page blog-detail-page">
        <img className="page-bg-design page-bg-design--blog-left" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <img className="page-bg-design page-bg-design--blog-right" src={siteAssets.backgroundDesign} alt="" aria-hidden="true" />
        <div className="container">
          <div className="blog-detail-shell reveal">
            <Link className="btn-outline blog-detail-back" to="/blog">Back to Blog</Link>

            {loading ? <p className="blog-status">Loading blog...</p> : null}
            {error ? <p className="blog-status blog-status--error">{error}</p> : null}

            {!loading && !error && blog ? (
              <article className="blog-detail-card">
                <div className="blog-detail-media">
                  <img src={blog.thumbnailUrl} alt={blog.thumbnailAlt || blog.title} />
                </div>

                <div className="blog-detail-content">
                  <div className="blog-meta">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span>{getReadTime(blog.content)}</span>
                  </div>
                  <h1 className="blog-detail-title">{blog.title}</h1>
                  <p className="blog-detail-author">By {blog.authorName}</p>
                  <p className="blog-detail-excerpt">{blog.excerpt}</p>

                  <div className="blog-rich-text blog-detail-body">
                    {String(blog.content || '').split(/\n+/).filter(Boolean).map((paragraph, index) => (
                      <p key={`${blog._id || blog.title}-detail-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
