import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Notice — Malcolm Bunge',
}

const S = {
  fraunces: "'Fraunces', serif",
  jakarta:  "'Plus Jakarta Sans', sans-serif",
  poppins:  "'Poppins', sans-serif",
}

export default function Impressum() {
  return (
    <div style={{ backgroundColor: '#f4f1ec', minHeight: '100dvh', fontFamily: S.jakarta, color: '#1b1b34' }}>
      <style>{`* { box-sizing: border-box; } a { color: #8a3abf; } a:hover { opacity: 0.75; }`}</style>

      {/* Nav */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '40px', lineHeight: 1, color: '#1b1b34', margin: 0, textTransform: 'lowercase' }}>
              malcolm bunge
            </h1>
          </Link>
          <Link href="/" style={{ fontFamily: S.jakarta, fontSize: '14px', fontWeight: 600, color: '#8a3abf', textDecoration: 'none' }}>
            ← Back
          </Link>
        </div>
        <p style={{ fontFamily: S.poppins, fontWeight: 600, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8a3abf', margin: '0 0 48px' }}>
          Design &amp; Build
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 32px 80px' }}>

        <h2 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '36px', color: '#1b1b34', margin: '0 0 32px' }}>
          Legal Notice
        </h2>

        {/* Provider details */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Information pursuant to § 5 DDG
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Malcolm Bunge<br />
            Parkstr. 16<br />
            13086 Berlin<br />
            Germany
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* Contact */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Contact
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Phone: <a href="tel:+4917662171654">+49 176 62171654</a><br />
            Email: <a href="mailto:hello@malcolmbunge.com">hello@malcolmbunge.com</a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* Editorial responsibility */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Editorially responsible pursuant to § 18 para. 2 MStV
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Malcolm Bunge<br />
            Parkstr. 16<br />
            13086 Berlin
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* Liability for content */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Liability for content
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            As a service provider I am responsible for my own content on these pages in accordance with
            § 7 para. 1 DDG and general law. Under §§ 8 to 10 DDG, however, I am not obliged as a
            service provider to monitor transmitted or stored third-party information or to investigate
            circumstances that indicate illegal activity.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Liability for links
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            My website contains links to external third-party websites over whose content I have no
            influence. I therefore cannot accept any liability for this third-party content. The
            respective provider or operator of the linked pages is always responsible for their content.
            No legal infringements were apparent at the time of linking. Should any legal violations
            become known, I will remove the relevant links immediately.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Copyright
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            The content and works created by the site operator on these pages are subject to German
            copyright law. Contributions from third parties are marked as such. Reproduction, editing,
            distribution and any form of use beyond the limits of copyright law require the written
            consent of the respective author or creator.
          </p>
        </section>

        {/* Footer links */}
        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', paddingTop: '32px', display: 'flex', gap: '24px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>← Home</Link>
          <Link href="/datenschutz" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
        </div>

      </div>
    </div>
  )
}
