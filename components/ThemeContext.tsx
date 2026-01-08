import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type Accent = 'blue' | 'green' | 'red'

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  accent: Accent
  setAccent: (a: Accent) => void
  mounted?: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const v = localStorage.getItem('theme')
      return (v as Theme) || 'light'
    } catch {
      return 'light'
    }
  })

  const [accent, setAccentState] = useState<Accent>(() => {
    try {
      const v = localStorage.getItem('accent')
      return (v as Accent) || 'blue'
    } catch {
      return 'blue'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
      localStorage.setItem('accent', accent)
    } catch {}
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-accent', accent)
    setMounted(true)
  }, [theme, accent])

  const [mounted, setMounted] = useState(false)

  const setTheme = (t: Theme) => setThemeState(t)
  const setAccent = (a: Accent) => setAccentState(a)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}
