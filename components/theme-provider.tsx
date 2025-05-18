"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type ThemeMode, defaultTheme } from "@/lib/theme-config"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeMode
}

type ThemeProviderState = {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

const initialState: ThemeProviderState = {
  theme: defaultTheme,
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "light", ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (defaultTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }
  }, [defaultTheme])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: ThemeMode) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
