exports.topPlayers = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: '',
  position: '',
  number: null,
  nationality: '',
  appearances: null,
  goals: null,
  assists: null,
  seasons: null,
}))
