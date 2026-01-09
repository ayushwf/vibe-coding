import Link from 'next/link'
import { ReactNode } from 'react'
import ThemeSelector from './ThemeSelector'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div className="app-root">
      {/* Watermark decorative elements */}
      <div className="decorative-watermark left">
        <div className="watermark-item">⚽</div>
        <div className="watermark-item player-text">Ronaldo</div>
      </div>
      <div className="decorative-watermark right">
        <div className="watermark-item">🏆</div>
        <div className="watermark-item player-text">Mbappé</div>
      </div>
      
      <header className="site-header">
        <div className="header-left">
          <div className="rm-logo">⚪</div>
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
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="footer-badges">⚽ Real Madrid ⚽</div>
        Business Details — Real Madrid Squad
      </footer>
    </div>
  )
}
