import Link from 'next/link'
import { ReactNode } from 'react'
import ThemeSelector from './ThemeSelector'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="header-left">
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
      <footer className="site-footer">Business Details — placeholder</footer>
    </div>
  )
}
