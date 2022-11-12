import React from 'react'
import ThemeContext from './theme-context'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('current-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  return 'light'
}

const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const checkTheme = (existing) => {
    const root = window.document.documentElement
    const isDark = existing === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(existing)

    localStorage.setItem('current-theme', existing)
  }

  if (initialTheme) {
    checkTheme(initialTheme)
  }

  React.useEffect(() => {
    checkTheme(theme)
  }, [theme])

  const themeContext = {
    theme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider