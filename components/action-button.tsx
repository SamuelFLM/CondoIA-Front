import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const actionButtonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      outline: "",
      secondary: "",
      ghost: "",
      link: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      loadingText,
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        className={cn(actionButtonVariants({ variant, size, className }), {
          "cursor-not-allowed opacity-70": isLoading,
        })}
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
          </>
        )}
      </Button>
    )
  },
)
ActionButton.displayName = "ActionButton"

export { ActionButton }
