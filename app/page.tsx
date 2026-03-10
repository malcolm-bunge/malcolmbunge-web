'use client'

import {useEffect, useState} from 'react'

import {sanityFetch} from '@/sanity/client'
import {
  SPRINT_STATUS_QUERY,
  RAW_LOG_QUERY,
} from '@/sanity/queries'

// Design tokens
const C = {
  background: '#1b1b34',
  yellow: '#fccb00',
  blue: '#1da9ef',
  blueFaded: 'rgba(29, 169, 239, 0.2)',
  textPrimary: '#e1d9cc',
  textDark: '#4d412d',
  divider: 'rgba(225, 217, 204, 0.12)',
}

const F = {
  fraunces: "'Fraunces', serif",
  poppins: "'Poppins', sans-serif",
  inter: "'Inter', sans-serif",
}

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
  intro: 'Currently building this portfolio with Claude. Everything you see is real-time work.',
}

interface SprintStatus {
  _id: string
  sprintName: string
  deadline: string
  technicalStatus: string
  strategicObjective: string
}

interface LogEntry {
  _id: string
  entryDate: string
  content: string
}

// Format date to UK English (e.g., "19 March 2026")
const formatDateUK = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00')
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export default function Home() {
  const [sprintStatus, setSprintStatus] = useState<SprintStatus | null>(null)
  const [logEntries, setLogEntries] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [sprint, logs] = await Promise.all([
          sanityFetch<SprintStatus>({query: SPRINT_STATUS_QUERY}),
          sanityFetch<LogEntry[]>({query: RAW_LOG_QUERY}),
        ])
        setSprintStatus(sprint)
        setLogEntries(logs || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div
      className="page-root"
      style={{
        backgroundColor: C.background,
        height: '100dvh',
        width: '100%',
        fontFamily: F.inter,
        color: C.textPrimary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 1023px) {
          .page-root {
            height: auto !important;
            min-height: 100dvh !important;
            overflow: auto !important;
          }
          .main-wrapper {
            height: auto !important;
          }
          .two-col-wrapper {
            flex-direction: column !important;
            flex: none !important;
          }
          .raw-log-scroll {
            overflow-y: visible !important;
            max-height: none !important;
            flex: none !important;
          }
          .live-feed-section,
          .raw-log-section {
            border-right: none !important;
            padding: ${S.md} !important;
          }
          .blog-teaser {
            margin-top: ${S.md} !important;
          }
          .nav-intro {
            display: none !important;
          }
          h1.main-name {
            font-size: 48px !important;
            line-height: 48px !important;
          }
        }
      `}</style>

      {/* Background blur glow */}
      <div
        style={{
          position: 'absolute',
          top: '-319px',
          left: '-574px',
          width: '2657px',
          height: '1691px',
          background:
            'radial-gradient(ellipse 55% 35% at 62% 28%, rgba(168,85,247,0.22) 0%, rgba(29,169,239,0.08) 45%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main wrapper */}
      <div
        className="main-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1512px',
          margin: '0 auto',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: `${S.lg} ${S.lg} 0`,
          boxSizing: 'border-box',
        }}
      >
        {/* ── NAV BAR ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
            paddingBottom: S.md,
          }}
        >
          <span
            className="nav-intro"
            style={{
              fontFamily: F.inter,
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              color: C.textPrimary,
              opacity: 0.7,
            }}
          >
            {META.intro}
          </span>
          <div style={{display: 'flex', gap: '10px', marginLeft: 'auto'}}>
            <button
              style={{
                backgroundColor: C.yellow,
                color: C.textDark,
                border: 'none',
                padding: '4px 8px',
                cursor: 'pointer',
                fontFamily: F.inter,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              About
            </button>
            <button
              style={{
                backgroundColor: C.yellow,
                color: C.textDark,
                border: 'none',
                padding: '4px 8px',
                cursor: 'pointer',
                fontFamily: F.inter,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              Contact
            </button>
          </div>
        </div>

        {/* ── HEADER ── */}
        <div
          style={{
            flexShrink: 0,
            paddingBottom: S.lg,
          }}
        >
          <h1
            className="main-name"
            style={{
              fontFamily: F.fraunces,
              fontWeight: 900,
              fontSize: '64px',
              lineHeight: '64px',
              color: C.yellow,
              margin: 0,
              textTransform: 'lowercase',
            }}
          >
            {META.name}
          </h1>
          <div
            style={{
              fontFamily: F.poppins,
              fontWeight: 800,
              fontSize: '13px',
              lineHeight: '20px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: C.textPrimary,
              opacity: 0.5,
              marginTop: '6px',
            }}
          >
            {META.tagline}
          </div>
        </div>

        {/* ── TWO COLUMNS ── */}
        {loading ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.yellow,
            }}
          >
            Loading...
          </div>
        ) : (
          <div
            className="two-col-wrapper"
            style={{
              flex: '1 1 0',
              minHeight: 0,
              display: 'flex',
              gap: '1px',
              borderTop: `1px solid ${C.divider}`,
            }}
          >
            {/* LEFT: The Live Feed */}
            <div
              className="live-feed-section"
              style={{
                flex: '1 0 0',
                minWidth: 0,
                padding: S.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: S.sm,
                borderRight: `1px solid ${C.divider}`,
                overflow: 'hidden',
              }}
            >
              <h2
                style={{
                  fontFamily: F.poppins,
                  fontWeight: 800,
                  fontSize: '24px',
                  lineHeight: '32px',
                  letterSpacing: '0.24px',
                  textTransform: 'uppercase',
                  color: C.yellow,
                  margin: 0,
                  flexShrink: 0,
                }}
              >
                The Live Feed
              </h2>

              {sprintStatus ? (
                <div
                  className="live-feed-box"
                  style={{
                    backgroundColor: C.blueFaded,
                    border: `1px solid ${C.blue}`,
                    padding: S.lg,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: S.sm,
                  }}
                >
                  {/* Current Focus + Deadline */}
                  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: S.sm,
                        fontFamily: F.inter,
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: C.yellow,
                      }}
                    >
                      <span>Current Focus</span>
                      <span>Deadline</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: S.sm,
                        fontFamily: F.poppins,
                        fontWeight: 800,
                        fontSize: '19px',
                        lineHeight: '16px',
                        letterSpacing: '0.19px',
                        textTransform: 'uppercase',
                        color: C.textPrimary,
                      }}
                    >
                      <span>Sprint {sprintStatus.sprintName}</span>
                      <span>{formatDateUK(sprintStatus.deadline)}</span>
                    </div>
                  </div>

                  {/* Technical Status */}
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span
                      style={{
                        fontFamily: F.inter,
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: C.blue,
                      }}
                    >
                      Technical Status
                    </span>
                    <p
                      style={{
                        fontFamily: F.inter,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '28px',
                        color: C.textPrimary,
                        margin: 0,
                      }}
                    >
                      {sprintStatus.technicalStatus}
                    </p>
                  </div>

                  {/* Strategic Objective */}
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span
                      style={{
                        fontFamily: F.inter,
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: C.blue,
                      }}
                    >
                      Strategic Objective
                    </span>
                    <p
                      style={{
                        fontFamily: F.inter,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '28px',
                        color: C.textPrimary,
                        margin: 0,
                      }}
                    >
                      {sprintStatus.strategicObjective}
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{color: C.blue}}>No sprint status available</p>
              )}
            </div>

            {/* RIGHT: The Raw Log */}
            <div
              className="raw-log-section"
              style={{
                flex: '1 0 0',
                minWidth: 0,
                padding: S.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: S.sm,
                overflow: 'hidden',
              }}
            >
              <h2
                style={{
                  fontFamily: F.poppins,
                  fontWeight: 800,
                  fontSize: '24px',
                  lineHeight: '32px',
                  letterSpacing: '0.24px',
                  textTransform: 'uppercase',
                  color: C.yellow,
                  margin: 0,
                  flexShrink: 0,
                }}
              >
                The Raw Log
              </h2>

              {/* Scrollable log entries */}
              <div
                className="raw-log-scroll"
                style={{
                  flex: '1 1 0',
                  minHeight: 0,
                  overflowY: 'auto',
                }}
              >
                {logEntries.length > 0 ? (
                  logEntries.map((entry) => (
                    <div
                      key={entry._id}
                      className="log-entry"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: S.sm,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: F.inter,
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '28px',
                          color: C.blue,
                        }}
                      >
                        {formatDateUK(entry.entryDate)}
                      </span>
                      <p
                        style={{
                          fontFamily: F.inter,
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '28px',
                          color: C.textPrimary,
                          margin: 0,
                        }}
                      >
                        {entry.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{color: C.blue}}>No log entries yet</p>
                )}
              </div>

              {/* View All Sprints button — pinned outside scroll */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: C.yellow,
                  color: C.textDark,
                  border: 'none',
                  padding: '8px 16px',
                  height: '48px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: F.poppins,
                  fontWeight: 800,
                  fontSize: '19px',
                  lineHeight: '16px',
                  letterSpacing: '0.19px',
                  textTransform: 'uppercase',
                  width: 'fit-content',
                  flexShrink: 0,
                }}
              >
                View All Sprints
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── BLOG TEASER STRIP ── */}
        <div
          className="blog-teaser"
          style={{
            flexShrink: 0,
            borderTop: `1px solid ${C.divider}`,
            padding: `${S.sm} 0`,
            display: 'flex',
            alignItems: 'center',
            gap: S.sm,
          }}
        >
          <span style={{color: C.yellow, fontSize: '16px', lineHeight: 1}}>✦</span>
          <span
            style={{
              fontFamily: F.inter,
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              color: C.textPrimary,
              opacity: 0.6,
            }}
          >
            Coming soon: Essays, articles, and thinking out loud.
          </span>
        </div>
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false)
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: S.lg,
          }}
        >
          <div
            style={{
              backgroundColor: C.background,
              border: `1px solid ${C.blue}`,
              padding: S.lg,
              maxWidth: '800px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: S.lg,
                right: S.lg,
                backgroundColor: 'transparent',
                border: 'none',
                color: C.yellow,
                fontSize: '32px',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            <h2
              style={{
                fontFamily: F.poppins,
                fontWeight: 800,
                fontSize: '24px',
                lineHeight: '32px',
                letterSpacing: '0.24px',
                textTransform: 'uppercase',
                color: C.yellow,
                marginTop: 0,
                marginBottom: S.lg,
                paddingRight: S.xxl,
              }}
            >
              All Previous Sprints
            </h2>
            <p
              style={{
                fontFamily: F.inter,
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '28px',
                color: C.textPrimary,
                margin: 0,
              }}
            >
              This is the archive of all previous sprints and milestones. The raw log shows recent history. More sprints will be documented as the project evolves.
            </p>
            <p
              style={{
                fontFamily: F.inter,
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: C.blue,
                marginTop: S.lg,
                marginBottom: 0,
              }}
            >
              Coming soon: Full sprint archive with detailed documentation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
