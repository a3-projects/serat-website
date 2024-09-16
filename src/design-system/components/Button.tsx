import { cn } from "@/design-system/lib/utils"
import { Loader2 } from "lucide-react"
import { type ComponentPropsWithRef } from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const button = tv({
  base: "relative inline-flex items-center justify-center cursor-pointer",
  variants: {
    variant: {
      solid: "",
      outline: "border-2 border-solid",
      ghost: "",
    },
    color: {
      primary: "",
      secondary: "",
      positive: "",
      destructive: "",
      warn: "",
      neutral: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    circle: {
      true: "rounded-full flex-shrink-0",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "primary",
    circle: false,
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      class: "bg-primary-600 hover:bg-primary-700 text-white ",
    },
    {
      variant: "solid",
      color: "secondary",
      class: "bg-secondary-600 hover:bg-secondary-700 text-white ",
    },
    {
      variant: "solid",
      color: "positive",
      class: "bg-positive-500 hover:bg-positive-600 text-white",
    },
    {
      variant: "solid",
      color: "destructive",
      class: "bg-destructive-500 hover:bg-destructive-600 text-white",
    },
    {
      variant: "solid",
      color: "warn",
      class: "bg-warn-500 hover:bg-warn-600 text-white",
    },
    {
      variant: "solid",
      color: "neutral",
      class: "bg-neutral-500 hover:bg-neutral-600 text-white",
    },
    {
      variant: "outline",
      color: "primary",
      class: "border-primary-500 text-primary-500 hover:bg-primary-100/50",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "border-secondary-500 text-secondary-500 hover:bg-secondary-100/50",
    },
    {
      variant: "outline",
      color: "positive",
      class: "border-positive-500 text-positive-500 hover:bg-positive-100/50",
    },
    {
      variant: "outline",
      color: "destructive",
      class: "border-destructive-500 text-destructive-500 hover:bg-destructive-100/50",
    },
    {
      variant: "outline",
      color: "warn",
      class: "border-warn-500 text-warn-500 hover:bg-warn-100/50",
    },
    {
      variant: "ghost",
      color: "primary",
      class: "hover:bg-primary-400/20 text-primary-500",
    },
    {
      variant: "ghost",
      color: "secondary",
      class: "hover:bg-secondary-400/20 text-secondary-500",
    },
    {
      variant: "ghost",
      color: "positive",
      class: "hover:bg-positive-400/20 text-positive-500",
    },
    {
      variant: "ghost",
      color: "destructive",
      class: "hover:bg-destructive-400/20 text-destructive-500",
    },
    {
      variant: "ghost",
      color: "warn",
      class: "hover:bg-warn-400/20 text-warn-500",
    },
    {
      variant: "ghost",
      color: "neutral",
      class: "hover:bg-neutral-400/20 text-neutral-500",
    },
    {
      variant: "outline",
      color: "neutral",
      class: "border-neutral-500 text-neutral-500",
    },
    {
      circle: false,
      size: "sm",
      class: "px-3 py-1 min-h-8 rounded fl-text-step--2",
    },
    {
      circle: false,
      size: "md",
      class: "px-4 py-1 min-h-10 rounded fl-text-step--1",
    },
    {
      circle: false,
      size: "lg",
      class: "px-6 py-1 min-h-12 rounded fl-text-step--1",
    },

    {
      circle: true,
      size: "sm",
      class: "h-8 w-8 ",
    },
    {
      circle: true,
      size: "md",
      class: "h-10 w-10",
    },
    {
      circle: true,
      size: "lg",
      class: "h-12 w-12",
    },
  ],
})

export type ButtonProps = VariantProps<typeof button> & {
  loading?: boolean
}

export const Button = ({
  variant,
  size,
  color,
  circle,
  className,
  children,
  loading,
  ...props
}: ButtonProps & ComponentPropsWithRef<"button">) => {
  return (
    <button className={button({ variant, size, color, circle, className })} {...props}>
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div
        className={cn("flex h-full w-full items-center justify-center", {
          "pointer-events-none opacity-0": loading,
        })}
      >
        {children}
      </div>
    </button>
  )
}
