import Link from 'next/link'
import { Player } from '../data/players'

function slugOf(name?: string) {
  if (!name) return ''
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function Card({ person }: { person: Player }) {
  return (
    <Link href={`/players/${slugOf(person.name)}`} passHref style={{ textDecoration: 'none' }}>
      <article className="card">
        <h3>{person.name || '—'}</h3>
        <small>{person.position || '—'}</small>
        <p style={{ marginTop: 12 }}>{person.nationality || ''}</p>
      </article>
    </Link>
  )
}
