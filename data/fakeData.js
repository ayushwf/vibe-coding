exports.people = [
  { id: '1', name: 'Alice Johnson', role: 'Founder & CEO', bio: 'Founder with 15 years experience in product strategy.' },
  { id: '2', name: 'Bob Lee', role: 'CTO', bio: 'Leads the engineering organization and cloud strategy.' },
  { id: '3', name: 'Carol Nguyen', role: 'Head of Design', bio: 'Designs delightful user experiences.' },
  { id: '4', name: 'David Kim', role: 'VP Sales', bio: 'Drives business development and partnerships.' },
  { id: '5', name: 'Eve Park', role: 'Head of People', bio: 'Builds company culture and recruiting.' }
]

exports.business = {
  name: 'Acme Consulting',
  summary: 'We provide expert consulting services to help businesses scale through technology and process optimization.',
  address: '123 Main St, Springfield',
  phone: '+1 (555) 555-0123',
  email: 'hello@acme.example'
}

exports.contact = {
  phone: exports.business.phone,
  email: exports.business.email,
  address: exports.business.address,
}
