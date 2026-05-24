'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/client'
import { DOWNLOADS_QUERY } from '@/sanity/queries'
import Header from '../components/Header'

const F = {
  fraunces: "var(--nf-fraunces), serif",
  inter: "var(--nf-inter), sans-serif",
  mono: "var(--nf-mono), monospace",
}

const superSoft = {
  fontOpticalSizing: 'none' as any,
  fontVariationSettings: "'opsz' 72, 'SOFT' 100",
}

interface DownloadItem {
  _id: string
  driveFileId: string
  name: string
  mimeType: string
  fileSize: number | null
  downloadUrl: string
  modifiedTime: string
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileLabel(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'PDF'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'DOCX'
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'XLSX'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PPTX'
  if (mimeType.includes('zip')) return 'ZIP'
  if (mimeType.includes('png')) return 'PNG'
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPG'
  if (mimeType.includes('text/plain')) return 'TXT'
  if (mimeType.includes('video')) return 'VIDEO'
  if (mimeType.includes('audio')) return 'AUDIO'
  return 'FILE'
}

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export default function DownloadsPage() {
  const [items, setItems] = useState<DownloadItem[]>([])
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    sanityFetch<DownloadItem[]>({ query: DOWNLOADS_QUERY })
      .then((d) => setItems(d ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ backgroundColor: '#13131a', minHeight: '100dvh', color: '#e8e0d5', fontFamily: F.inter }}>
      <style>{`
        * { box-sizing: border-box; }
        .site-nav-link:hover { color: #e8e0d5 !important; }
        .download-row:hover { background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.14) !important; }
        .download-btn:hover { background: rgba(255,107,129,0.15) !important; color: #ff6b81 !important; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <Header onContactOpen={() => setContactOpen(true)} />
      </div>

      {/* Page heading */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px 0' }}>
        <div style={{
          fontFamily: F.fraunces, fontStyle: 'italic', fontSize: '14px',
          color: '#ff6b81', marginBottom: '24px', letterSpacing: '0.2px',
        }}>
          Downloads
        </div>
        <h1 style={{
          fontFamily: F.fraunces, fontWeight: 700, fontSize: '88px',
          lineHeight: '1.0', letterSpacing: '-2px', color: '#e8e0d5',
          maxWidth: '860px', marginBottom: '56px',
          ...superSoft,
        }}>
          files &amp; <span style={{ color: '#ff6b81' }}>resources</span>
        </h1>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
      </section>

      {/* File list */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 40px 80px' }}>
        {loading && (
          <div style={{ fontFamily: F.mono, fontSize: '13px', color: '#8a8499' }}>Loading…</div>
        )}

        {!loading && items.length === 0 && (
          <div style={{ fontFamily: F.inter, fontSize: '15px', color: '#8a8499' }}>
            No downloads available yet.
          </div>
        )}

        {!loading && items.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((item) => (
              <div
                key={item._id}
                className="download-row"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '16px', padding: '16px 20px',
                  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
                  transition: 'background 0.15s, border-color 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  {/* File type badge */}
                  <span style={{
                    fontFamily: F.mono, fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.5px', color: '#ff6b81',
                    background: 'rgba(255,107,129,0.1)', border: '1px solid rgba(255,107,129,0.2)',
                    borderRadius: '4px', padding: '3px 7px', flexShrink: 0,
                  }}>
                    {fileLabel(item.mimeType)}
                  </span>

                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: F.inter, fontWeight: 500, fontSize: '15px',
                      color: '#e8e0d5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {item.name}
                    </div>
                    {item.fileSize && (
                      <div style={{ fontFamily: F.mono, fontSize: '11px', color: '#8a8499', marginTop: '2px' }}>
                        {formatBytes(item.fileSize)}
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: F.inter, fontSize: '13px', fontWeight: 500,
                    color: '#8a8499', textDecoration: 'none',
                    padding: '8px 14px', borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.15s, color 0.15s',
                    flexShrink: 0,
                  }}
                >
                  <DownloadIcon />
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer style={{
        maxWidth: '1200px', margin: '0 auto', padding: '24px 40px 48px',
        display: 'flex', gap: '24px', justifyContent: 'flex-end',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <Link href="/impressum" style={{ fontFamily: F.inter, fontSize: '12px', color: '#8a8499', textDecoration: 'none' }} className="site-nav-link">Legal Notice</Link>
        <Link href="/datenschutz" style={{ fontFamily: F.inter, fontSize: '12px', color: '#8a8499', textDecoration: 'none' }} className="site-nav-link">Privacy Policy</Link>
      </footer>
    </div>
  )
}
