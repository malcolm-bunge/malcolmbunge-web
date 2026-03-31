import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Malcolm Bunge',
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
            ← Zurück
          </Link>
        </div>
        <p style={{ fontFamily: S.poppins, fontWeight: 600, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: '#8a3abf', margin: '0 0 48px' }}>
          Design &amp; Build
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 32px 80px' }}>

        <h2 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '36px', color: '#1b1b34', margin: '0 0 32px' }}>
          Datenschutzerklärung
        </h2>

        {/* 1. Verantwortlicher */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            1. Verantwortlicher
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Malcolm Bunge<br />
            Parkstr. 16<br />
            13086 Berlin<br />
            Deutschland<br />
            E-Mail: <a href="mailto:hello@malcolmbunge.com">hello@malcolmbunge.com</a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 2. Hosting */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            2. Hosting
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Diese Website wird gehostet bei:
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723<br />
            USA
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch sogenannte Server-Logfiles
            erfasst. Diese enthalten unter anderem:
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', paddingLeft: '24px', color: '#2a2a51' }}>
            <li>IP-Adresse des anfragenden Geräts</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Browsertyp und Betriebssystem</li>
            <li>Referrer-URL (zuvor besuchte Seite)</li>
          </ul>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Diese Daten werden zur Sicherstellung eines reibungslosen Betriebs und zur Verbesserung des Angebots
            verarbeitet. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks nicht mehr erforderlich sind.
            Vercel kann Daten in die USA übertragen. Die Übermittlung erfolgt auf Grundlage der
            Standardvertragsklauseln der EU-Kommission.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 3. Google Fonts */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            3. Google Fonts
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Diese Website verwendet Google Fonts (Anbieter: Google LLC, 1600 Amphitheatre Parkway,
            Mountain View, CA 94043, USA). Beim Laden einer Seite wird eine Verbindung zu den Servern
            von Google hergestellt, wobei Ihre IP-Adresse übermittelt wird.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Die Nutzung von Google Fonts erfolgt im Interesse einer einheitlichen und ansprechenden
            Darstellung dieser Website. Dies stellt ein berechtigtes Interesse im Sinne von
            Art. 6 Abs. 1 lit. f DSGVO dar. Weitere Informationen zu Google Fonts finden Sie unter{' '}
            <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer">
              developers.google.com/fonts/faq
            </a>{' '}
            sowie in der Datenschutzerklärung von Google:{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 4. Sanity CMS */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            4. Inhalte via Sanity CMS
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Die Inhalte dieser Website werden über Sanity (Anbieter: Sanity Inc., 548 Market St,
            San Francisco, CA 94104, USA) bereitgestellt. Sanity dient ausschließlich als
            Content-Management-System zur Auslieferung von Texten und Bildern. Es werden dabei keine
            personenbezogenen Daten der Besucher an Sanity übermittelt. Weitere Informationen finden
            Sie unter{' '}
            <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noopener noreferrer">
              sanity.io/legal/privacy
            </a>.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 5. Keine Cookies */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            5. Cookies und Tracking
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Diese Website verwendet keine Cookies, kein Tracking, keine Analyse-Tools und kein
            Remarketing. Es werden keine personenbezogenen Daten zu Marketingzwecken erhoben oder
            weitergegeben.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 6. Kontaktaufnahme */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            6. Kontaktaufnahme per E-Mail
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Wenn Sie mir per E-Mail schreiben, werden Ihre Angaben (E-Mail-Adresse, Inhalt der Nachricht)
            zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen gespeichert.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
            von Anfragen). Die Daten werden gelöscht, sobald die Anfrage abschließend beantwortet ist
            und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 7. Betroffenenrechte */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            7. Ihre Rechte als betroffene Person
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', color: '#2a2a51' }}>
            Sie haben gemäß DSGVO folgende Rechte:
          </p>
          <ul style={{ fontSize: '16px', lineHeight: '1.75', margin: '0 0 16px', paddingLeft: '24px', color: '#2a2a51' }}>
            <li><strong>Auskunft</strong> (Art. 15 DSGVO): Recht auf Auskunft über Ihre gespeicherten Daten</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO): Recht auf Korrektur unrichtiger Daten</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO): Recht auf Löschung Ihrer Daten</li>
            <li><strong>Einschränkung</strong> (Art. 18 DSGVO): Recht auf Einschränkung der Verarbeitung</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO): Recht auf Erhalt Ihrer Daten in maschinenlesbarem Format</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO): Recht auf Widerspruch gegen die Verarbeitung</li>
          </ul>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
            <a href="mailto:hello@malcolmbunge.com">hello@malcolmbunge.com</a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* 8. Beschwerderecht */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            8. Beschwerderecht bei der Aufsichtsbehörde
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
            Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde für Berlin ist:
            <br /><br />
            Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
            Friedrichstr. 219<br />
            10969 Berlin<br />
            <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer">
              www.datenschutz-berlin.de
            </a>
          </p>
        </section>

        {/* Footer links */}
        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', paddingTop: '32px', display: 'flex', gap: '24px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>← Startseite</Link>
          <Link href="/impressum" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>Impressum</Link>
        </div>

      </div>
    </div>
  )
}
