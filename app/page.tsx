'use client'

import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'

import {sanityFetch} from '@/sanity/client'
import {ARTICLES_QUERY} from '@/sanity/queries'
import {urlFor} from '@/src/sanity/lib/image'
import {TimeTheme, getThemeForHour, formatVirtualTime, getBlobAnimationDuration} from './timeThemes'

// ── Fonts ────────────────────────────────────────────────────────────────────
const F = {
  fraunces: "'Fraunces', serif",
  poppins: "'Poppins', sans-serif",
  jakarta: "'Plus Jakarta Sans', sans-serif",
}

// ── Spacing ──────────────────────────────────────────────────────────────────
const S = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  xxl: '64px',
}

const META = {
  name: 'malcolm bunge',
  tagline: 'Design & Build',
  intro: 'malcolmbunge_V1c_final_202603.com // Currently building this portfolio with Claude. Everything you see is real-time work.',
}

// Fast-forward: 1 real ms = PLAY_SPEED virtual minutes
const PLAY_SPEED = 1 // 60 virtual minutes per real second (1 tick/s = 1 min)

// ── Types ────────────────────────────────────────────────────────────────────
interface Article {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  image?: any
  tags?: string[]
  readingTime?: number
  author?: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (dateString: string): string =>
  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString))

const transition = (duration = '3s') =>
  `color ${duration} ease, background-color ${duration} ease, background ${duration} ease, border-color ${duration} ease, box-shadow ${duration} ease, opacity ${duration} ease`

