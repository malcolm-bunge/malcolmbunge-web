'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { ARTICLE_QUERY, ARTICLE_NAV_QUERY } from '@/sanity/queries'
import { urlFor } from '@/src/sanity/lib/image'
import { TimeTheme, getThemeForHour, formatVirtualTime, getBlobAnimationDuration } from '../../timeThemes'

// ── Fonts ─────────────────────────────────────────────────────────────────────
const F = {
  fraunces: "'Fraunces', serif",
  poppins:  "'Poppins', sans-serif",
  jakarta:  "'Plus Jakarta Sans', sans-serif",
}

const S = {
  xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '48px', xxl: '64px',
}

const PLAY_SPEED = 1

const versionStamp = () => {
  const d = new Date()
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`
}

const transition = (duration = '3s') =>
  `color ${duration} ease, background-color ${duration} ease, background ${duration} ease, border-color ${duration} ease, box-shadow ${duration} ease, opacity ${duration} ease`

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
  author?: string
}

// ── Icons ──────────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)
const SubstackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.539 8.242H1.46V5.406h21.079v2.836zM1.46 10.042v10.17h21.079v-10.17H1.46zm21.079-5.906V1.5H1.46v2.636h21.079z" />
  </svg>
)

// ── Pill Button ────────────────────────────────────────────────────────────────
function PillButton({ onClick, children, theme, transitionDur }: { onClick?: () => void; children: React.ReactNode; theme: TimeTheme; transitionDur: string }) {
  return (
    <button onClick={onClick} className="pressable" style={{
      backgroundColor: theme.glassPanel, color: theme.accent,
      border: `1px solid ${theme.glassBorder}`,
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      padding: '4px 16px', borderRadius: '999px',
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      fontFamily: F.jakarta, fontWeight: 500, fontSize: '16px', lineHeight: '24px',
      whiteSpace: 'nowrap', flexShrink: 0,
      transition: `color ${transitionDur} ease, background-color ${transitionDur} ease, border-color ${transitionDur} ease`,
    }}>
      {children}
    </button>
  )
}

// ── Time Widget ────────────────────────────────────────────────────────────────
function TimeWidget({ virtualMinutes, setVirtualMinutes, isPlaying, setIsPlaying, theme, transitionDur }: {
  virtualMinutes: number; setVirtualMinutes: (m: number | ((prev: number) => number)) => void
  isPlaying: boolean; setIsPlaying: (v: boolean) => void; theme: TimeTheme; transitionDur: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const timeStr = formatVirtualTime(virtualMinutes)
  const hour = (virtualMinutes / 60) % 24
  const displayTheme = getThemeForHour(hour)

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button onClick={() => setOpen((v) => !v)} className="pressable" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px',
        background: theme.glassPanel, border: `1px solid ${theme.glassBorder}`, borderRadius: '999px',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        fontFamily: F.jakarta, fontWeight: 500, fontSize: '14px', color: theme.textBody,
        transition: `color ${transitionDur} ease, background ${transitionDur} ease, border-color ${transitionDur} ease`,
      }}>
        <span style={{ fontSize: '14px', lineHeight: 1 }}>⚙️</span>
        <span style={{ letterSpacing: '0.5px' }}>{timeStr}</span>
      </button>
      {open && (
        <div className="time-panel" style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '260px',
          background: theme.modalBg, backdropFilter: 'blur(32px) saturate(180%)', WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: `1px solid ${theme.glassBorder}`, borderRadius: '16px', padding: '20px', zIndex: 90, boxShadow: theme.boxShadow,
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: F.jakarta, fontWeight: 600, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: theme.textMuted, marginBottom: '4px' }}>
              {displayTheme.icon} {displayTheme.label}
            </div>
            <div style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '32px', color: theme.textBody, lineHeight: 1 }}>{timeStr}</div>
          </div>
          <input type="range" min={0} max={1439} value={virtualMinutes}
            onChange={(e) => { setIsPlaying(false); setVirtualMinutes(Number(e.target.value)) }}
            style={{ width: '100%', marginBottom: '12px', accentColor: theme.accent }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsPlaying(!isPlaying)} className="pressable" style={{
              flex: 1, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: isPlaying ? theme.accent : theme.glassPanel, color: isPlaying ? '#fff' : theme.accent,
              border: `1px solid ${isPlaying ? 'transparent' : theme.glassBorder}`,
              borderRadius: '8px', fontFamily: F.jakarta, fontWeight: 600, fontSize: '13px', transition: 'background 0.2s, color 0.2s',
            }}>
              {isPlaying ? <><span>⏸</span> Pause</> : <><span>▶▶</span> Fast-forward</>}
            </button>
            <button onClick={() => { setIsPlaying(false); const now = new Date(); setVirtualMinutes(now.getHours() * 60 + now.getMinutes()) }} className="pressable" style={{
              flex: 1, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              background: theme.glassPanel, color: theme.accent, border: `1px solid ${theme.glassBorder}`,
              borderRadius: '8px', fontFamily: F.jakarta, fontWeight: 600, fontSize: '13px', transition: 'background 0.2s, color 0.2s',
            }}>
              <span>↻</span> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Contact Modal ──────────────────────────────────────────────────────────────
function ContactModal({ isOpen, onClose, theme, transitionDur }: { isOpen: boolean; onClose: () => void; theme: TimeTheme; transitionDur: string }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) { document.addEventListener('keydown', handleEscape); return () => document.removeEventListener('keydown', handleEscape) }
  }, [isOpen, onClose])
  if (!isOpen) return null
  const contacts = [
    { label: 'Email', value: 'hello@malcolmbunge.com', href: 'mailto:hello@malcolmbunge.com', icon: MailIcon },
    { label: 'LinkedIn', value: 'linkedin.com/in/malcolmbunge', href: 'https://linkedin.com/in/malcolmbunge', icon: LinkedInIcon },
    { label: 'Substack', value: 'mbunge.substack.com', href: 'https://mbunge.substack.com', icon: SubstackIcon },
  ]
  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 98 }} onClick={onClose} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        background: theme.modalBg, backdropFilter: 'blur(32px) saturate(180%)', WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: `1px solid ${theme.glassBorder}`, borderRadius: '24px', padding: S.lg, zIndex: 99,
        minWidth: '320px', maxWidth: '440px', width: '90vw', boxShadow: theme.boxShadow, transition: transition(transitionDur),
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: S.md }}>
          <h2 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '24px', color: theme.textBody, margin: 0 }}>Get in touch</h2>
          <button onClick={onClose} className="pressable" style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: '20px', cursor: 'pointer', padding: '4px', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.sm }}>
          {contacts.map(({ label, value, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-card"
              style={{ display: 'flex', alignItems: 'center', gap: S.sm, padding: S.sm, background: theme.glassPanel, border: `1px solid ${theme.glassBorder}`, borderRadius: '12px', textDecoration: 'none', color: theme.textBody }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: theme.glassBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accent, flexShrink: 0 }}>
                <Icon />
              </div>
              <div>
                <div style={{ fontFamily: F.jakarta, fontWeight: 600, fontSize: '14px', color: theme.accent }}>{label}</div>
                <div style={{ fontFamily: F.jakarta, fontSize: '13px', color: theme.textMuted }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')
  const [prevArticle, setPrevArticle] = useState<{ _id: string; title: string; slug: { current: string }; image?: any } | null>(null)
  const [nextArticle, setNextArticle] = useState<{ _id: string; title: string; slug: { current: string }; image?: any } | null>(null)
  const [virtualMinutes, setVirtualMinutes] = useState(() => {
    const now = new Date()
    return now.getHours() * 60 + now.getMinutes()
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    params.then((p) => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    sanityFetch<Article>({ query: ARTICLE_QUERY, params: { slug } })
      .then((data) => {
        setArticle(data || null)
        if (data?.publishedAt) {
          sanityFetch<{ prev: any; next: any }>({
            query: ARTICLE_NAV_QUERY,
            params: { publishedAt: data.publishedAt },
          }).then(({ prev, next }) => {
            setPrevArticle(prev || null)
            setNextArticle(next || null)
          }).catch(console.error)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => setVirtualMinutes((m) => (m + PLAY_SPEED) % 1440), 1000 / 60)
    return () => clearInterval(id)
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying) return
    const id = setInterval(() => {
      const now = new Date()
      setVirtualMinutes(now.getHours() * 60 + now.getMinutes())
    }, 60_000)
    return () => clearInterval(id)
  }, [isPlaying])

  const virtualHour = virtualMinutes / 60
  const theme = getThemeForHour(virtualHour)
  const transitionDur = isPlaying ? '0.2s' : '3s'

  const formatDate = (dateString: string): string =>
    new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString))

  // ── Portable Text components — theme-aware for WCAG AA contrast ───────────
  const portableTextComponents = {
    block: {
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 style={{ fontFamily: F.fraunces, fontSize: '26px', fontWeight: 700, margin: '48px 0 20px', color: theme.textBody, lineHeight: '1.3', transition: transition(transitionDur) }}>
          {children}
        </h2>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <h3 style={{ fontFamily: F.fraunces, fontSize: '20px', fontWeight: 700, margin: '36px 0 16px', color: theme.textBody, lineHeight: '1.3', transition: transition(transitionDur) }}>
          {children}
        </h3>
      ),
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote style={{
          margin: '32px 0', padding: '20px 24px',
          background: theme.glassPanel,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          borderTop: `1px solid ${theme.glassBorder}`, borderRight: `1px solid ${theme.glassBorder}`, borderBottom: `1px solid ${theme.glassBorder}`, borderLeft: `4px solid ${theme.accent}`,
          borderRadius: '4px', fontSize: '18px', fontStyle: 'italic',
          color: theme.textBody, lineHeight: '1.8', transition: transition(transitionDur),
        }}>
          {children}
        </blockquote>
      ),
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p style={{ margin: '0 0 24px', fontSize: '18px', lineHeight: '1.85', color: theme.textBody, fontFamily: F.jakarta, transition: transition(transitionDur) }}>
          {children}
        </p>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong style={{ fontWeight: 700, color: theme.textBody }}>{children}</strong>
      ),
      em: ({ children }: { children?: React.ReactNode }) => (
        <em style={{ fontStyle: 'italic', color: theme.textBody }}>{children}</em>
      ),
      link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer"
          style={{ color: theme.accent, textDecoration: 'underline', textDecorationColor: `${theme.accent}66`, fontWeight: 500 }}>
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
        <figure style={{ margin: '48px 0' }}>
          <img src={urlFor(value).width(960).url()} alt={value.alt || ''}
            style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', marginBottom: value.caption ? '12px' : '0' }} />
          {value.caption && (
            <figcaption style={{ fontFamily: F.jakarta, fontSize: '14px', color: theme.textMuted, textAlign: 'center', fontStyle: 'italic', transition: transition(transitionDur) }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),
    },
    list: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul style={{ margin: '0 0 24px', paddingLeft: '28px', color: theme.textBody, fontSize: '18px', lineHeight: '1.85', fontFamily: F.jakarta, transition: transition(transitionDur) }}>
          {children}
        </ul>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol style={{ margin: '0 0 24px', paddingLeft: '28px', color: theme.textBody, fontSize: '18px', lineHeight: '1.85', fontFamily: F.jakarta, transition: transition(transitionDur) }}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children?: React.ReactNode }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
      number: ({ children }: { children?: React.ReactNode }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
    },
  }

  // ── Shared page shell (blobs + nav) ───────────────────────────────────────
  const shell = (content: React.ReactNode) => (
    <div style={{ backgroundColor: theme.bgColor, minHeight: '100dvh', width: '100%', fontFamily: F.jakarta, color: theme.textBody, transition: transition(transitionDur) }}>
      <style>{`
        * { box-sizing: border-box; }
        .blurs-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; overflow: hidden; --blob-dur: 15s; }
        .blob { position: absolute; border-radius: 50%; }
        .blob-1 { width: 640px; height: 640px; top: -15%; right: -5%;  filter: blur(90px);  animation: float-1 calc(var(--blob-dur) * 1.00) ease-in-out    0s infinite; }
        .blob-2 { width: 600px; height: 600px; bottom: -5%; left: -5%; filter: blur(90px);  animation: float-2 calc(var(--blob-dur) * 1.15) ease-in-out   -4s infinite; }
        .blob-3 { width: 480px; height: 480px; top: 28%; left: -8%;   filter: blur(80px);  animation: float-3 calc(var(--blob-dur) * 1.05) ease-in-out   -8s infinite; }
        .blob-4 { width: 440px; height: 440px; top: 42%; right: 4%;   filter: blur(80px);  animation: float-4 calc(var(--blob-dur) * 0.88) ease-in-out  -12s infinite; }
        .blob-5 { width: 320px; height: 320px; top: 12%; left: 32%;   filter: blur(70px);  animation: float-5 calc(var(--blob-dur) * 0.72) ease-in-out   -3s infinite; }
        .blob-6 { width: 280px; height: 280px; top: 62%; left: 52%;   filter: blur(65px);  animation: float-6 calc(var(--blob-dur) * 1.28) ease-in-out   -7s infinite; }
        .blob-7 { width: 780px; height: 780px; top: 22%; left: 18%;   filter: blur(130px); animation: float-7 calc(var(--blob-dur) * 1.45) ease-in-out  -14s infinite; }
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(120px, -140px); } 50% { transform: translate(70px, 100px); } 75% { transform: translate(-110px, -50px); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(-130px, 90px); } 55% { transform: translate(110px, 120px); } 80% { transform: translate(40px, -110px); } }
        @keyframes float-3 { 0%, 100% { transform: translate(0, 0); } 30% { transform: translate(80px, 150px); } 60% { transform: translate(-110px, 70px); } 80% { transform: translate(130px, -130px); } }
        @keyframes float-4 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(150px, -90px); } 50% { transform: translate(-70px, 140px); } 75% { transform: translate(-130px, 40px); } }
        @keyframes float-5 { 0%, 100% { transform: translate(0, 0); } 20% { transform: translate(-60px, 110px); } 45% { transform: translate(90px, 40px); } 70% { transform: translate(-40px, -100px); } 85% { transform: translate(70px, 60px); } }
        @keyframes float-6 { 0%, 100% { transform: translate(0, 0); } 30% { transform: translate(100px, 80px); } 55% { transform: translate(-90px, -90px); } 80% { transform: translate(60px, 130px); } }
        @keyframes float-7 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(160px, -90px); } 50% { transform: translate(-80px, 140px); } 75% { transform: translate(120px, 80px); } }
        .content-wrapper { position: relative; z-index: 1; }
        .pressable { transform: translateY(0) scale(1); transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease; will-change: transform; cursor: pointer; }
        .pressable:hover:not(:disabled) { transform: translateY(-2px) scale(1); }
        .pressable:active:not(:disabled) { transform: translateY(0) scale(0.96); transition: transform 0.08s ease-out; }
        .time-panel { animation: panelFadeIn 0.18s ease forwards; }
        @keyframes panelFadeIn { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .contact-card { transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.15s ease; }
        .contact-card:hover { transform: translateY(-2px); }
        .contact-card:active { transform: scale(0.98); transition: transform 0.08s ease-out; }
        @keyframes heroZoomPan {
          0% { transform: scale(1.05) translate(0%, 0%); }
          50% { transform: scale(1.12) translate(-1.5%, -1%); }
          100% { transform: scale(1.05) translate(0%, 0%); }
        }
        @media (max-width: 1023px) {
          .nav-bar { justify-content: flex-end !important; }
          .article-title { font-size: 36px !important; }
          .breadcrumb-article { display: none !important; }
        }
      `}</style>

      {/* Blobs */}
      <div className="blurs-container" style={{ '--blob-dur': `${getBlobAnimationDuration(virtualHour)}s` } as React.CSSProperties}>
        {(() => {
          const tr = `background ${transitionDur} ease, opacity ${transitionDur} ease`
          const o = theme.blobOpacity
          return (
            <>
              <div className="blob blob-1" style={{ background: `radial-gradient(circle, ${theme.blob1} 0%, transparent 70%)`, opacity: o, transition: tr }} />
              <div className="blob blob-2" style={{ background: `radial-gradient(circle, ${theme.blob2} 0%, transparent 70%)`, opacity: o, transition: tr }} />
              <div className="blob blob-3" style={{ background: `radial-gradient(circle, ${theme.blob3} 0%, transparent 65%)`, opacity: o * 0.70, transition: tr }} />
              <div className="blob blob-4" style={{ background: `radial-gradient(circle, ${theme.blob4} 0%, transparent 65%)`, opacity: o * 0.65, transition: tr }} />
              <div className="blob blob-5" style={{ background: `radial-gradient(circle, ${theme.blob1} 0%, transparent 70%)`, opacity: o * 0.55, transition: tr }} />
              <div className="blob blob-6" style={{ background: `radial-gradient(circle, ${theme.blob2} 0%, transparent 70%)`, opacity: o * 0.50, transition: tr }} />
              <div className="blob blob-7" style={{ background: `radial-gradient(circle, ${theme.blob3} 0%, transparent 60%)`, opacity: o * 0.30, transition: tr }} />
            </>
          )
        })()}
      </div>

      <div className="content-wrapper">
        {/* Nav */}
        <div style={{ maxWidth: '1512px', margin: '0 auto', padding: `${S.xxl} ${S.lg} 0` }}>
          <div className="nav-bar" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: S.xs }}>
            <p className="nav-intro" style={{ flex: 1, fontFamily: F.jakarta, fontWeight: 500, fontSize: '14px', color: theme.textMuted, margin: 0, transition: transition(transitionDur) }}>
              {`malcolmbunge_V1c_final_${versionStamp()}.com // Writing on AI, design, and the people in between.`}
            </p>
            <TimeWidget virtualMinutes={virtualMinutes} setVirtualMinutes={setVirtualMinutes} isPlaying={isPlaying} setIsPlaying={setIsPlaying} theme={theme} transitionDur={transitionDur} />
            <PillButton onClick={() => setContactOpen(true)} theme={theme} transitionDur={transitionDur}>Contact</PillButton>
          </div>

          {/* Name + tagline — logo links home */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 className="main-name" style={{
              fontFamily: F.fraunces, fontWeight: 700, fontSize: '64px', lineHeight: '64px', letterSpacing: '0.64px',
              color: theme.textBody, margin: '0 0 2px', textTransform: 'lowercase', transition: transition(transitionDur),
            }}>
              malcolm bunge
            </h1>
          </Link>
          <p style={{
            fontFamily: F.poppins, fontWeight: 600, fontSize: '14px', lineHeight: '19px', letterSpacing: '0.98px',
            textTransform: 'uppercase', color: theme.accent, margin: 0, transition: transition(transitionDur),
          }}>
            Design &amp; Build
          </p>
        </div>

        {content}
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} theme={theme} transitionDur={transitionDur} />
    </div>
  )

  if (loading) return shell(
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: theme.textMuted, fontFamily: F.jakarta, transition: transition(transitionDur) }}>
      Loading...
    </div>
  )

  if (!article) return shell(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
      <p style={{ fontFamily: F.fraunces, fontSize: '24px', color: theme.textBody }}>Article not found.</p>
      <Link href="/blog" style={{ color: theme.accent, textDecoration: 'none', fontFamily: F.jakarta, fontWeight: 600 }}>← Back to articles</Link>
    </div>
  )

  return shell(
    <>
      {/* Hero image */}
      {article.image && (
        <div style={{ width: '100%', height: '420px', overflow: 'hidden', position: 'relative', marginTop: S.lg }}>
          <img
            src={urlFor(article.image).width(1400).height(600).fit('crop').url()}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', animation: 'heroZoomPan 20s ease-in-out infinite', willChange: 'transform' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${theme.bgColor}cc 0%, ${theme.blob1}66 50%, ${theme.blob2}44 100%)`, mixBlendMode: 'multiply' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${theme.bgColor} 0%, transparent 45%)` }} />
        </div>
      )}

      {/* Article */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: `${S.xxl} ${S.lg} ${S.xxl}` }}>

        {/* Breadcrumb — below hero, above title */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: F.jakarta, fontWeight: 500, fontSize: '14px', color: theme.textMuted, marginBottom: S.lg, transition: transition(transitionDur) }}>
          <Link href="/" style={{ color: theme.textMuted, textDecoration: 'none', transition: `color ${transitionDur} ease` }}
            onMouseEnter={e => (e.currentTarget.style.color = theme.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = theme.textMuted)}>
            malcolm bunge
          </Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <Link href="/blog" style={{ color: theme.textMuted, textDecoration: 'none', transition: `color ${transitionDur} ease` }}
            onMouseEnter={e => (e.currentTarget.style.color = theme.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = theme.textMuted)}>
            writing
          </Link>
          <span className="breadcrumb-article" style={{ opacity: 0.4 }}>/</span>
          <span className="breadcrumb-article" style={{ color: theme.textBody, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: `color ${transitionDur} ease` }}>
            {article.title}
          </span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: S.xl }}>
          <h1 className="article-title" style={{
            fontFamily: F.fraunces, fontWeight: 700, fontSize: '48px', lineHeight: '1.2',
            color: theme.textBody, margin: `0 0 ${S.md}`, transition: transition(transitionDur),
          }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <time style={{ fontFamily: F.jakarta, fontSize: '14px', color: theme.textMuted, transition: transition(transitionDur) }}>
              {formatDate(article.publishedAt)}
            </time>
            {article.readingTime && (
              <span style={{ fontFamily: F.jakarta, fontSize: '14px', color: theme.textMuted, transition: transition(transitionDur) }}>
                · {article.readingTime} min read
              </span>
            )}
            {article.author && (
              <span style={{ fontFamily: F.jakarta, fontSize: '14px', color: theme.textMuted, transition: transition(transitionDur) }}>
                · By {article.author}
              </span>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {article.tags.map((tag) => (
                <span key={tag} style={{
                  padding: '3px 12px',
                  background: `${theme.accent}22`,
                  border: `1px solid ${theme.accent}44`,
                  borderRadius: '999px', fontSize: '12px', fontFamily: F.jakarta,
                  fontWeight: 600, color: theme.accent, letterSpacing: '0.3px',
                  transition: transition(transitionDur),
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Body */}
        <div style={{ marginBottom: S.xl }}>
          {article.content && <PortableText value={article.content} components={portableTextComponents} />}
        </div>

        {/* Footer */}
        <footer style={{ paddingTop: S.lg, borderTop: `1px solid ${theme.divider}`, display: 'flex', flexDirection: 'column', gap: S.lg, transition: transition(transitionDur) }}>

          {/* Share */}
          {(() => {
            const url = `https://malcolmbunge.com/blog/${article.slug.current}`
            const text = encodeURIComponent(article.title)
            const enc = encodeURIComponent(url)
            const shareLinks = [
              { label: 'LinkedIn',  href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}` },
              { label: 'Facebook',  href: `https://www.facebook.com/sharer/sharer.php?u=${enc}` },
              { label: 'Threads',   href: `https://www.threads.net/intent/post?text=${text}%20${enc}` },
              { label: 'Bluesky',   href: `https://bsky.app/intent/compose?text=${text}%20${enc}` },
              { label: 'E-Mail',    href: `mailto:?subject=${text}&body=${enc}` },
            ]
            return (
              <div>
                <p style={{ fontFamily: F.jakarta, fontWeight: 600, fontSize: '13px', letterSpacing: '0.8px', textTransform: 'uppercase', color: theme.textMuted, margin: '0 0 12px', transition: transition(transitionDur) }}>
                  Share this article
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {shareLinks.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pressable"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '6px 16px', background: theme.glassPanel, color: theme.accent,
                        border: `1px solid ${theme.glassBorder}`, borderRadius: '999px',
                        fontFamily: F.jakarta, fontWeight: 600, fontSize: '13px',
                        textDecoration: 'none', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                        transition: `${transition(transitionDur)}, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                      }}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Back + Substack — back left, substack right */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: S.md, flexWrap: 'wrap' }}>
            <Link href="/blog" style={{ color: theme.accent, textDecoration: 'none', fontFamily: F.jakarta, fontWeight: 600, fontSize: '14px', transition: transition(transitionDur) }}>
              ← Back to all articles
            </Link>
            {article.originalUrl && (
              <a href={article.originalUrl} target="_blank" rel="noopener noreferrer" className="pressable"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', background: theme.glassPanel, color: theme.accent,
                  border: `1px solid ${theme.glassBorder}`, borderRadius: '999px',
                  fontFamily: F.jakarta, fontWeight: 600, fontSize: '14px',
                  textDecoration: 'none', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                  transition: `${transition(transitionDur)}, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                }}>
                Read on Substack →
              </a>
            )}
          </div>

          {/* Prev / Next navigation */}
          {(prevArticle || nextArticle) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: S.md, paddingTop: S.lg, borderTop: `1px solid ${theme.divider}`, transition: transition(transitionDur) }}>
              {/* Previous (older) — left */}
              <div>
                {prevArticle ? (
                  <Link href={`/blog/${prevArticle.slug.current}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span style={{ fontFamily: F.jakarta, fontWeight: 600, fontSize: '11px', letterSpacing: '0.8px', textTransform: 'uppercase', color: theme.textMuted, transition: transition(transitionDur) }}>
                      ← Previous
                    </span>
                    {prevArticle.image && (
                      <div style={{ width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden' }}>
                        <img src={urlFor(prevArticle.image).width(400).height(240).fit('crop').url()} alt={prevArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <span style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '16px', lineHeight: '1.3', color: theme.accent, transition: transition(transitionDur) }}>
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
              {/* Next (newer) — right */}
              <div>
                {nextArticle ? (
                  <Link href={`/blog/${nextArticle.slug.current}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <span style={{ fontFamily: F.jakarta, fontWeight: 600, fontSize: '11px', letterSpacing: '0.8px', textTransform: 'uppercase', color: theme.textMuted, transition: transition(transitionDur) }}>
                      Next →
                    </span>
                    {nextArticle.image && (
                      <div style={{ width: '100%', height: '120px', borderRadius: '10px', overflow: 'hidden' }}>
                        <img src={urlFor(nextArticle.image).width(400).height(240).fit('crop').url()} alt={nextArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <span style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '16px', lineHeight: '1.3', color: theme.accent, textAlign: 'right', transition: transition(transitionDur) }}>
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            </div>
          )}
        </footer>

        {/* ── Legal footer ── */}
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: `${S.xl} ${S.lg}`, display: 'flex', gap: S.md, justifyContent: 'flex-end' }}>
          <Link href="/impressum" style={{ fontFamily: F.jakarta, fontSize: '13px', color: theme.textMuted, textDecoration: 'none', transition: transition(transitionDur) }}>Impressum</Link>
          <Link href="/datenschutz" style={{ fontFamily: F.jakarta, fontSize: '13px', color: theme.textMuted, textDecoration: 'none', transition: transition(transitionDur) }}>Datenschutz</Link>
        </div>
      </article>
    </>
  )
}
