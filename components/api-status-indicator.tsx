"use client";

import { useState, useEffect } from "react";
import { getConfig } from "@/lib/config-service";
import { AlertCircle, CheckCircle2, CloudOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApiStatusIndicator({ className }: { className?: string }) {
  const [status, setStatus] = useState<"online" | "offline" | "checking">(
    "checking"
  );
  const config = getConfig();

  useEffect(() => {
    const checkApiStatus = async () => {
      // Como estamos sempre no modo mock, definir como offline/mock
      // setStatus("offline")
      // Código original comentado
      // Se estiver no modo mock, não precisa verificar a API
      if (config.useMockData) {
        setStatus("offline");
        return;
      }

      try {
        // Tenta fazer uma requisição simples para verificar se a API está online
        const response = await fetch(`${config.apiUrl}/health`, {
          method: "HEAD",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        setStatus(response.ok ? "online" : "offline");
      } catch (error) {
        console.error("Erro ao verificar status da API:", error);
        setStatus("offline");
      }
    };

    checkApiStatus();

    // Verifica o status da API a cada 30 segundos
    // const interval = setInterval(checkApiStatus, 30000);

    // return () => clearInterval(interval);
  }, [config.apiUrl, config.useMockData]);

  return (
    <div className={cn("flex items-center gap-1.5 text-xs", className)}>
      {status === "checking" && (
        <>
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></span>
          <span className="text-muted-foreground">Verificando API...</span>
        </>
      )}

      {status === "online" && (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
          <span className="text-muted-foreground">API Online</span>
        </>
      )}

      {status === "offline" && (
        <>
          {config.useMockData ? (
            <>
              <CloudOff className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-muted-foreground">Modo Offline</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-3.5 w-3.5 text-destructive" />
              <span className="text-muted-foreground">API Offline</span>
            </>
          )}
        </>
      )}
    </div>
  );
}
