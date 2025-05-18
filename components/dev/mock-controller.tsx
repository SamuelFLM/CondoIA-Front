"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { getMockConfig, updateMockConfig, resetMockConfig, type MockConfig } from "@/lib/mock-config"
import { AlertCircle, Bug, RefreshCw, Clock, Wifi, Ban, FileWarning } from "lucide-react"

export function MockController() {
  const [config, setConfig] = useState<MockConfig>(getMockConfig())
  const [expanded, setExpanded] = useState(false)

  // Atualizar estado local quando a configuração global mudar
  useEffect(() => {
    const interval = setInterval(() => {
      setConfig(getMockConfig())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Atualizar configuração global quando o estado local mudar
  const updateConfig = (newConfig: Partial<MockConfig>) => {
    const updated = updateMockConfig(newConfig)
    setConfig(updated)
  }

  // Resetar configuração
  const handleReset = () => {
    const reset = resetMockConfig()
    setConfig(reset)
  }

  // Simular erro específico
  const simulateError = (type: string) => {
    updateConfig({
      simulateRandomErrors: true,
      errorProbability: 1.0,
      errorTypes: [{ type: type as any, probability: 1.0 }],
    })

    // Restaurar configuração após 5 segundos
    setTimeout(() => {
      updateConfig({
        simulateRandomErrors: false,
        errorProbability: 0.2,
        errorTypes: getMockConfig().errorTypes,
      })
    }, 5000)
  }

  // Se não estiver em desenvolvimento, não renderizar
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg z-50 bg-background/95 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center">
            <Bug className="h-4 w-4 mr-2" />
            Controlador de Mocks
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Minimizar" : "Expandir"}
          </Button>
        </div>
        {expanded && (
          <CardDescription className="text-xs">Configure o comportamento dos mocks para testes</CardDescription>
        )}
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="mock-enabled" className="flex items-center">
              <span className="mr-2">Mocks Habilitados</span>
            </Label>
            <Switch
              id="mock-enabled"
              checked={config.enabled}
              onCheckedChange={(checked) => updateConfig({ enabled: checked })}
            />
          </div>

          {expanded && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mock-delay" className="text-sm">
                    Delay (ms): {config.delay}
                  </Label>
                  <div className="w-32">
                    <Slider
                      id="mock-delay"
                      min={0}
                      max={3000}
                      step={100}
                      value={[config.delay]}
                      onValueChange={(value) => updateConfig({ delay: value[0] })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="mock-errors" className="flex items-center">
                  <span className="mr-2">Simular Erros</span>
                </Label>
                <Switch
                  id="mock-errors"
                  checked={config.simulateRandomErrors}
                  onCheckedChange={(checked) => updateConfig({ simulateRandomErrors: checked })}
                />
              </div>

              {config.simulateRandomErrors && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="error-probability" className="text-sm">
                      Probabilidade: {Math.round(config.errorProbability * 100)}%
                    </Label>
                    <div className="w-32">
                      <Slider
                        id="error-probability"
                        min={0}
                        max={1}
                        step={0.05}
                        value={[config.errorProbability]}
                        onValueChange={(value) => updateConfig({ errorProbability: value[0] })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>

      {expanded && (
        <CardFooter className="flex-col items-stretch pt-0">
          <div className="text-xs font-medium mb-2">Simular Erros Específicos:</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button size="sm" variant="outline" onClick={() => simulateError("network")} className="h-8">
              <Wifi className="h-3 w-3 mr-1" />
              Rede
            </Button>
            <Button size="sm" variant="outline" onClick={() => simulateError("timeout")} className="h-8">
              <Clock className="h-3 w-3 mr-1" />
              Timeout
            </Button>
            <Button size="sm" variant="outline" onClick={() => simulateError("server")} className="h-8">
              <AlertCircle className="h-3 w-3 mr-1" />
              Servidor (500)
            </Button>
            <Button size="sm" variant="outline" onClick={() => simulateError("auth")} className="h-8">
              <Ban className="h-3 w-3 mr-1" />
              Auth (401)
            </Button>
            <Button size="sm" variant="outline" onClick={() => simulateError("forbidden")} className="h-8">
              <Ban className="h-3 w-3 mr-1" />
              Forbidden (403)
            </Button>
            <Button size="sm" variant="outline" onClick={() => simulateError("validation")} className="h-8">
              <FileWarning className="h-3 w-3 mr-1" />
              Validação (422)
            </Button>
          </div>
          <Button size="sm" variant="secondary" onClick={handleReset} className="w-full mt-2">
            <RefreshCw className="h-3 w-3 mr-2" />
            Resetar Configuração
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
