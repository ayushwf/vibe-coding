import { NextPage } from 'next'
import { club } from '../data/club'
import { topPlayers } from '../data/players'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          letterSpacing: '-1px',
          background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-rgb) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 16,
          display: 'inline-block'
        }}>
          {club.name}
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', maxWidth: 600, margin: '0 auto' }}>
          {club.summary || 'History, Glory, and the Future of Football.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginTop: 24, alignItems: 'start' }}>
        {/* Left Column: Badge */}
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src="/images/real-madrid.svg"
            alt="Real Madrid Badge"
            style={{ width: '100%', maxWidth: 300, height: 'auto', borderRadius: 16 }}
          />
        </div>

        {/* Center Column: Featured Players */}
        <div style={{ flex: 2, minWidth: 300 }}>
          <h2 style={{ marginTop: 0 }}>Featured Players</h2>
          <div className="people-grid" style={{ marginTop: 12 }}>
            {topPlayers.slice(0, 4).map((p) => (
              <Card key={p.id} person={p} />
            ))}
          </div>
        </div>

        {/* Right Column: Ronaldo */}
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src="/images/ronaldo.jpg"
            alt="Cristiano Ronaldo"
            style={{ width: '100%', maxWidth: 300, height: 'auto', borderRadius: 16 }}
          />
        </div>
      </div>
    </section>
  )
}

export default Home
