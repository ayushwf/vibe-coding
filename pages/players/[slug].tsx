import { GetStaticPaths, GetStaticProps } from 'next'
import { useTheme } from '../../components/ThemeContext'
import { topPlayers, Player } from '../../data/players'
import { useMemo } from 'react'

type Props = { player?: Player }

function slugOf(name?: string) {
  if (!name) return ''
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function PlayerPage({ player }: Props) {
  const { mounted } = useTheme()

  if (!player) return <section className="placeholder">Player not found</section>

  return (
    <main className="site-main">
      <div style={{ maxWidth: 860, margin: '24px auto' }}>
        <article className="card glass-panel player-page">
          <h1 className="player-name">{player.name}</h1>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
            {player.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={player.image} alt={player.name} style={{ width: 160, height: 200, objectFit: 'cover', borderRadius: 8 }} />
            ) : null}
            <div style={{ flex: 1 }}>
              <p style={{ marginTop: 4 }}>{player.position}</p>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>{player.nationality}</p>
            </div>
          </div>

          <section style={{ marginTop: 20 }}>
            <h2 style={{ margin: 0 }}>Essay</h2>
            <div className="placeholder" style={{ marginTop: 12, minHeight: 160 }} />
          </section>
        </article>
      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = topPlayers.map((p) => ({ params: { slug: slugOf(p.name) } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug || '')
  const player = topPlayers.find((p) => slugOf(p.name) === slug) || null
  return { props: { player } }
}
