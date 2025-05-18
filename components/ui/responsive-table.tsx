"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useMobileDetect } from "@/hooks/use-mobile"

export interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
  sortable?: boolean
  searchable?: boolean
  filterOptions?: { label: string; value: string }[]
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  emptyMessage?: string
  keyExtractor: (item: T) => string | number
  onRowClick?: (item: T) => void
  className?: string
  searchPlaceholder?: string
  initialSortColumn?: keyof T
  initialSortDirection?: "asc" | "desc"
}

export function ResponsiveTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = "Nenhum dado encontrado",
  keyExtractor,
  onRowClick,
  className,
  searchPlaceholder = "Buscar...",
  initialSortColumn,
  initialSortDirection = "asc",
}: ResponsiveTableProps<T>) {
  const { isMobile } = useMobileDetect()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof T | null>(initialSortColumn || null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(initialSortDirection)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [showFilters, setShowFilters] = useState(false)

  // Função para ordenar dados
  const sortData = (data: T[]) => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1
      return sortDirection === "asc" ? comparison : -comparison
    })
  }

  // Função para filtrar dados
  const filterData = (data: T[]) => {
    let filteredData = data

    // Aplicar filtros ativos
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter((item) => {
          const columnKey = key as keyof T
          return String(item[columnKey]).toLowerCase() === value.toLowerCase()
        })
      }
    })

    // Aplicar termo de busca
    if (searchTerm) {
      filteredData = filteredData.filter((item) => {
        return columns.some((column) => {
          if (!column.searchable) return false
          const value = item[column.accessorKey]
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }

    return filteredData
  }

  // Alternar direção de ordenação
  const toggleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Aplicar filtro
  const applyFilter = (column: keyof T, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [column]: value,
    }))
  }

  // Remover filtro
  const removeFilter = (column: keyof T) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[column as string]
      return newFilters
    })
  }

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setActiveFilters({})
    setSearchTerm("")
  }

  // Processar dados (filtrar e ordenar)
  const processedData = sortData(filterData(data))

  // Renderizar esqueletos durante carregamento
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Skeleton className="h-10 w-full max-w-xs" />
          <Skeleton className="h-10 w-24" />
        </div>
        {isMobile ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.map((column, index) => (
                      <th key={index} className="px-4 py-3 text-left">
                        <Skeleton className="h-4 w-24" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {columns.map((_, colIndex) => (
                        <td key={colIndex} className="px-4 py-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Renderizar mensagem quando não há dados
  if (processedData.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-grow">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)} aria-label="Filtros">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          {(searchTerm || Object.keys(activeFilters).length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="mr-2 h-4 w-4" />
              Limpar filtros
            </Button>
          )}
        </div>

        {Object.keys(activeFilters).length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {Object.entries(activeFilters).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {columns.find((col) => col.accessorKey === key)?.header}: {value}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => removeFilter(key as keyof T)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-center py-8 text-muted-foreground">{emptyMessage}</div>
      </div>
    )
  }

  // Renderização para dispositivos móveis
  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-grow">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)} aria-label="Filtros">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          {(searchTerm || Object.keys(activeFilters).length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="mr-2 h-4 w-4" />
              Limpar filtros
            </Button>
          )}
        </div>

        {Object.keys(activeFilters).length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {Object.entries(activeFilters).map(([key, value]) => (
              <Badge key={key} variant="secondary" className="flex items-center gap-1">
                {columns.find((col) => col.accessorKey === key)?.header}: {value}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => removeFilter(key as keyof T)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {showFilters && columns.some((col) => col.filterOptions) && (
          <div className="p-4 border rounded-md bg-muted/50 space-y-4">
            <h4 className="font-medium">Filtros</h4>
            <div className="grid grid-cols-1 gap-4">
              {columns
                .filter((col) => col.filterOptions && col.filterOptions.length > 0)
                .map((column) => (
                  <div key={column.accessorKey as string} className="space-y-2">
                    <label className="text-sm font-medium">{column.header}</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={activeFilters[column.accessorKey as string] || ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          applyFilter(column.accessorKey, e.target.value)
                        } else {
                          removeFilter(column.accessorKey)
                        }
                      }}
                    >
                      <option value="">Todos</option>
                      {column.filterOptions?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(false)} className="w-full">
              Fechar filtros
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {processedData.map((item) => (
            <Card
              key={keyExtractor(item)}
              className={cn(
                "transition-colors w-full max-w-full overflow-hidden",
                onRowClick && "cursor-pointer hover:bg-accent",
              )}
              onClick={() => onRowClick && onRowClick(item)}
            >
              <CardContent className="p-3 sm:p-4 space-y-2">
                {columns.map((column) => (
                  <div
                    key={column.accessorKey as string}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 w-full"
                  >
                    <span className="font-medium text-sm">{column.header}:</span>
                    <span className={cn("break-words", column.className)}>
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] || "-")}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Renderização para desktop/tablet
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-grow">
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)} aria-label="Filtros">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        {(searchTerm || Object.keys(activeFilters).length > 0) && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="mr-2 h-4 w-4" />
            Limpar filtros
          </Button>
        )}
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 my-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {columns.find((col) => col.accessorKey === key)?.header}: {value}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter(key as keyof T)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {showFilters && columns.some((col) => col.filterOptions) && (
        <div className="p-4 border rounded-md bg-muted/50">
          <h4 className="font-medium mb-4">Filtros</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {columns
              .filter((col) => col.filterOptions && col.filterOptions.length > 0)
              .map((column) => (
                <div key={column.accessorKey as string} className="space-y-2">
                  <label className="text-sm font-medium">{column.header}</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={activeFilters[column.accessorKey as string] || ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        applyFilter(column.accessorKey, e.target.value)
                      } else {
                        removeFilter(column.accessorKey)
                      }
                    }}
                  >
                    <option value="">Todos</option>
                    {column.filterOptions?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(false)} className="mt-4">
            Fechar filtros
          </Button>
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((column) => (
                  <th
                    key={column.accessorKey as string}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium text-muted-foreground",
                      column.sortable && "cursor-pointer select-none",
                    )}
                    onClick={() => column.sortable && toggleSort(column.accessorKey)}
                  >
                    <div className="flex items-center gap-1">
                      {column.header}
                      {column.sortable &&
                        sortColumn === column.accessorKey &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className={cn("border-b transition-colors", onRowClick && "cursor-pointer hover:bg-accent")}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <td key={column.accessorKey as string} className={cn("px-4 py-3 text-sm", column.className)}>
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] || "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
