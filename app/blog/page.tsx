'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/client'
import { ARTICLES_QUERY } from '@/sanity/queries'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  image?: any
  tags?: string[]
  readingTime?: number
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await sanityFetch<Article[]>({
          query: ARTICLES_QUERY,
        })
        setArticles(data || [])
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#efebe4',
        color: '#2a2a51',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(27, 27, 52, 0.15)',
          background: '#f6f7f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: '#1b1b34' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>← back home</span>
        </Link>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1b1b34' }}>
          Articles
        </h1>
        <div style={{ width: '100px' }} />
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 32px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p>Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p>No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '32px' }}>
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/blog/${article.slug.current}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article
                  style={{
                    padding: '32px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid rgba(27, 27, 52, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: article.image ? '1fr 200px' : '1fr',
                    gap: '32px',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.boxShadow = '0 8px 24px rgba(27, 27, 52, 0.12)'
                    el.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: '0 0 16px 0',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1b1b34',
                        lineHeight: '1.3',
                      }}
                    >
                      {article.title}
                    </h2>

                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        marginBottom: '16px',
                        fontSize: '13px',
                        color: '#8585c1',
                      }}
                    >
                      <time>{formatDate(article.publishedAt)}</time>
                      {article.readingTime && <span>• {article.readingTime} min read</span>}
                    </div>

                    {article.excerpt && (
                      <p
                        style={{
                          margin: '0 0 16px 0',
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: '#2a2a51',
                        }}
                      >
                        {article.excerpt}
                      </p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '4px 12px',
                              background: '#f0e8ff',
                              borderRadius: '20px',
                              fontSize: '12px',
                              color: '#d858d6',
                              fontWeight: '500',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {article.image && (
                    <div
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#f6f7f9',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={article.image.asset.url}
                        alt={article.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
