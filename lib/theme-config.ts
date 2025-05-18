export const themeConfig = {
  light: {
    primary: "#8A05BE", // Roxo Nubank
    secondary: "#00A868", // Verde Nubank
    accent: "#F5F5F7", // Cinza claro para backgrounds
    background: "#FFFFFF",
    foreground: "#1A1A1A",
    muted: "#F5F5F7",
    border: "#E5E5E5",
    card: "#FFFFFF",
  },
  dark: {
    primary: "#A020F0", // Roxo mais claro para dark mode
    secondary: "#00C278", // Verde mais claro para dark mode
    accent: "#2D2D2D", // Cinza escuro para backgrounds
    background: "#121212",
    foreground: "#FFFFFF",
    muted: "#2D2D2D",
    border: "#3D3D3D",
    card: "#1E1E1E",
  },
}

export type ThemeMode = "light" | "dark" | "system"

export const defaultTheme: ThemeMode = "light"
