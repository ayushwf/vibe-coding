import { NextPage } from 'next'
import { club } from '../data/club'
import { topPlayers } from '../data/players'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <section>
      <h1>{club.name}</h1>
      <p style={{ color: 'var(--muted)' }}>{club.summary || '—'}</p>

      {/* Ronaldo Bicycle Kick Image */}
      <div className="hero-image-container" style={{ marginTop: 24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.realmadrid.com/css/images/logos/escudo.png"
          alt="Real Madrid Badge"
          className="hero-image"
          style={{ width: '100%', maxWidth: 800, height: 'auto', borderRadius: 16 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Featured Players</h2>
        <div className="people-grid" style={{ marginTop: 12 }}>
          {topPlayers.slice(0, 4).map((p) => (
            <Card key={p.id} person={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
