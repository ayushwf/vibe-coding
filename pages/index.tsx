import { NextPage } from 'next'
import { club } from '../data/club'
import { topPlayers } from '../data/players'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <section>
      <h1>{club.name}</h1>
      <p style={{ color: 'var(--muted)' }}>{club.summary || '—'}</p>

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
