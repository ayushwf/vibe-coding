export type Player = {
  id: string
  name?: string
  position?: string
  number?: number | null
  nationality?: string
  appearances?: number | null
  goals?: number | null
  assists?: number | null
  seasons?: Array<string> | null
}

export const topPlayers: Player[] = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: '', // placeholder, fill later
  position: '',
  number: null,
  nationality: '',
  appearances: null,
  goals: null,
  assists: null,
  seasons: null,
}))
