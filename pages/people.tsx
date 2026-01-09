import { NextPage } from 'next'
import Link from 'next/link'
import { topPlayers } from '../data/players'
import Card from '../components/Card'

const People: NextPage = () => {
  return (
    <section>
      <h1>Players</h1>
      <div style={{ marginTop: 12 }} className="people-grid">
        {topPlayers.map((p) => {
          const slug = p.name ? p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : p.id
          return (
            <Link key={p.id} href={`/players/${slug}`} aria-label={`Open ${p.name} profile`} style={{ textDecoration: 'none' }}>
              <Card person={p} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default People