// ── Reusable: Pill button ────────────────────────────────────────────────────
function PillButton({
  onClick,
  children,
  size = 'sm',
  disabled = false,
  theme,
  transitionDur,
}: {
  onClick?: () => void
  children: React.ReactNode
  size?: 'sm' | 'lg'
  disabled?: boolean
  theme: TimeTheme
  transitionDur: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="pressable"
      style={{
        backgroundColor: disabled
          ? theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
          : theme.glassPanel,
        color: disabled
          ? theme.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
          : theme.accent,
        border: `1px solid ${disabled ? theme.divider : theme.glassBorder}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: size === 'lg' ? '8px 20px' : '4px 16px',
        height: size === 'lg' ? '48px' : 'auto',
        borderRadius: '999px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: F.jakarta,
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        // colour-only transitions (transform handled by .pressable)
        transition: `color ${transitionDur} ease, background-color ${transitionDur} ease, border-color ${transitionDur} ease`,
      }}
    >
      {children}
    </button>
  )
}


// ── Icons ─────────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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


// ── Time Widget ───────────────────────────────────────────────────────────────
function TimeWidget({
  virtualMinutes,
  setVirtualMinutes,
  isPlaying,
  setIsPlaying,
  theme,
  transitionDur,
}: {
  virtualMinutes: number
  setVirtualMinutes: (m: number | ((prev: number) => number)) => void
  isPlaying: boolean
  setIsPlaying: (v: boolean) => void
  theme: TimeTheme
  transitionDur: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const timeStr = formatVirtualTime(virtualMinutes)
  const hour = (virtualMinutes / 60) % 24

  // Current theme for the hour shown
  const displayTheme = getThemeForHour(hour)

  return (
    <div ref={ref} style={{position: 'relative', flexShrink: 0}}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="pressable"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 14px',
          background: theme.glassPanel,
          border: `1px solid ${theme.glassBorder}`,
          borderRadius: '999px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          fontFamily: F.jakarta,
          fontWeight: 500,
          fontSize: '14px',
          color: theme.textBody,
          transition: `color ${transitionDur} ease, background ${transitionDur} ease, border-color ${transitionDur} ease`,
        }}
      >
        <span style={{fontSize: '14px', lineHeight: 1}}>⚙️</span>
        <span style={{letterSpacing: '0.5px'}}>{timeStr}</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="time-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '260px',
            background: theme.modalBg,
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            border: `1px solid ${theme.glassBorder}`,
            borderRadius: '16px',
            padding: '20px',
            zIndex: 90,
            boxShadow: theme.boxShadow,
            transition: transition(transitionDur),
          }}
        >
          {/* Phase label + time */}
          <div style={{marginBottom: '16px'}}>
            <div
              style={{
                fontFamily: F.jakarta,
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: theme.textMuted,
                marginBottom: '4px',
              }}
            >
              {displayTheme.icon} {displayTheme.label}
            </div>
            <div
              style={{
                fontFamily: F.fraunces,
                fontWeight: 700,
                fontSize: '32px',
                lineHeight: 1,
                color: theme.textBody,
                letterSpacing: '1px',
                transition: transition(transitionDur),
              }}
            >
              {timeStr}
            </div>
          </div>

          {/* Slider */}
          <div style={{marginBottom: '16px'}}>
            <style>{`
              .time-slider {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 4px;
                border-radius: 2px;
                outline: none;
                cursor: pointer;
              }
              .time-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #EA526F;
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0 1px 4px rgba(0,0,0,0.3);
              }
              .time-slider::-moz-range-thumb {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #EA526F;
                cursor: pointer;
                border: 2px solid white;
              }
            `}</style>
            <input
              type="range"
              min={0}
              max={1439}
              value={virtualMinutes}
              onChange={(e) => {
                setIsPlaying(false)
                setVirtualMinutes(Number(e.target.value))
              }}
              className="time-slider"
              style={{
                background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${(virtualMinutes / 1439) * 100}%, ${theme.divider} ${(virtualMinutes / 1439) * 100}%, ${theme.divider} 100%)`,
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '4px',
                fontFamily: F.jakarta,
                fontSize: '11px',
                color: theme.textMuted,
              }}
            >
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{display: 'flex', gap: '8px'}}>
            {/* Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="pressable"
              style={{
                flex: 1,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: isPlaying ? theme.accent : theme.glassPanel,
                color: isPlaying ? '#fff' : theme.accent,
                border: `1px solid ${isPlaying ? 'transparent' : theme.glassBorder}`,
                borderRadius: '8px',
                fontFamily: F.jakarta,
                fontWeight: 600,
                fontSize: '13px',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {isPlaying ? (
                <>
                  <span>⏸</span> Pause
                </>
              ) : (
                <>
                  <span>▶▶</span> Fast-forward
                </>
              )}
            </button>

            {/* Reset button */}
            <button
              onClick={() => {
                setIsPlaying(false)
                const now = new Date()
                setVirtualMinutes(now.getHours() * 60 + now.getMinutes())
              }}
              className="pressable"
              style={{
                flex: 1,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: theme.glassPanel,
                color: theme.accent,
                border: `1px solid ${theme.glassBorder}`,
                borderRadius: '8px',
                fontFamily: F.jakarta,
                fontWeight: 600,
                fontSize: '13px',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              <span>↻</span> Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Contact Modal ─────────────────────────────────────────────────────────────
function ContactModal({
  isOpen,
  onClose,
  theme,
  transitionDur,
}: {
  isOpen: boolean
  onClose: () => void
  theme: TimeTheme
  transitionDur: string
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const contacts = [
    {label: 'Email', value: 'hallo@malcolmbunge.de', href: 'mailto:hallo@malcolmbunge.de', icon: MailIcon},
    {label: 'LinkedIn', value: 'linkedin.com/in/malcolmbunge', href: 'https://linkedin.com/in/malcolmbunge', icon: LinkedInIcon},
    {label: 'Substack', value: 'mbunge.substack.com', href: 'https://mbunge.substack.com', icon: SubstackIcon},
  ]

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 98,
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: theme.modalBg,
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: `1px solid ${theme.glassBorder}`,
          borderRadius: '24px',
          padding: S.lg,
          maxWidth: '400px',
          width: 'calc(100% - 48px)',
          zIndex: 99,
          boxShadow: theme.boxShadow,
          transition: transition(transitionDur),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{marginBottom: S.lg}}>
          <h3
            style={{
              fontFamily: F.fraunces,
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '32px',
              color: theme.textBody,
              margin: '0 0 8px',
              transition: transition(transitionDur),
            }}
          >
            Get in Touch
          </h3>
          <p
            style={{
              fontFamily: F.jakarta,
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              color: theme.textMuted,
              margin: 0,
              transition: transition(transitionDur),
            }}
          >
            Reach out via any of these channels.
          </p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: S.lg}}>
          {contacts.map((contact) => {
            const Icon = contact.icon
            return (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: theme.glassPanel,
                  border: `1px solid ${theme.glassBorder}`,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{color: theme.accent, display: 'flex', alignItems: 'center'}}>
                  <Icon />
                </div>
                <div style={{flex: 1}}>
                  <p
                    style={{
                      fontFamily: F.jakarta,
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: theme.textBody,
                      margin: 0,
                      transition: transition(transitionDur),
                    }}
                  >
                    {contact.label}
                  </p>
                  <p
                    style={{
                      fontFamily: F.jakarta,
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: theme.textMuted,
                      margin: '2px 0 0',
                      transition: transition(transitionDur),
                    }}
                  >
                    {contact.value}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

        <button
          onClick={onClose}
          className="pressable"
          style={{
            width: '100%',
            padding: '8px 16px',
            background: theme.glassPanel,
            border: `1px solid ${theme.glassBorder}`,
            borderRadius: '8px',
            color: theme.textMuted,
            fontFamily: F.jakarta,
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          Close
        </button>
      </div>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)

  // ── Time state ─────────────────────────────────────────────────────────────
  const [virtualMinutes, setVirtualMinutes] = useState<number>(() => {
    const now = new Date()
    return now.getHours() * 60 + now.getMinutes()
  })
  const [isPlaying, setIsPlaying] = useState(false)

  // Fast-forward ticker
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setVirtualMinutes((m) => (m + PLAY_SPEED) % 1440)
    }, 1000 / 60)
    return () => clearInterval(id)
  }, [isPlaying])

  // Real-time clock tick (every minute, when not playing)
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

  useEffect(() => {
    sanityFetch<Article[]>({query: ARTICLES_QUERY})
      .then((data) => setArticles(data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        minHeight: '100dvh',
        width: '100%',
        fontFamily: F.jakarta,
        color: theme.textBody,
        transition: transition(transitionDur),
      }}
    >
      <style>{`
        * { box-sizing: border-box; }

        .article-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 28px;
          border-radius: 20px;
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid transparent;
          text-decoration: none;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
          cursor: pointer;
          will-change: transform;
        }
        .article-card:hover { transform: translateY(-3px); }
        .article-card:active { transform: scale(0.99); }

        /* ── Animated background blurs ── */
        .blurs-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          --blob-dur: 15s;
        }
        .blob { position: absolute; border-radius: 50%; }

        /* Duration driven by CSS custom property — each blob has its own multiplier via delay offset */
        .blob-1 { width: 640px; height: 640px; top: -15%; right: -5%;  filter: blur(90px);  animation: float-1 calc(var(--blob-dur) * 1.00) ease-in-out    0s infinite; }
        .blob-2 { width: 600px; height: 600px; bottom: -5%; left: -5%; filter: blur(90px);  animation: float-2 calc(var(--blob-dur) * 1.15) ease-in-out   -4s infinite; }
        .blob-3 { width: 480px; height: 480px; top: 28%; left: -8%;   filter: blur(80px);  animation: float-3 calc(var(--blob-dur) * 1.05) ease-in-out   -8s infinite; }
        .blob-4 { width: 440px; height: 440px; top: 42%; right: 4%;   filter: blur(80px);  animation: float-4 calc(var(--blob-dur) * 0.88) ease-in-out  -12s infinite; }
        .blob-5 { width: 320px; height: 320px; top: 12%; left: 32%;   filter: blur(70px);  animation: float-5 calc(var(--blob-dur) * 0.72) ease-in-out   -3s infinite; }
        .blob-6 { width: 280px; height: 280px; top: 62%; left: 52%;   filter: blur(65px);  animation: float-6 calc(var(--blob-dur) * 1.28) ease-in-out   -7s infinite; }
        .blob-7 { width: 780px; height: 780px; top: 22%; left: 18%;   filter: blur(130px); animation: float-7 calc(var(--blob-dur) * 1.45) ease-in-out  -14s infinite; }

        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          20%  { transform: translate(120px, -140px); }
          50%  { transform: translate(70px, 100px); }
          75%  { transform: translate(-110px, -50px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          25%  { transform: translate(-130px, 90px); }
          55%  { transform: translate(110px, 120px); }
          80%  { transform: translate(40px, -110px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          30%  { transform: translate(80px, 150px); }
          60%  { transform: translate(-110px, 70px); }
          80%  { transform: translate(130px, -130px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0); }
          25%  { transform: translate(150px, -90px); }
          50%  { transform: translate(-70px, 140px); }
          75%  { transform: translate(-130px, 40px); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translate(0, 0); }
          20%  { transform: translate(-60px, 110px); }
          45%  { transform: translate(90px, 40px); }
          70%  { transform: translate(-40px, -100px); }
          85%  { transform: translate(70px, 60px); }
        }
        @keyframes float-6 {
          0%, 100% { transform: translate(0, 0); }
          30%  { transform: translate(100px, 80px); }
          55%  { transform: translate(-90px, -90px); }
          80%  { transform: translate(60px, 130px); }
        }
        @keyframes float-7 {
          0%, 100% { transform: translate(0, 0); }
          25%  { transform: translate(160px, -90px); }
          50%  { transform: translate(-80px, 140px); }
          75%  { transform: translate(120px, 80px); }
        }

        .content-wrapper { position: relative; z-index: 1; }

        @media (max-width: 1023px) {
          .main-name { font-size: 48px !important; line-height: 52px !important; }
          .nav-intro { display: none !important; }
          .nav-bar { justify-content: flex-end !important; }
        }

        /* ── Press & hover animations ── */
        .pressable {
          transform: translateY(0) scale(1);
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.18s ease;
          will-change: transform;
          cursor: pointer;
        }
        .pressable:hover:not(:disabled) {
          transform: translateY(-2px) scale(1);
        }
        .pressable:active:not(:disabled) {
          transform: translateY(0) scale(0.96);
          transition: transform 0.08s ease-out;
          animation: press-glow 0.35s ease-out forwards;
        }
        .pressable:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }
        @keyframes press-glow {
          0%   { box-shadow: 0 0 0 0 rgba(234, 82, 111, 0.45); }
          40%  { box-shadow: 0 0 0 6px rgba(234, 82, 111, 0.2); }
          100% { box-shadow: 0 0 0 10px rgba(234, 82, 111, 0); }
        }

        /* ── Time widget panel entrance ── */
        .time-panel {
          animation: panelFadeIn 0.18s ease forwards;
        }
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        /* ── Contact card hover ── */
        .contact-card {
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                      background 0.15s ease;
        }
        .contact-card:hover {
          transform: translateY(-2px);
        }
        .contact-card:active {
          transform: scale(0.98);
          transition: transform 0.08s ease-out;
        }
      `}</style>

      {/* ── Animated blobs ── */}
      <div
        className="blurs-container"
        style={{'--blob-dur': `${getBlobAnimationDuration(virtualHour)}s`} as React.CSSProperties}
      >
        {(() => {
          const tr = `background ${transitionDur} ease, opacity ${transitionDur} ease`
          const o = theme.blobOpacity
          return (
            <>
              <div className="blob blob-1" style={{ background: `radial-gradient(circle, ${theme.blob1} 0%, transparent 70%)`, opacity: o,        transition: tr }} />
              <div className="blob blob-2" style={{ background: `radial-gradient(circle, ${theme.blob2} 0%, transparent 70%)`, opacity: o,        transition: tr }} />
              <div className="blob blob-3" style={{ background: `radial-gradient(circle, ${theme.blob3} 0%, transparent 65%)`, opacity: o * 0.70, transition: tr }} />
              <div className="blob blob-4" style={{ background: `radial-gradient(circle, ${theme.blob4} 0%, transparent 65%)`, opacity: o * 0.65, transition: tr }} />
              <div className="blob blob-5" style={{ background: `radial-gradient(circle, ${theme.blob1} 0%, transparent 70%)`, opacity: o * 0.55, transition: tr }} />
              <div className="blob blob-6" style={{ background: `radial-gradient(circle, ${theme.blob2} 0%, transparent 70%)`, opacity: o * 0.50, transition: tr }} />
              <div className="blob blob-7" style={{ background: `radial-gradient(circle, ${theme.blob3} 0%, transparent 60%)`, opacity: o * 0.30, transition: tr }} />
            </>
          )
        })()}
      </div>

      <div
        className="content-wrapper"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: `${S.xxl} ${S.lg}`,
          display: 'flex',
          flexDirection: 'column',
          gap: S.xxl,
        }}
      >
        {/* ── TOP SECTION ── */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 0}}>
          {/* Nav bar */}
          <div
            className="nav-bar"
            style={{display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: S.xs}}
          >
            <p
              className="nav-intro"
              style={{
                flex: 1,
                fontFamily: F.jakarta,
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                color: theme.textMuted,
                margin: 0,
                transition: transition(transitionDur),
              }}
            >
              {META.intro}
            </p>
            <TimeWidget
              virtualMinutes={virtualMinutes}
              setVirtualMinutes={setVirtualMinutes}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              theme={theme}
              transitionDur={transitionDur}
            />
            <PillButton onClick={() => setContactOpen(true)} theme={theme} transitionDur={transitionDur}>
              Contact
            </PillButton>
          </div>

          {/* Name + tagline */}
          <h1
            className="main-name"
            style={{
              fontFamily: F.fraunces,
              fontWeight: 700,
              fontSize: '64px',
              lineHeight: '64px',
              letterSpacing: '0.64px',
              color: theme.textBody,
              margin: '0 0 2px',
              textTransform: 'lowercase',
              transition: transition(transitionDur),
            }}
          >
            {META.name}
          </h1>
          <p
            style={{
              fontFamily: F.poppins,
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '19px',
              letterSpacing: '0.98px',
              textTransform: 'uppercase',
              color: theme.accent,
              margin: 0,
              transition: transition(transitionDur),
            }}
          >
            {META.tagline}
          </p>
        </div>

        {/* ── ARTICLES ── */}
        {loading ? (
          <div style={{ textAlign: 'center', color: theme.textMuted, padding: S.xxl, fontFamily: F.jakarta, transition: transition(transitionDur) }}>
            Loading...
          </div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', color: theme.textMuted, padding: S.xxl }}>
            No articles yet. Check back soon.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: S.md }}>
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/blog/${article.slug.current}`}
                className="article-card"
                style={{
                  background: theme.glassPanel,
                  borderColor: theme.glassBorder,
                  boxShadow: theme.boxShadow,
                  color: theme.textBody,
                  transition: `${transition(transitionDur)}, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease`,
                }}
              >
                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <time style={{ fontFamily: F.jakarta, fontSize: '13px', color: theme.textMuted, transition: transition(transitionDur) }}>
                    {formatDate(article.publishedAt)}
                  </time>
                  {article.readingTime && (
                    <span style={{ fontFamily: F.jakarta, fontSize: '13px', color: theme.textMuted, transition: transition(transitionDur) }}>
                      · {article.readingTime} min read
                    </span>
                  )}
                  {article.tags && article.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: '2px 10px', background: `${theme.accent}22`, border: `1px solid ${theme.accent}44`,
                      borderRadius: '999px', fontSize: '11px', fontFamily: F.jakarta, fontWeight: 600,
                      color: theme.accent, letterSpacing: '0.3px', transition: transition(transitionDur),
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: F.fraunces, fontWeight: 700, fontSize: '22px', lineHeight: '1.3',
                  color: theme.textBody, margin: 0, transition: transition(transitionDur),
                }}>
                  {article.title}
                </h2>

                {/* Featured image — full width, below title */}
                {article.image && (
                  <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img
                      src={urlFor(article.image).width(860).height(440).fit('crop').url()}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Excerpt */}
                {article.excerpt && (
                  <p style={{
                    fontFamily: F.jakarta, fontSize: '15px', lineHeight: '1.65',
                    color: theme.textMuted, margin: 0, transition: transition(transitionDur),
                  }}>
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        theme={theme}
        transitionDur={transitionDur}
      />
    </div>
  )
}
