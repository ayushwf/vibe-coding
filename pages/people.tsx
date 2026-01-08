import { NextPage } from 'next'
import { people } from '../data/fakeData'
import Card from '../components/Card'

const People: NextPage = () => {
  return (
    <section>
      <h1>People</h1>
      <div style={{ marginTop: 12 }} className="people-grid">
        {people.map((p) => (
          <Card key={p.id} person={p} />
        ))}
      </div>
    </section>
  )
}

export default People
