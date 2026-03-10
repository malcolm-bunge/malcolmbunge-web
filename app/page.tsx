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
}

const F = {
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

// Meta data (static, can be moved to Sanity later)
const META = {
  name: 'Malcolm Bunge',
  tagline: [
    'Humane Systems Architecture',
    'Operational Design',
    'Functional Build',
  ],
  systemStatus: 'System_Active // 0326_V1.MB',
  bio: 'I started building digital products and designing experiences before the dotcom bubble burst the first time. My focus ever since has been aligning human needs with business goals while keeping a constant eye on technical feasibility. In the age of AI, I believe it is more important than ever that we understand which problem we are actually solving without falling victim to the hype. I design the blueprints and then build the machinery myself to ensure the strategy survives the contact with reality. Strategy is a hypothesis: building is the proof.',
}

interface SprintStatus {
  _id: string
  sprintNumber: string
  deadline: string
  technicalStatus: string
  strategicObjective: string
  dateUpdated: string
}

interface LogEntry {
  _id: string
  date: string
  content: string
}

// Format date to UK English (e.g., "19 March 2026")
const formatDateUK = (dateString: string): string => {
  const date = new Date(dateString)
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
      style={{
        backgroundColor: C.background,
        minHeight: '100vh',
        width: '100%',
        fontFamily: F.inter,
        color: C.textPrimary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1512px',
          margin: '0 auto',
          paddingTop: S.xxl,
          display: 'flex',
          flexDirection: 'column',
          gap: S.lg,
        }}
      >
        {/* ── NAV BAR ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: S.lg,
            paddingRight: S.lg,
          }}
        >
          <span
            style={{
              fontFamily: F.inter,
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '28px',
              color: C.textPrimary,
            }}
          >
            {META.systemStatus}
          </span>
          <div style={{display: 'flex', gap: '10px'}}>
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
            paddingLeft: S.lg,
            paddingRight: S.lg,
            display: 'flex',
            flexDirection: 'column',
            gap: S.lg,
          }}
        >
          {/* Name + Tagline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '3px',
              flexWrap: 'nowrap',
            }}
          >
            <h1
              style={{
                fontFamily: F.poppins,
                fontWeight: 900,
                fontSize: '64px',
                lineHeight: '64px',
                letterSpacing: '0.64px',
                textTransform: 'uppercase',
                color: C.yellow,
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {META.name}
            </h1>
            <div
              style={{
                fontFamily: F.poppins,
                fontWeight: 800,
                fontSize: '19px',
                lineHeight: '16px',
                letterSpacing: '0.19px',
                textTransform: 'uppercase',
                color: C.yellow,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                paddingTop: '10px',
              }}
            >
              {META.tagline.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <p
            style={{
              fontFamily: F.inter,
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '28px',
              color: C.textPrimary,
              margin: 0,
            }}
          >
            {META.bio}
          </p>
        </div>

        {/* ── TWO COLUMNS ── */}
        {loading ? (
          <div
            style={{
              padding: S.lg,
              color: C.yellow,
              textAlign: 'center',
            }}
          >
            Loading...
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1px',
              alignItems: 'stretch',
            }}
          >
            {/* LEFT: The Live Feed */}
            <div
              style={{
                flex: '1 0 0',
                minWidth: 0,
                padding: S.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: S.sm,
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
                }}
              >
                The Live Feed
              </h2>

              {sprintStatus ? (
                <div
                  style={{
                    backgroundColor: C.blueFaded,
                    border: `1px solid ${C.blue}`,
                    padding: S.lg,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: S.sm,
                  }}
                >
                  {/* Current Focus + Deadline labels */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
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
                      <span>{sprintStatus.sprintNumber}</span>
                      <span>{formatDateUK(sprintStatus.deadline)}</span>
                    </div>
                  </div>

                  {/* Technical Status */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
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
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
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
              style={{
                flex: '1 0 0',
                minWidth: 0,
                padding: S.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: S.sm,
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
                }}
              >
                The Raw Log
              </h2>

              {/* Log entries */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {logEntries.length > 0 ? (
                  logEntries.map((entry) => (
                    <div
                      key={entry._id}
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
                        {entry.date}
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

              {/* View All Sprints button */}
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
                  marginTop: S.xs,
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
