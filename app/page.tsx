'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { ARTICLES_QUERY, ABOUT_INTRO_QUERY } from '@/sanity/queries'
import { urlFor } from '@/src/sanity/lib/image'
import Header from './components/Header'

const C = {
  bg: '#121220',
  fg: '#EDE8DF',
  muted: '#9A9590',
  border: '#2E2928',
  accent: '#E84F6A',
  surface: '#1E1B1B',
}

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
  image?: any
  tags?: string[]
  readingTime?: number
}

const formatDate = (d: string) =>
  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(d))

// Colorise everything after the first " – " or ": " in coral
function SplitTitle({ title }: { title: string }) {
  const match = title.match(/^(.*?)(\s[–:]\s)(.+)$/)
  if (match) {
    return (
      <span>
        {match[1]}
        <span style={{ color: C.accent }}>{match[2]}{match[3]}</span>
      </span>
    )
  }
  const words = title.trim().split(' ')
  const last = words.pop()
  return (
    <span>
      {words.join(' ')}{' '}
      <span style={{ color: C.accent }}>{last}</span>
    </span>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
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

// ── Contact Modal ─────────────────────────────────────────────────────────────
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
      <div
        style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: C.surface, border: `1px solid ${C.border}`, borderRadius: '0px',
          padding: '32px', zIndex: 99, minWidth: '320px', maxWidth: '400px', width: 'calc(100% - 48px)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '22px', color: C.fg, margin: 0, fontOpticalSizing: 'none' as any, fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}>
            Get in touch
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.accent, fontSize: '18px', cursor: 'pointer', lineHeight: 1, padding: '4px' }}>
            ✕
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contacts.map(({ label, value, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="contact-row"
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', border: `1px solid ${C.border}`, borderRadius: '0px',
                textDecoration: 'none', color: C.fg,
              }}
            >
              <span style={{ color: C.muted, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <Icon />
              </span>
              <div>
                <div style={{ fontFamily: F.inter, fontWeight: 600, fontSize: '14px', color: C.fg }}>{label}</div>
                <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.muted, marginTop: '2px' }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [intro, setIntro] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    sanityFetch<Article[]>({ query: ARTICLES_QUERY })
      .then((data) => setArticles(data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
    sanityFetch<{ homepageIntro: any[] }>({ query: ABOUT_INTRO_QUERY })
      .then((data) => setIntro(data?.homepageIntro ?? null))
      .catch(console.error)
  }, [])

  const hero = articles[0] ?? null
  const rest = articles.slice(1, 6)

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100dvh', color: C.fg, fontFamily: F.inter, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        * { box-sizing: border-box; }
        @keyframes floatCyan {
          0%   { transform: translate(0%, 0%) scale(1.0); }
          50%  { transform: translate(28%, -22%) scale(1.1); }
          100% { transform: translate(0%, 0%) scale(1.0); }
        }
        @keyframes floatMagenta {
          0%   { transform: translate(0%, 0%) scale(1.0); }
          50%  { transform: translate(-26%, 18%) scale(1.15); }
          100% { transform: translate(0%, 0%) scale(1.0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb-cyan, .orb-magenta { animation: none !important; }
        }
        .site-nav-link:hover { color: ${C.accent} !important; }
        .contact-row:hover { background: rgba(255,255,255,0.04) !important; }
        .article-row { display: block; text-decoration: none; color: inherit; padding: 20px 0; border-bottom: 1px solid ${C.border}; }
        .article-row:hover .row-title { color: ${C.accent} !important; }
        .hero-cta:hover { text-decoration: underline !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 40px !important; line-height: 1.1 !important; }
          .hero-quote { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 32px !important; }
        }
      `}</style>

      {/* Atmospheric background — cyan orb */}
      <div
        className="orb-cyan"
        style={{
          position: 'fixed', top: '-15%', right: '0%',
          width: '50%', height: '60%',
          backgroundColor: '#1DA9EF',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'floatCyan 13s ease-in-out infinite',
        }}
      />
      {/* Atmospheric background — magenta orb */}
      <div
        className="orb-magenta"
        style={{
          position: 'fixed', bottom: '-10%', left: '-10%',
          width: '45%', height: '55%',
          backgroundColor: '#D858D6',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.10,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'floatMagenta 19s ease-in-out infinite',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <Header onContactOpen={() => setContactOpen(true)} />
        </div>

        {/* ── Intro ── */}
        {intro && (
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 40px 0' }}>
            <h2 style={{
              fontFamily: F.fraunces,
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              color: C.fg,
              maxWidth: '860px',
              fontOpticalSizing: 'none' as any,
              fontVariationSettings: "'opsz' 72, 'SOFT' 100",
            }}>
              <PortableText
                value={intro}
                components={{
                  block: {
                    normal: ({ children }) => <>{children}</>,
                  },
                }}
              />
            </h2>
          </section>
        )}

        {/* ── Hero ── */}
        {!loading && hero && (
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px 0' }}>
            {/* Category label */}
            {hero.tags && hero.tags[0] && (
              <div style={{
                fontFamily: F.fraunces,
                fontStyle: 'italic',
                fontSize: '14px',
                color: C.accent,
                marginBottom: '24px',
                letterSpacing: '0.2px',
              }}>
                {hero.tags[0]}
              </div>
            )}

            {/* Title + quote two-column */}
            <div
              className="hero-grid"
              style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '64px', alignItems: 'start', marginBottom: '56px' }}
            >
              <Link href={`/blog/${hero.slug.current}`} style={{ textDecoration: 'none' }}>
                <h3
                  className="hero-title"
                  style={{
                    fontFamily: F.fraunces,
                    fontWeight: 700,
                    fontSize: '56px',
                    lineHeight: '1.1',
                    letterSpacing: '-1px',
                    color: C.fg,
                    fontOpticalSizing: 'none' as any,
                    fontVariationSettings: "'opsz' 72, 'SOFT' 100",
                  }}
                >
                  <SplitTitle title={hero.title} />
                </h3>
              </Link>

              <div className="hero-quote" style={{ paddingTop: '12px' }}>
                {hero.excerpt && (
                  <p style={{
                    fontFamily: F.fraunces,
                    fontStyle: 'italic',
                    fontSize: '18px',
                    lineHeight: '1.7',
                    color: C.muted,
                  }}>
                    "{hero.excerpt.length > 160 ? hero.excerpt.slice(0, 160).trimEnd() + '…' : hero.excerpt}"
                  </p>
                )}
                {hero.readingTime && (
                  <div style={{ marginTop: '24px', fontFamily: F.mono, fontSize: '11px', color: C.muted }}>
                    {hero.readingTime} min read
                  </div>
                )}
                <Link
                  href={`/blog/${hero.slug.current}`}
                  className="hero-cta"
                  style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    fontFamily: F.inter,
                    fontWeight: 500,
                    fontSize: '13px',
                    color: C.accent,
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                  }}
                >
                  Read article →
                </Link>
              </div>
            </div>

            {/* Featured image */}
            {hero.image && (
              <div style={{ width: '100%', height: '480px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={urlFor(hero.image).width(1200).height(480).fit('crop').url()}
                  alt={hero.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to bottom, transparent 50%, ${C.bg} 100%)`,
                }} />
              </div>
            )}
          </section>
        )}

        {/* ── Loading hero placeholder ── */}
        {loading && (
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px 0' }}>
            <div style={{ fontFamily: F.mono, fontSize: '13px', color: C.muted }}>Loading…</div>
          </section>
        )}

        {/* ── Article list ── */}
        {!loading && rest.length > 0 && (
          <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px' }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              marginBottom: '8px',
              borderTop: `1px solid ${C.border}`,
              paddingTop: '32px',
            }}>
              <span style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: C.muted }}>
                More writing
              </span>
              <Link href="/blog" style={{ fontFamily: F.inter, fontSize: '13px', color: C.muted, textDecoration: 'none' }} className="site-nav-link">
                All articles →
              </Link>
            </div>

            <div>
              {rest.map((article) => (
                <Link key={article._id} href={`/blog/${article.slug.current}`} className="article-row">
                  <h3
                    className="row-title"
                    style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '20px', color: C.fg, lineHeight: '1.3', fontOpticalSizing: 'none' as any, fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}
                  >
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p style={{ fontFamily: F.inter, fontSize: '14px', lineHeight: '1.6', color: C.muted, marginTop: '6px' }}>
                      {article.excerpt.length > 120 ? article.excerpt.slice(0, 120).trimEnd() + '…' : article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ── */}
        <footer style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 48px', display: 'flex', gap: '24px', justifyContent: 'flex-end', borderTop: `1px solid ${C.border}`, paddingTop: '24px', marginTop: '0' }}>
          <Link href="/impressum" style={{ fontFamily: F.inter, fontSize: '12px', color: C.muted, textDecoration: 'none' }} className="site-nav-link">
            Legal Notice
          </Link>
          <Link href="/datenschutz" style={{ fontFamily: F.inter, fontSize: '12px', color: C.muted, textDecoration: 'none' }} className="site-nav-link">
            Privacy Policy
          </Link>
        </footer>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
