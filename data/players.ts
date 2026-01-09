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
  image?: string
  stats?: {
    matches: number
    goals: number
    assists: number
    minutes: number
  }
}
export const topPlayers: Player[] = [
  {
    id: '1',
    name: 'Arda Güler',
    position: 'Midfielder',
    number: null,
    nationality: 'Turkey',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/ARDA_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
    stats: { matches: 49, goals: 7, assists: 9, minutes: 1158 },
  },
  {
    id: '2',
    name: 'Kylian Mbappé',
    position: 'Forward',
    number: null,
    nationality: 'France',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/MBAPPE_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
    stats: { matches: 39, goals: 40, assists: 3, minutes: 2019 },
  },
  {
    id: '3',
    name: 'Vinícius Júnior',
    position: 'Forward',
    number: null,
    nationality: 'Brazil',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/VINICIUS_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
    stats: { matches: 51, goals: 20, assists: 14, minutes: 4080 },
  },
  {
    id: '4',
    name: 'Jude Bellingham',
    position: 'Midfielder',
    number: null,
    nationality: 'England',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/BELLINGHAM_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
    stats: { matches: 55, goals: 15, assists: 15, minutes: 4620 },
  },
  {
    id: '5',
    name: 'Rodrygo',
    position: 'Forward',
    number: null,
    nationality: 'Brazil',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/RODRYGO_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
    stats: { matches: 42, goals: 12, assists: 8, minutes: 2800 },
  },
  {
    id: '6',
    name: 'Federico Valverde',
    position: 'Midfielder',
    number: null,
    nationality: 'Uruguay',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/VALVERDE_550x650_SinParche_v2?$Desktop$&fit=wrap&wid=420',
    stats: { matches: 50, goals: 6, assists: 7, minutes: 4200 },
  },
  {
    id: '7',
    name: 'Eduardo Camavinga',
    position: 'Midfielder',
    number: null,
    nationality: 'France',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/CAMAVINGA_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
  },
  {
    id: '8',
    name: 'Aurélien Tchouaméni',
    position: 'Midfielder',
    number: null,
    nationality: 'France',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/TCHOUAMENI_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
  },
  {
    id: '9',
    name: 'Thibaut Courtois',
    position: 'Goalkeeper',
    number: null,
    nationality: 'Belgium',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/COURTOIS_550x650_SinParche?$Desktop$&fit=wrap&wid=420',
  },
  {
    id: '10',
    name: 'Luka Modrić',
    position: 'Midfielder',
    number: null,
    nationality: 'Croatia',
    appearances: null,
    goals: null,
    assists: null,
    seasons: null,
    image:
      'https://assets.realmadrid.com/is/image/realmadrid/MODRIC_EQUIPO_CARITA_550X650%20%E2%80%93%201?$Mobile$&fit=wrap&wid=312',
  },
]
