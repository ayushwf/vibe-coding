const assert = require('assert')
const { topPlayers } = require('../data/players')

try{
  assert(Array.isArray(topPlayers), 'topPlayers should be an array')
  assert(topPlayers.length === 10, 'expect exactly 10 players in topPlayers')
  console.log('OK: players smoke tests passed')
  process.exit(0)
}catch(err){
  console.error('ERROR:', err.message)
  process.exit(1)
}
