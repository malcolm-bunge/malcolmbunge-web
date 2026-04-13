'use client'

import Link from 'next/link'

const F = {
  fraunces: "var(--nf-fraunces), serif",
  inter: "var(--nf-inter), sans-serif",
}

export default function Header({ onContactOpen }: { onContactOpen: () => void }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 0',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      gap: '16px',
    }}>
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span style={{
          fontFamily: F.fraunces,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '20px',
          color: '#e8e0d5',
          letterSpacing: '-0.2px',
        }}>
          malcolm bunge
        </span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link href="/about" style={{
          fontFamily: F.inter,
          fontWeight: 400,
          fontSize: '14px',
          color: '#8a8499',
          textDecoration: 'none',
        }} className="site-nav-link">
          About
        </Link>
        <Link href="/blog" style={{
          fontFamily: F.inter,
          fontWeight: 400,
          fontSize: '14px',
          color: '#8a8499',
          textDecoration: 'none',
        }} className="site-nav-link">
          Writing
        </Link>
        <button
          onClick={onContactOpen}
          style={{
            fontFamily: F.inter,
            fontWeight: 400,
            fontSize: '14px',
            color: '#8a8499',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          className="site-nav-link"
        >
          Contact
        </button>
      </nav>

      <style>{`
        .site-nav-link:hover { color: #e8e0d5 !important; }
      `}</style>
    </header>
  )
}
