import { GetStaticPaths, GetStaticProps } from 'next'
import { useTheme } from '../../components/ThemeContext'
import { topPlayers, Player } from '../../data/players'
import { useMemo, useState, useEffect } from 'react'

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

          <section style={{ marginTop: 24 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: '1.25rem' }}>2024/25 Statistics</h2>
            {player.stats ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {[
                  { label: 'Matches', value: player.stats.matches },
                  { label: 'Goals', value: player.stats.goals },
                  { label: 'Assists', value: player.stats.assists },
                  { label: 'Minutes', value: player.stats.minutes },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: 'rgba(255,255,255,0.5)',
                    padding: '12px 0',
                    borderRadius: 12,
                    textAlign: 'center',
                    border: '1px solid var(--glass-border)'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--muted)' }}>No statistics available.</p>
            )}
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
  const player = topPlayers.find((p) => slugOf(p.name) === slug)
  return { props: { player } }
}
