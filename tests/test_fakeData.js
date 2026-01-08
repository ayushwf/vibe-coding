const assert = require('assert')
const { people, business, contact } = require('../data/fakeData')

try{
  assert(Array.isArray(people), 'people should be an array')
  assert(people.length >= 4, 'expect at least 4 people in fake data')
  assert(business && business.name, 'business.name should exist')
  assert(contact && contact.email, 'contact.email should exist')
  console.log('OK: fakeData smoke tests passed')
  process.exit(0)
}catch(err){
  console.error('ERROR:', err.message)
  process.exit(1)
}
