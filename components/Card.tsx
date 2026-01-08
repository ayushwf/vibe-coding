import { Person } from '../data/fakeData'

export default function Card({ person }: { person: Person }) {
  return (
    <article className="card">
      <h3>{person.name}</h3>
      <small>{person.role}</small>
      <p style={{marginTop:12}}>{person.bio}</p>
    </article>
  )
}
