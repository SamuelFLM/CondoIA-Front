"use client"

import { useEffect, useState } from "react"

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return { isMobile }
}

// Vamos garantir que a função useIsMobile retorne diretamente o valor booleano
export function useIsMobile() {
  const { isMobile } = useMobileDetect()
  return isMobile
}
