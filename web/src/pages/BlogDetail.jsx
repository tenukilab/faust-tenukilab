import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlog } from '../lib/microcms'
import './BlogDetail.css'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBlog(id)
      .then((res) => setBlog(res))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="blog-loading">読み込み中...</div>
  if (error) return <div className="blog-error">記事が見つかりませんでした。</div>

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-inner">
        <Link to="/blog" className="back-link">← 記事一覧へ</Link>

        <header className="blog-detail-header">
          {blog.category && (
            <span className="blog-category">
              {typeof blog.category === 'object' ? blog.category.name : blog.category}
            </span>
          )}
          <h1 className="blog-detail-title">{blog.title}</h1>
          <p className="blog-detail-date">
            {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
          </p>
        </header>

        {blog.eyecatch && (
          <img
            src={blog.eyecatch.url}
            alt={blog.title}
            className="blog-detail-eyecatch"
          />
        )}

        <div
          className="blog-detail-body"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="blog-detail-footer">
          <Link to="/blog" className="back-link">← 記事一覧へ</Link>
        </div>
      </div>
    </div>
  )
}
