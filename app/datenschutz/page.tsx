import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Malcolm Bunge',
}

const S = {
  fraunces: "'Fraunces', serif",
  jakarta:  "'Plus Jakarta Sans', sans-serif",
  poppins:  "'Poppins', sans-serif",
}

export default function Datenschutz() {
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
          Privacy Policy
        </h2>

        {/* 1. Controller */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
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

        {/* 2. Hosting */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
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

        {/* 3. Google Fonts */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            3. Google Fonts
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            This website uses Google Fonts (provider: Google LLC, 1600 Amphitheatre Parkway,
            Mountain View, CA 94043, USA). When a page loads, a connection is established to
            Google's servers, during which your IP address is transmitted.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Google Fonts is used in the interest of a consistent and appealing presentation of this
            website. This constitutes a legitimate interest within the meaning of Art. 6 para. 1
            lit. f GDPR. For more information see{' '}
            <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer">
              developers.google.com/fonts/faq
            </a>{' '}
            and Google's privacy policy at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 4. Sanity CMS */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
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

        {/* 5. No cookies */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            5. Cookies and tracking
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            This website does not use cookies, tracking, analytics tools, or remarketing. No personal
            data is collected or shared for marketing purposes.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 6. Contact by email */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            6. Contact by email
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            If you contact me by email, your details (email address, message content) will be stored
            to process your enquiry and for any follow-up questions. The legal basis is Art. 6
            para. 1 lit. f GDPR (legitimate interest in responding to enquiries). Data is deleted
            once your enquiry has been fully resolved and no statutory retention obligations apply.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 7. Your rights */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            7. Your rights as a data subject
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

        {/* 8. Right to lodge a complaint */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            8. Right to lodge a complaint
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

        {/* Footer links */}
        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', paddingTop: '32px', display: 'flex', gap: '24px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>← Home</Link>
          <Link href="/impressum" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>Legal Notice</Link>
        </div>

      </div>
    </div>
  )
}
