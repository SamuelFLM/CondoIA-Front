"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  id: string
  label: string
  type?: "text" | "email" | "password" | "number" | "tel" | "date" | "textarea" | "select"
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  options?: { value: string; label: string }[]
  min?: number | string
  max?: number | string
  pattern?: string
  mask?: (value: string) => string
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className,
  options = [],
  min,
  max,
  pattern,
  mask,
}: FormFieldProps) {
  const [touched, setTouched] = useState(false)
  const showError = touched && error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newValue = e.target.value

    if (mask) {
      newValue = mask(newValue)
    }

    onChange(newValue)
  }

  const handleBlur = () => {
    setTouched(true)
  }

  const handleSelectChange = (value: string) => {
    onChange(value)
    setTouched(true)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(showError && "border-destructive")}
          required={required}
        />
      ) : type === "select" ? (
        <Select value={value} onValueChange={handleSelectChange} disabled={disabled} required={required}>
          <SelectTrigger id={id} className={cn(showError && "border-destructive")}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(showError && "border-destructive")}
          required={required}
          min={min}
          max={max}
          pattern={pattern}
        />
      )}

      {showError && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
