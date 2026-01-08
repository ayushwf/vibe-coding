import { NextPage } from 'next'
import { business, people } from '../data/fakeData'
import Card from '../components/Card'

const Home: NextPage = () => {
  return (
    <section>
      <h1>{business.name}</h1>
      <p style={{ color: 'var(--muted)' }}>{business.summary}</p>

      <div style={{ marginTop: 20 }}>
        <h2>Key People</h2>
        <div className="people-grid" style={{ marginTop: 12 }}>
          {people.slice(0, 4).map((p) => (
            <Card key={p.id} person={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
