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
  const [essay, setEssay] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!player) return
    try {
      const key = `essay:${player.id}`
      const v = localStorage.getItem(key) || ''
      setEssay(v)
      setSaved(Boolean(v))
    } catch {}
  }, [player])

  const save = () => {
    if (!player) return
    try {
      const key = `essay:${player.id}`
      localStorage.setItem(key, essay)
      setSaved(true)
    } catch {}
  }

  const clear = () => {
    if (!player) return
    try {
      const key = `essay:${player.id}`
      localStorage.removeItem(key)
      setEssay('')
      setSaved(false)
    } catch {}
  }

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
            {mounted ? (
              <div style={{ marginTop: 12 }}>
                <textarea
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  placeholder="Write the essay here..."
                  style={{ width: '100%', minHeight: 160, padding: 12, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.6)', resize: 'vertical' }}
                />
                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <button onClick={save} style={{ padding: '8px 12px', borderRadius: 8, background: 'var(--accent)', color: '#fff', border: 'none' }}>{saved ? 'Saved' : 'Save'}</button>
                  <button onClick={clear} style={{ padding: '8px 12px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(0,0,0,0.08)' }}>Clear</button>
                </div>
              </div>
            ) : (
              <div className="placeholder" style={{ marginTop: 12, minHeight: 160 }} />
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
  const player = topPlayers.find((p) => slugOf(p.name) === slug) || null
  return { props: { player } }
}
