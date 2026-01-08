import { NextPage } from 'next'
import { club } from '../data/club'

const Contact: NextPage = () => {
  return (
    <section>
      <h1>Contact</h1>
      <div style={{ marginTop: 12 }} className="card">
        <p><strong>Phone:</strong> {club.phone || '—'}</p>
        <p><strong>Email:</strong> {club.email || '—'}</p>
        <p><strong>Address:</strong> {club.address || '—'}</p>
      </div>
    </section>
  )
}

export default Contact
