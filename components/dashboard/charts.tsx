"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Dados de exemplo para os gráficos
const dadosMensais = [
  { name: "Jan", despesas: 4000, receitas: 10000 },
  { name: "Fev", despesas: 3500, receitas: 10000 },
  { name: "Mar", despesas: 5000, receitas: 10000 },
  { name: "Abr", despesas: 4200, receitas: 10000 },
  { name: "Mai", despesas: 3800, receitas: 10000 },
  { name: "Jun", despesas: 5200, receitas: 10000 },
]

const dadosCategorias = [
  { name: "Manutenção", valor: 4000 },
  { name: "Limpeza", valor: 3000 },
  { name: "Segurança", valor: 2000 },
  { name: "Água", valor: 1500 },
  { name: "Energia", valor: 1800 },
  { name: "Outros", valor: 1000 },
]

const dadosChamados = [
  { name: "Jan", abertos: 12, resolvidos: 10 },
  { name: "Fev", abertos: 8, resolvidos: 7 },
  { name: "Mar", abertos: 15, resolvidos: 12 },
  { name: "Abr", abertos: 10, resolvidos: 9 },
  { name: "Mai", abertos: 7, resolvidos: 6 },
  { name: "Jun", abertos: 9, resolvidos: 8 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

const data = [
  {
    name: "Jan",
    abertos: 4,
    emAndamento: 2,
    concluidos: 6,
  },
  {
    name: "Fev",
    abertos: 3,
    emAndamento: 1,
    concluidos: 8,
  },
  {
    name: "Mar",
    abertos: 5,
    emAndamento: 3,
    concluidos: 7,
  },
  {
    name: "Abr",
    abertos: 6,
    emAndamento: 4,
    concluidos: 5,
  },
  {
    name: "Mai",
    abertos: 8,
    emAndamento: 4,
    concluidos: 12,
  },
  {
    name: "Jun",
    abertos: 7,
    emAndamento: 3,
    concluidos: 10,
  },
]

export function DashboardCharts({ data, isLoading }: { data?: any; isLoading?: boolean }) {
  const [periodoFinanceiro, setPeriodoFinanceiro] = useState("mensal")
  const [periodoTickets, setPeriodoTickets] = useState("mensal")
  const isMobile = useIsMobile()

  // Funções para formatação de valores
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(valor)
  }

  // Responsividade para gráficos
  const getChartHeight = () => {
    return isMobile ? 200 : 300
  }

  const getChartMargin = () => {
    return isMobile ? { top: 10, right: 10, left: 0, bottom: 0 } : { top: 20, right: 30, left: 20, bottom: 5 }
  }

  // Simplificar gráficos para mobile
  const getPieOuterRadius = () => {
    return isMobile ? 60 : 80
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Gráfico Financeiro */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Balanço Financeiro</CardTitle>
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriodoFinanceiro("mensal")}
              className={`px-2 py-1 text-xs rounded ${
                periodoFinanceiro === "mensal" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setPeriodoFinanceiro("categorias")}
              className={`px-2 py-1 text-xs rounded ${
                periodoFinanceiro === "categorias"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Categorias
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            {periodoFinanceiro === "mensal" && (
              <ResponsiveContainer width="100%" height={getChartHeight()}>
                <BarChart data={dadosMensais} margin={getChartMargin()} barSize={isMobile ? 15 : 20}>
                  {!isMobile && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
                  <XAxis dataKey="name" scale="point" fontSize={isMobile ? 10 : 12} />
                  <YAxis
                    tickFormatter={(value) => (isMobile ? `${value / 1000}k` : formatarMoeda(value))}
                    fontSize={isMobile ? 10 : 12}
                    width={isMobile ? 30 : 60}
                  />
                  <Tooltip
                    formatter={(value) => formatarMoeda(value as number)}
                    contentStyle={{ fontSize: isMobile ? "10px" : "12px" }}
                  />
                  {!isMobile && <Legend />}
                  <Bar dataKey="despesas" name="Despesas" fill="#f87171" />
                  <Bar dataKey="receitas" name="Receitas" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            )}

            {periodoFinanceiro === "categorias" && (
              <ResponsiveContainer width="100%" height={getChartHeight()}>
                <PieChart>
                  <Pie
                    data={dadosCategorias}
                    cx="50%"
                    cy="50%"
                    labelLine={!isMobile}
                    outerRadius={getPieOuterRadius()}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="name"
                    label={isMobile ? undefined : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {dadosCategorias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatarMoeda(value as number)} />
                  {!isMobile && <Legend layout="vertical" align="right" verticalAlign="middle" />}
                </PieChart>
              </ResponsiveContainer>
            )}

            {isMobile && (
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
                {periodoFinanceiro === "mensal" ? (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#f87171] rounded-sm"></div>
                      <span className="text-xs">Despesas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#4ade80] rounded-sm"></div>
                      <span className="text-xs">Receitas</span>
                    </div>
                  </>
                ) : (
                  dadosCategorias.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-xs">{item.name}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Chamados */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Chamados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="abertos" name="Abertos" fill="#f97316" />
                <Bar dataKey="emAndamento" name="Em Andamento" fill="#3b82f6" />
                <Bar dataKey="concluidos" name="Concluídos" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
