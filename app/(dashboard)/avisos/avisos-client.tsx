"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDataRequest } from "@/hooks/use-data-request"
import { ErrorMessage } from "@/components/ui/error-message"
import { PageTransition } from "@/components/ui/page-transition"
import { useIsMobile } from "@/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"

interface Aviso {
  id: string
  titulo: string
  conteudo: string
  data: string
  autor: string
  importante: boolean
}

const mockAvisos: Aviso[] = [
  {
    id: "1",
    titulo: "Manutenção na piscina",
    conteudo: "Informamos que a piscina ficará fechada para manutenção nos dias 10 e 11 de novembro.",
    data: "2023-11-05",
    autor: "Administração",
    importante: true,
  },
  {
    id: "2",
    titulo: "Assembleia de moradores",
    conteudo:
      "Convidamos todos os moradores para a assembleia que ocorrerá no dia 15 de novembro às 19h no salão de festas.",
    data: "2023-11-01",
    autor: "Síndico",
    importante: true,
  },
  {
    id: "3",
    titulo: "Novos horários da academia",
    conteudo: "A partir do dia 01/12, a academia funcionará das 6h às 22h todos os dias.",
    data: "2023-10-28",
    autor: "Administração",
    importante: false,
  },
  {
    id: "4",
    titulo: "Limpeza das caixas d'água",
    conteudo:
      "No dia 20/11 será realizada a limpeza semestral das caixas d'água. O fornecimento será interrompido das 8h às 12h.",
    data: "2023-10-25",
    autor: "Manutenção",
    importante: true,
  },
  {
    id: "5",
    titulo: "Campanha de reciclagem",
    conteudo:
      "Participe da campanha de reciclagem. Separe seus resíduos e deposite nos coletores apropriados no térreo.",
    data: "2023-10-20",
    autor: "Comissão de Sustentabilidade",
    importante: false,
  },
]

export function AvisosClient() {
  const { data: avisos, isLoading, error } = useDataRequest<Aviso[]>("avisos", mockAvisos)
  const [filtro, setFiltro] = useState<"todos" | "importantes">("todos")
  const isMobile = useIsMobile()

  if (error) {
    return <ErrorMessage message="Erro ao carregar avisos" />
  }

  const avisosFiltrados = avisos ? (filtro === "importantes" ? avisos.filter((aviso) => aviso.importante) : avisos) : []

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR")
  }

  return (
    <PageTransition>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Avisos</h1>
            <p className="text-muted-foreground">Comunicados importantes do condomínio</p>
          </div>
          <div className="flex gap-2">
            <Button variant={filtro === "todos" ? "default" : "outline"} size="sm" onClick={() => setFiltro("todos")}>
              Todos
            </Button>
            <Button
              variant={filtro === "importantes" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltro("importantes")}
            >
              Importantes
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {avisosFiltrados.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <p className="text-muted-foreground">Nenhum aviso encontrado</p>
                </CardContent>
              </Card>
            ) : (
              avisosFiltrados.map((aviso) => (
                <Card key={aviso.id} className={aviso.importante ? "border-l-4 border-l-red-500" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{aviso.titulo}</CardTitle>
                        <CardDescription>
                          {formatarData(aviso.data)} • {aviso.autor}
                        </CardDescription>
                      </div>
                      {aviso.importante && (
                        <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Importante</div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{aviso.conteudo}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
