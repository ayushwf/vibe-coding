import { useTheme } from './ThemeContext'
import { useEffect, useState } from 'react'

const ACCENTS = {
  blue: '#2563eb',
  green: '#16a34a',
  red: '#dc2626',
}

export default function ThemeSelector() {
  const { theme, setTheme, accent, setAccent, mounted } = useTheme()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const t = setTimeout(() => setAnimate(false), 420)
    return () => clearTimeout(t)
  }, [accent])

  return (
    <div className="theme-selector" aria-label="Theme selector">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {Object.entries(ACCENTS).map(([key, hex]) => (
          <button
            key={key}
            aria-label={`Select ${key} accent`}
            title={key}
            onClick={() => setAccent(key as any)}
            className={`accent-button ${mounted && accent === key ? 'active' : ''} ${mounted && animate && accent === key ? 'accent-animate' : ''}`}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>

      <button
        className={`theme-toggle ${mounted && animate ? 'accent-animate' : ''}`}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        {...(mounted ? { 'aria-pressed': theme === 'dark' } : {})}
        title="Toggle light/dark"
        aria-label="Toggle theme"
      >
        {mounted ? (theme === 'light' ? '🌞' : '🌙') : ' '}
      </button>
    </div>
  )
}
