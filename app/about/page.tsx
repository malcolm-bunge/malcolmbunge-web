'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/client'
import { ABOUT_PAGE_QUERY } from '@/sanity/queries'
import Header from '../components/Header'

const F = {
  fraunces: "'Fraunces', serif",
  inter: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

const superSoft = {
  fontOpticalSizing: 'none' as any,
  fontVariationSettings: "'opsz' 72, 'SOFT' 100",
}

interface AboutPageData {
  _id: string
  title: string
  bio: any[]
}

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
          <h2 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '22px', color: '#e8e0d5', margin: 0, ...superSoft }}>Get in touch</h2>
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

const bioComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ margin: '0 0 28px', fontSize: '18px', lineHeight: '1.85', color: '#c8c0b5', fontFamily: F.inter }}>
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: F.fraunces, fontSize: '28px', fontWeight: 700, margin: '56px 0 20px', color: '#e8e0d5', lineHeight: '1.25', ...superSoft }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: F.fraunces, fontSize: '22px', fontWeight: 700, margin: '40px 0 16px', color: '#e8e0d5', lineHeight: '1.3', ...superSoft }}>
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
}

export default function AboutPage() {
  const [data, setData] = useState<AboutPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    sanityFetch<AboutPageData>({ query: ABOUT_PAGE_QUERY })
      .then((d) => setData(d || null))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ backgroundColor: '#13131a', minHeight: '100dvh', color: '#e8e0d5', fontFamily: F.inter }}>
      <style>{`
        * { box-sizing: border-box; }
        .site-nav-link:hover { color: #e8e0d5 !important; }
        .contact-row:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <Header onContactOpen={() => setContactOpen(true)} />
      </div>

      {/* ── Page heading ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px 0' }}>
        <div style={{
          fontFamily: F.fraunces, fontStyle: 'italic', fontSize: '14px',
          color: '#ff6b81', marginBottom: '24px', letterSpacing: '0.2px',
        }}>
          About
        </div>
        <h1 style={{
          fontFamily: F.fraunces, fontWeight: 700, fontSize: '88px',
          lineHeight: '1.0', letterSpacing: '-2px', color: '#e8e0d5',
          maxWidth: '860px', marginBottom: '56px',
          ...superSoft,
        }}>
          malcolm <span style={{ color: '#ff6b81' }}>bunge</span>
        </h1>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
      </section>

      {/* ── Bio content ── */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 40px 80px' }}>
        {loading && (
          <div style={{ fontFamily: F.mono, fontSize: '13px', color: '#8a8499' }}>Loading…</div>
        )}
        {!loading && !data && (
          <div style={{ fontFamily: F.inter, fontSize: '15px', color: '#8a8499' }}>Content not found.</div>
        )}
        {!loading && data?.bio && (
          <PortableText value={data.bio} components={bioComponents} />
        )}

        {/* ── Social links ── */}
        {!loading && (
          <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8a8499', marginBottom: '16px' }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Email', value: 'hello@malcolmbunge.com', href: 'mailto:hello@malcolmbunge.com', icon: MailIcon },
                { label: 'LinkedIn', value: 'linkedin.com/in/malcolmbunge', href: 'https://linkedin.com/in/malcolmbunge', icon: LinkedInIcon },
                { label: 'Substack', value: 'mbunge.substack.com', href: 'https://mbunge.substack.com', icon: SubstackIcon },
              ].map(({ label, value, href, icon: Icon }) => (
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
        )}
      </section>

      <footer style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 48px', display: 'flex', gap: '24px', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
        <Link href="/impressum" style={{ fontFamily: F.inter, fontSize: '12px', color: '#8a8499', textDecoration: 'none' }} className="site-nav-link">Legal Notice</Link>
        <Link href="/datenschutz" style={{ fontFamily: F.inter, fontSize: '12px', color: '#8a8499', textDecoration: 'none' }} className="site-nav-link">Privacy Policy</Link>
      </footer>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
