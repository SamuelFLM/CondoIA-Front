"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LoaderScreenProps {
  minimumDisplayTime?: number
  onLoadComplete?: () => void
  message?: string
}

export function LoaderScreen({
  minimumDisplayTime = 1000,
  onLoadComplete,
  message = "Carregando...",
}: LoaderScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulação de carregamento
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onLoadComplete) onLoadComplete()
    }, minimumDisplayTime)

    return () => clearTimeout(timer)
  }, [minimumDisplayTime, onLoadComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-16 h-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0"
              >
                <Loader2 className="w-16 h-16 text-primary" />
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-foreground"
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
