"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { tv, type VariantProps } from "tailwind-variants"
import type { ComponentPropsWithoutRef, ElementRef } from "react"

export const checkbox = tv({
  slots: {
    base: "peer h-5 w-5 shrink-0 rounded-sm border-2 border-primary ring-offset-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary hover:data-[state=checked]:border-primary-600",
    indicator: "flex items-center justify-center text-current",
    icon: "h-5 w-5 -translate-y-[1px]",
  },
  variants: {
    state: {
      destructive: {
        base: "border-destructive-400 bg-destructive-50 focus-within:outline-destructive-400/50",
      },
      positive: {
        base: "border-positive-400  focus-within:border-positive-500 focus-within:outline-positive-500/50",
      },
      warn: {
        base: "border-warn-400 focus-within:border-warn-500 focus-within:outline-warn-500/50",
      },
      neutral: {
        base: "border-neutral-300 hover:border-neutral-400 hover:focus-within:border-secondary-500 focus-within:border-secondary-500 focus-within:outline-secondary-400/50",
      },
    },
  },

  defaultVariants: {
    state: "neutral",
  },
})

export type CheckboxProps = VariantProps<typeof checkbox> & {}

export const Checkbox = React.forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & CheckboxProps
>(({ className, state, ...props }, ref) => {
  const { base, indicator, icon } = checkbox({ state })

  return (
    <CheckboxPrimitive.Root ref={ref} className={base()} {...props}>
      <CheckboxPrimitive.Indicator className={indicator()}>
        <Check className={icon()} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
