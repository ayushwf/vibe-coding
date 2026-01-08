import { Player } from '../data/players'

export default function Card({ person }: { person: Player }) {
  return (
    <article className="card">
      <h3>{person.name || '—'}</h3>
      <small>{person.position || '—'}</small>
      <p style={{ marginTop: 12 }}>{person.nationality || ''}</p>
    </article>
  )
}
