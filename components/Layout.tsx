import Link from 'next/link'
import { ReactNode } from 'react'
import ThemeSelector from './ThemeSelector'
import PlayerSearch from './PlayerSearch'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-content">
          <div className="header-left">
            <div className="rm-logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>⚪ Real Madrid</div>
          </div>

          <div className="nav-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <nav>
              <ul className="nav-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/people">Players</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            <ThemeSelector />
          </div>
        </div>
      </header>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        background: 'var(--glass-bg)',
        borderBottom: '1px solid var(--glass-border)',
        marginBottom: '1rem'
      }}>
        <PlayerSearch />
      </div>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-badges">⚽ Real Madrid CF ⚽</div>
        <p>Hala Madrid y nada más</p>
      </footer>
    </div>
  )
}
