import Link from 'next/link'
import { ReactNode } from 'react'
import ThemeSelector from './ThemeSelector'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-content">
          <div className="header-left">
            <div className="rm-logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>⚪ Real Madrid</div>
          </div>

          <div className="nav-container">
            <nav>
              <ul className="nav-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/people">People</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            <ThemeSelector />
          </div>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-badges">⚽ Real Madrid CF ⚽</div>
        <p>Hala Madrid y nada más</p>
      </footer>
    </div>
  )
}
