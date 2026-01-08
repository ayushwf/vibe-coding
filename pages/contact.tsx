import { NextPage } from 'next'
import { contact } from '../data/fakeData'

const Contact: NextPage = () => {
  return (
    <section>
      <h1>Contact</h1>
      <div style={{ marginTop: 12 }} className="card">
        <p><strong>Phone:</strong> {contact.phone}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Address:</strong> {contact.address}</p>
      </div>
    </section>
  )
}

export default Contact
