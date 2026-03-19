import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs } from '../lib/microcms'
import './BlogList.css'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBlogs({ limit: 20, orders: '-publishedAt' })
      .then((res) => setBlogs(res.contents))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="blog-loading">読み込み中...</div>
  if (error) return <div className="blog-error">記事の取得に失敗しました。</div>

  return (
    <div className="blog-list-page">
      <div className="blog-list-header">
        <Link to="/" className="back-link">← トップへ</Link>
        <h1>記事一覧</h1>
        <p>てぬきラボの活動記録・ポートフォリオ</p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <Link key={blog.id} to={`/blog/${blog.id}`} className="blog-card">
            {blog.eyecatch && (
              <img src={blog.eyecatch.url} alt={blog.title} className="blog-card-img" />
            )}
            <div className="blog-card-body">
              {blog.category && (
                <span className="blog-category">
                  {typeof blog.category === 'object' ? blog.category.name : blog.category}
                </span>
              )}
              <h2 className="blog-card-title">{blog.title}</h2>
              <p className="blog-card-date">
                {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
