import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'
type Accent = 'lavender' | 'red' | 'blue' | 'yellow' | 'green'

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
      return (v as Accent) || 'lavender'
    } catch {
      return 'lavender'
    }
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
      localStorage.setItem('accent', accent)
    } catch {}
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-accent', accent)
    setMounted(true)
  }, [theme, accent])

  const setTheme = (t: Theme) => setThemeState(t)
  const setAccent = (a: Accent) => setAccentState(a)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}
