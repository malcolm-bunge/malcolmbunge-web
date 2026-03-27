'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { ARTICLE_QUERY, ARTICLES_QUERY } from '@/sanity/queries'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  content: any[]
  image?: any
  tags?: string[]
  readingTime?: number
  originalUrl?: string
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        style={{
          fontSize: '28px',
          fontWeight: '700',
          margin: '48px 0 24px 0',
          color: '#1b1b34',
          lineHeight: '1.3',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        style={{
          fontSize: '22px',
          fontWeight: '600',
          margin: '32px 0 16px 0',
          color: '#1b1b34',
          lineHeight: '1.3',
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        style={{
          margin: '32px 0',
          padding: '24px',
          borderLeft: '4px solid #d858d6',
          background: '#f9f6fc',
          borderRadius: '4px',
          fontSize: '18px',
          fontStyle: 'italic',
          color: '#2a2a51',
          lineHeight: '1.8',
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p
        style={{
          margin: '0 0 24px 0',
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#2a2a51',
        }}
      >
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ fontWeight: '700', color: '#1b1b34' }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#d858d6',
          textDecoration: 'underline',
          textDecorationColor: 'rgba(216, 88, 214, 0.3)',
        }}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset: { url: string }; alt: string; caption?: string }
    }) => (
      <figure style={{ margin: '48px 0' }}>
        <img
          src={value.asset.url}
          alt={value.alt}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            marginBottom: value.caption ? '12px' : '0',
          }}
        />
        {value.caption && (
          <figcaption
            style={{
              fontSize: '14px',
              color: '#8585c1',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul
        style={{
          margin: '24px 0',
          paddingLeft: '32px',
          color: '#2a2a51',
          fontSize: '18px',
          lineHeight: '1.8',
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol
        style={{
          margin: '24px 0',
          paddingLeft: '32px',
          color: '#2a2a51',
          fontSize: '18px',
          lineHeight: '1.8',
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: '8px' }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: '8px' }}>{children}</li>
    ),
  },
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!slug) return

    const fetchArticle = async () => {
      try {
        const data = await sanityFetch<Article>({
          query: ARTICLE_QUERY,
          params: { slug },
        })
        setArticle(data || null)
      } catch (error) {
        console.error('Failed to fetch article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#efebe4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#2a2a51' }}>Loading article...</p>
      </main>
    )
  }

  if (!article) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background: '#efebe4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#1b1b34', marginBottom: '16px' }}>Article not found</h1>
          <Link
            href="/blog"
            style={{
              color: '#d858d6',
              textDecoration: 'underline',
            }}
          >
            ← Back to articles
          </Link>
        </div>
      </main>
    )
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
        }}
      >
        <Link href="/blog" style={{ textDecoration: 'none', color: '#1b1b34' }}>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>← back to articles</span>
        </Link>
      </nav>

      {/* Hero / Featured Image */}
      {article.image && (
        <div
          style={{
            width: '100%',
            height: '400px',
            background: '#f6f7f9',
            overflow: 'hidden',
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

      {/* Article Content */}
      <article
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '64px 32px',
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '800',
              margin: '0 0 24px 0',
              color: '#1b1b34',
              lineHeight: '1.2',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {article.title}
          </h1>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <time
              style={{
                fontSize: '14px',
                color: '#8585c1',
                fontWeight: '500',
              }}
            >
              {formatDate(article.publishedAt)}
            </time>
            {article.readingTime && (
              <>
                <span style={{ color: '#8585c1' }}>•</span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#8585c1',
                    fontWeight: '500',
                  }}
                >
                  {article.readingTime} min read
                </span>
              </>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
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
        </header>

        {/* Body */}
        <div style={{ marginBottom: '48px' }}>
          {article.content && <PortableText value={article.content} components={portableTextComponents} />}
        </div>

        {/* Footer */}
        <footer
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(27, 27, 52, 0.15)',
            marginTop: '64px',
          }}
        >
          {article.originalUrl && (
            <div style={{ marginBottom: '24px' }}>
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#1b1b34',
                  color: '#bbbbdd',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2a2a51'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1b1b34'
                }}
              >
                Read on Substack →
              </a>
            </div>
          )}

          <div style={{ marginTop: '32px' }}>
            <Link
              href="/blog"
              style={{
                color: '#d858d6',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              ← Back to all articles
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}
