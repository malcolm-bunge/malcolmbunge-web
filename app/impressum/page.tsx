import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum — Malcolm Bunge',
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
          Impressum
        </h2>

        {/* Angaben */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Angaben gemäß § 5 DDG
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Malcolm Bunge<br />
            Parkstr. 16<br />
            13086 Berlin<br />
            Deutschland
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* Kontakt */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Kontakt
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Telefon: <a href="tel:+4917662171654">+49 176 62171654</a><br />
            E-Mail: <a href="mailto:hello@malcolmbunge.com">hello@malcolmbunge.com</a>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* Verantwortlich */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Malcolm Bunge<br />
            Parkstr. 16<br />
            13086 Berlin
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', margin: '0 0 40px' }} />

        {/* Haftungsausschluss */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Haftung für Inhalte
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet,
            übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Haftung für Links
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe.
            Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Zum Zeitpunkt der
            Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von Rechtsverletzungen werde ich
            derartige Links umgehend entfernen.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontFamily: S.fraunces, fontWeight: 700, fontSize: '18px', color: '#1b1b34', margin: '0 0 12px' }}>
            Urheberrecht
          </h3>
          <p style={{ fontSize: '16px', lineHeight: '1.75', margin: 0, color: '#2a2a51' }}>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        {/* Footer links */}
        <div style={{ borderTop: '1px solid rgba(27,27,52,0.12)', paddingTop: '32px', display: 'flex', gap: '24px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>← Startseite</Link>
          <Link href="/datenschutz" style={{ color: '#8a3abf', textDecoration: 'none', fontWeight: 600 }}>Datenschutzerklärung</Link>
        </div>

      </div>
    </div>
  )
}
