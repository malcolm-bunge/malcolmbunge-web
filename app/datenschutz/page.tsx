import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Malcolm Bunge',
}

const F = {
  fraunces: "var(--nf-fraunces), serif",
  jakarta:  "var(--nf-inter), sans-serif",
  poppins:  "var(--nf-inter), sans-serif",
}

export default function Datenschutz() {
  return (
    <div style={{ backgroundColor: '#f4f1ec', minHeight: '100dvh', fontFamily: F.jakarta, color: '#1b1b34' }}>
      <style>{`
        * { box-sizing: border-box; }
        a { color: #8a3abf; }
        a:hover { opacity: 0.75; }
        @media (max-width: 1023px) {
          .main-name { font-size: 48px !important; line-height: 52px !important; }
          .nav-intro  { display: none !important; }
          .nav-bar    { justify-content: flex-end !important; }
        }
      `}</style>

      {/* ── Nav — matches site-wide structure ── */}
      <div style={{ maxWidth: '1512px', margin: '0 auto', padding: '64px 32px 0' }}>
        <div className="nav-bar" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '8px' }}>
          <p className="nav-intro" style={{ flex: 1, fontFamily: F.jakarta, fontWeight: 500, fontSize: '14px', color: '#8585c1', margin: 0 }}>
            malcolmbunge.com // Privacy Policy
          </p>
          <Link href="/" style={{
            backgroundColor: 'rgba(27,27,52,0.06)', color: '#8a3abf',
            border: '1px solid rgba(27,27,52,0.15)',
            padding: '4px 16px', borderRadius: '999px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: F.jakarta, fontWeight: 500, fontSize: '16px', lineHeight: '24px',
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            ← Home
          </Link>
        </div>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 className="main-name" style={{
            fontFamily: F.fraunces, fontWeight: 700, fontSize: '64px', lineHeight: '64px',
            letterSpacing: '0.64px', color: '#1b1b34', margin: '0 0 2px', textTransform: 'lowercase',
          }}>
            malcolm bunge
          </h1>
        </Link>
        <p style={{
          fontFamily: F.poppins, fontWeight: 600, fontSize: '14px', lineHeight: '19px',
          letterSpacing: '0.98px', textTransform: 'uppercase', color: '#8a3abf', margin: 0,
        }}>
          Design &amp; Build
        </p>
      </div>

      {/* ── Content — reading width ── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 32px 80px' }}>

        <h2 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '36px', color: '#1b1b34', margin: '0 0 32px' }}>
          Privacy Policy
        </h2>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            1. Controller
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Malcolm Bunge<br />
            Parkstr. 16<br />
            13086 Berlin<br />
            Germany<br />
            Email: <a href="mailto:hello@malcolmbunge.com">hello@malcolmbunge.com</a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            2. Hosting
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            This website is hosted by:
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723<br />
            USA
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            When you visit this website, the hosting provider automatically collects server log files
            containing, among other things:
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', paddingLeft: '24px', color: '#2a2a51' }}>
            <li>IP address of the requesting device</li>
            <li>Date and time of access</li>
            <li>Name and URL of the file requested</li>
            <li>Browser type and operating system</li>
            <li>Referrer URL (previously visited page)</li>
          </ul>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            This data is processed to ensure smooth operation and to improve the service. The legal
            basis is Art. 6 para. 1 lit. f GDPR (legitimate interest). Data is deleted once it is no
            longer required for the purpose for which it was collected. Vercel may transfer data to
            the USA under the EU Commission's Standard Contractual Clauses.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            3. Typography (self-hosted fonts)
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            This website uses the open-source typefaces Fraunces, Inter and JetBrains Mono. All font
            files are hosted locally on the same server as the website itself. No connection to
            external font providers (such as Google) is established when you visit this site, and no
            personal data is transmitted to third parties for the purpose of loading fonts.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            4. Content via Sanity CMS
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Content on this website is delivered through Sanity (provider: Sanity Inc., 548 Market St,
            San Francisco, CA 94104, USA). Sanity is used solely as a content management system for
            delivering text and images. No personal data of visitors is transmitted to Sanity. For
            more information see{' '}
            <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noopener noreferrer">
              sanity.io/legal/privacy
            </a>.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            5. Cookies and tracking
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            This website does not use cookies, tracking, analytics tools, or remarketing. No personal
            data is collected or shared for marketing purposes.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            6. VG Wort tracking pixels
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Some pages on this website contain invisible counting pixels (1x1 images) provided by
            VG Wort (Verwertungsgesellschaft Wort, Untere Weidenstr. 5, 81543 Munich, Germany).
            These pixels are used to measure the reach of texts and to calculate the remuneration
            entitlements of authors under § 54 of the German Copyright Act (UrhG).
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            When a page containing such a pixel is loaded, your IP address and the URL of the page
            are transmitted to VG Wort. This data is used exclusively for statistical purposes in
            anonymised form and cannot be traced back to individual persons.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            The legal basis for this processing is Art. 6 para. 1 lit. f GDPR (legitimate interest
            of the author in fair remuneration for the use of copyright-protected works). For more
            information see{' '}
            <a href="https://www.vgwort.de/hilfsseiten/datenschutz.html" target="_blank" rel="noopener noreferrer">
              vgwort.de/hilfsseiten/datenschutz.html
            </a>.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            7. Contact by email
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            If you contact me by email, your details (email address, message content) will be stored
            to process your enquiry and for any follow-up questions. The legal basis is Art. 6
            para. 1 lit. f GDPR (legitimate interest in responding to enquiries). Data is deleted
            once your enquiry has been fully resolved and no statutory retention obligations apply.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            8. Your rights as a data subject
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Under the GDPR you have the following rights:
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', paddingLeft: '24px', color: '#2a2a51' }}>
            <li><strong>Access</strong> (Art. 15 GDPR): right to information about your stored data</li>
            <li><strong>Rectification</strong> (Art. 16 GDPR): right to correction of inaccurate data</li>
            <li><strong>Erasure</strong> (Art. 17 GDPR): right to deletion of your data</li>
            <li><strong>Restriction</strong> (Art. 18 GDPR): right to restriction of processing</li>
            <li><strong>Portability</strong> (Art. 20 GDPR): right to receive your data in a machine-readable format</li>
            <li><strong>Objection</strong> (Art. 21 GDPR): right to object to processing</li>
          </ul>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            To exercise your rights please contact:{' '}
            <a href="mailto:hello@malcolmbunge.com">hello@malcolmbunge.com</a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: F.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            9. Right to lodge a complaint
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            You have the right to lodge a complaint with a data protection supervisory authority
            regarding the processing of your personal data. The competent authority for Berlin is:
            <br /><br />
            Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
            (Berlin Commissioner for Data Protection and Freedom of Information)<br />
            Friedrichstr. 219<br />
            10969 Berlin<br />
            <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer">
              www.datenschutz-berlin.de
            </a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', paddingTop: '32px', display: 'flex', gap: '24px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>← Home</Link>
          <Link href="/impressum" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>Legal Notice</Link>
        </div>

      </div>
    </div>
  )
}
