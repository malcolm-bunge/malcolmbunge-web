'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { ARTICLE_QUERY, ARTICLE_NAV_QUERY } from '@/sanity/queries'
import { urlFor } from '@/src/sanity/lib/image'
import Header from '../../components/Header'

const F = {
  fraunces: "var(--nf-fraunces), serif",
  inter: "var(--nf-inter), sans-serif",
  mono: "var(--nf-mono), monospace",
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  content: any[]
  image?: any
  tags?: string[]
  readingTime?: number
  originalUrl?: string
  author?: string
  vgWortPixelUrl?: string
}

const formatDate = (d: string) =>
  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(d))

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)
const SubstackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.539 8.242H1.46V5.406h21.079v2.836zM1.46 10.042v10.17h21.079v-10.17H1.46zm21.079-5.906V1.5H1.46v2.636h21.079z" />
  </svg>
)

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [isOpen, onClose])
  if (!isOpen) return null
  const contacts = [
    { label: 'Email', value: 'hello@malcolmbunge.com', href: 'mailto:hello@malcolmbunge.com', icon: MailIcon },
    { label: 'LinkedIn', value: 'linkedin.com/in/malcolmbunge', href: 'https://linkedin.com/in/malcolmbunge', icon: LinkedInIcon },
    { label: 'Substack', value: 'mbunge.substack.com', href: 'https://mbunge.substack.com', icon: SubstackIcon },
  ]
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 98 }} onClick={onClose} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: '#1e1e28', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
        padding: '32px', zIndex: 99, minWidth: '320px', maxWidth: '400px', width: 'calc(100% - 48px)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '22px', color: '#e8e0d5', margin: 0, fontOpticalSizing: 'none' as any, fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}>Get in touch</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8a8499', fontSize: '18px', cursor: 'pointer', lineHeight: 1, padding: '4px' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contacts.map(({ label, value, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-row"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', textDecoration: 'none', color: '#e8e0d5' }}>
              <span style={{ color: '#8a8499', display: 'flex', alignItems: 'center', flexShrink: 0 }}><Icon /></span>
              <div>
                <div style={{ fontFamily: F.inter, fontWeight: 600, fontSize: '14px', color: '#e8e0d5' }}>{label}</div>
                <div style={{ fontFamily: F.mono, fontSize: '11px', color: '#8a8499', marginTop: '2px' }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

function SplitTitle({ title }: { title: string }) {
  const match = title.match(/^(.*?)(\s[–:]\s)(.+)$/)
  if (match) {
    return (
      <span>
        {match[1]}
        <span style={{ color: '#ff6b81' }}>{match[2]}{match[3]}</span>
      </span>
    )
  }
  const words = title.trim().split(' ')
  const last = words.pop()
  return (
    <span>
      {words.join(' ')}{' '}
      <span style={{ color: '#ff6b81' }}>{last}</span>
    </span>
  )
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ margin: '0 0 28px', fontSize: '18px', lineHeight: '1.85', color: '#c8c0b5', fontFamily: F.inter }}>
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: F.fraunces, fontSize: '28px', fontWeight: 700, margin: '56px 0 20px', color: '#e8e0d5', lineHeight: '1.25', fontOpticalSizing: 'none' as any, fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: F.fraunces, fontSize: '22px', fontWeight: 700, margin: '40px 0 16px', color: '#e8e0d5', lineHeight: '1.3', fontOpticalSizing: 'none' as any, fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{
        margin: '40px 0', padding: '20px 28px',
        borderLeft: '3px solid #ff6b81',
        fontSize: '19px', fontStyle: 'italic', fontFamily: F.fraunces,
        color: '#c8c0b5', lineHeight: '1.75',
      }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ fontWeight: 700, color: '#e8e0d5' }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        style={{ color: '#ff6b81', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'rgba(255,107,129,0.4)' }}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure style={{ margin: '48px 0' }}>
        <img src={urlFor(value).width(860).url()} alt={value.alt || ''}
          style={{ width: '100%', height: 'auto', display: 'block' }} />
        {value.caption && (
          <figcaption style={{ fontFamily: F.mono, fontSize: '12px', color: '#8a8499', textAlign: 'center', marginTop: '10px' }}>
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ margin: '0 0 28px', paddingLeft: '28px', fontSize: '18px', lineHeight: '1.85', fontFamily: F.inter, color: '#c8c0b5' }}>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ margin: '0 0 28px', paddingLeft: '28px', fontSize: '18px', lineHeight: '1.85', fontFamily: F.inter, color: '#c8c0b5' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
  },
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')
  const [prevArticle, setPrevArticle] = useState<{ title: string; slug: { current: string } } | null>(null)
  const [nextArticle, setNextArticle] = useState<{ title: string; slug: { current: string } } | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => { params.then((p) => setSlug(p.slug)) }, [params])

  useEffect(() => {
    if (!slug) return
    sanityFetch<Article>({ query: ARTICLE_QUERY, params: { slug } })
      .then((data) => {
        setArticle(data || null)
        if (data?.publishedAt) {
          sanityFetch<{ prev: any; next: any }>({ query: ARTICLE_NAV_QUERY, params: { publishedAt: data.publishedAt } })
            .then(({ prev, next }) => { setPrevArticle(prev || null); setNextArticle(next || null) })
            .catch(console.error)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  const shell = (content: React.ReactNode) => (
    <div style={{ backgroundColor: '#13131a', minHeight: '100dvh', color: '#e8e0d5', fontFamily: F.inter }}>
      <style>{`
        * { box-sizing: border-box; }
        .site-nav-link:hover { color: #e8e0d5 !important; }
        .contact-row:hover { background: rgba(255,255,255,0.04) !important; }
        .share-link:hover { border-color: rgba(255,255,255,0.3) !important; color: #e8e0d5 !important; }
        .article-nav-link:hover { color: #ff6b81 !important; }
        @media (max-width: 640px) {
          .article-title { font-size: 32px !important; }
          .article-nav-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <Header onContactOpen={() => setContactOpen(true)} />
      </div>
      {content}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 48px', display: 'flex', gap: '24px', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
        <Link href="/impressum" style={{ fontFamily: F.inter, fontSize: '12px', color: '#8a8499', textDecoration: 'none' }} className="site-nav-link">Legal Notice</Link>
        <Link href="/datenschutz" style={{ fontFamily: F.inter, fontSize: '12px', color: '#8a8499', textDecoration: 'none' }} className="site-nav-link">Privacy Policy</Link>
      </div>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )

  if (loading) return shell(
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 40px', fontFamily: F.mono, fontSize: '13px', color: '#8a8499' }}>Loading…</div>
  )

  if (!article) return shell(
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontFamily: F.fraunces, fontSize: '24px', color: '#e8e0d5' }}>Article not found.</p>
      <Link href="/blog" style={{ color: '#ff6b81', textDecoration: 'none', fontFamily: F.inter, fontWeight: 500, fontSize: '14px' }}>← Back to Writing</Link>
    </div>
  )

  return shell(
    <article>
      {/* Article header — full width */}
      <header style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 40px 48px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {article.tags && article.tags[0] && (
          <div style={{ fontFamily: F.fraunces, fontStyle: 'italic', fontSize: '14px', color: '#ff6b81', marginBottom: '20px' }}>
            {article.tags[0]}
          </div>
        )}
        <h1
          className="article-title"
          style={{
            fontFamily: F.fraunces, fontWeight: 700, fontSize: '56px',
            lineHeight: '1.1', letterSpacing: '-1px', color: '#e8e0d5',
            maxWidth: '860px', marginBottom: '28px',
            fontOpticalSizing: 'none' as any, fontVariationSettings: "'opsz' 72, 'SOFT' 100",
          }}
        >
          <SplitTitle title={article.title} />
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', fontFamily: F.mono, fontSize: '12px', color: '#8a8499' }}>
          {article.readingTime && <span>{article.readingTime} min read</span>}
          {article.author && <span>by {article.author}</span>}
          {article.tags && article.tags.length > 1 && <span>{article.tags.slice(1).join(' · ')}</span>}
        </div>
      </header>

      {/* Featured image — full bleed */}
      {article.image && (
        <div style={{ width: '100%', maxHeight: '520px', overflow: 'hidden', position: 'relative' }}>
          <img
            src={urlFor(article.image).width(1400).height(520).fit('crop').url()}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #13131a 100%)' }} />
        </div>
      )}

      {/* Article body */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 40px' }}>
        {article.content && <PortableText value={article.content} components={portableTextComponents} />}
        {article.vgWortPixelUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.vgWortPixelUrl} width={1} height={1} alt="" style={{ display: 'block' }} />
        )}
      </div>

      {/* Article footer */}
      <footer style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 64px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px' }}>

          {/* Share */}
          {(() => {
            const url = `https://malcolmbunge.com/blog/${article.slug.current}`
            const text = encodeURIComponent(article.title)
            const enc = encodeURIComponent(url)
            const links = [
              { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}` },
              { label: 'Bluesky', href: `https://bsky.app/intent/compose?text=${text}%20${enc}` },
              { label: 'Threads', href: `https://www.threads.net/intent/post?text=${text}%20${enc}` },
              { label: 'E-Mail', href: `mailto:?subject=${text}&body=${enc}` },
            ]
            return (
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8a8499', marginBottom: '12px' }}>Share</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {links.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="share-link"
                      style={{ padding: '7px 16px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', fontFamily: F.inter, fontWeight: 400, fontSize: '13px', color: '#8a8499', textDecoration: 'none' }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Back + Substack */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link href="/blog" style={{ color: '#8a8499', textDecoration: 'none', fontFamily: F.inter, fontWeight: 400, fontSize: '14px' }} className="site-nav-link">
              ← Back to Writing
            </Link>
            {article.originalUrl && (
              <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="share-link"
                style={{ padding: '8px 20px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '4px', fontFamily: F.inter, fontWeight: 500, fontSize: '14px', color: '#e8e0d5', textDecoration: 'none' }}>
                Read on Substack →
              </a>
            )}
          </div>

          {/* Prev / Next */}
          {(prevArticle || nextArticle) && (
            <div
              className="article-nav-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                {prevArticle && (
                  <Link href={`/blog/${prevArticle.slug.current}`} style={{ textDecoration: 'none' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8a8499', display: 'block', marginBottom: '8px' }}>← Previous</span>
                    <span className="article-nav-link" style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '17px', color: '#e8e0d5', lineHeight: '1.35', display: 'block' }}>{prevArticle.title}</span>
                  </Link>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                {nextArticle && (
                  <Link href={`/blog/${nextArticle.slug.current}`} style={{ textDecoration: 'none' }}>
                    <span style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8a8499', display: 'block', marginBottom: '8px' }}>Next →</span>
                    <span className="article-nav-link" style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '17px', color: '#e8e0d5', lineHeight: '1.35', display: 'block' }}>{nextArticle.title}</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </footer>
    </article>
  )
}
