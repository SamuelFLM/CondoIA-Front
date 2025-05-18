"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getConfig, updateConfig, type AppConfig } from "@/lib/config-service"

export default function ConfigController() {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carrega a configuração atual
    const currentConfig = getConfig()
    setConfig(currentConfig)
    setLoading(false)
  }, [])

  const handleToggleMocks = () => {
    if (!config) return

    const newConfig = updateConfig({
      useMockData: !config.useMockData,
    })

    setConfig(newConfig)
    // Recarrega a página para aplicar as alterações
    window.location.reload()
  }

  const handleUpdateApiUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!config) return

    const newConfig = updateConfig({
      apiUrl: e.target.value,
    })

    setConfig(newConfig)
  }

  const handleUpdateMockDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!config) return

    const delay = Number.parseInt(e.target.value)
    if (isNaN(delay)) return

    const newConfig = updateConfig({
      mockDelay: delay,
    })

    setConfig(newConfig)
  }

  if (loading) {
    return <div>Carregando configurações...</div>
  }

  if (!config) {
    return <div>Erro ao carregar configurações</div>
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Configurações do Sistema</h2>

      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" checked={config.useMockData} onChange={handleToggleMocks} className="mr-2" />
          Usar dados mockados
        </label>
        <p className="text-sm text-gray-500 mt-1">
          Quando ativado, o sistema usará dados fictícios em vez de fazer chamadas à API.
        </p>
      </div>

      <div className="mb-4">
        <label className="block mb-1">URL da API:</label>
        <input type="text" value={config.apiUrl} onChange={handleUpdateApiUrl} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Atraso simulado (ms):</label>
        <input
          type="number"
          value={config.mockDelay}
          onChange={handleUpdateMockDelay}
          className="w-full p-2 border rounded"
          min="0"
          max="5000"
        />
        <p className="text-sm text-gray-500 mt-1">Simula o atraso da rede quando usando dados mockados.</p>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded text-sm">
        <p>
          <strong>Nota:</strong> Alterações nas configurações serão mantidas entre recarregamentos da página.
        </p>
      </div>
    </div>
  )
}
