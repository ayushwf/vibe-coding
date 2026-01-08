import { NextPage } from 'next'
import { topPlayers } from '../data/players'
import Card from '../components/Card'

const People: NextPage = () => {
  return (
    <section>
      <h1>Players</h1>
      <div style={{ marginTop: 12 }} className="people-grid">
        {topPlayers.map((p) => (
          <Card key={p.id} person={p} />
        ))}
      </div>
    </section>
  )
}

export default People
