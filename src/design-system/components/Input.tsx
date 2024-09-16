"use client"

import { forwardRef } from "react"
import type { ComponentRef, ComponentPropsWithoutRef } from "react"
import { tv } from "tailwind-variants"
import type { VariantProps } from "tailwind-variants"
import { cn } from "@/design-system/lib/utils"
import { useFormFieldContext } from "./FormField"

export const input = tv({
  slots: {
    base: "overflow-hidden autofill-style rounded flex fl-text-step--1 items-center file:border-0 file:bg-transparent file:text-sm file:font-medium  border-2 border-solid w-full bg-white transition-[border-color] ease-in-out group focus-within:outline focus-within:outline-4",
    inputElement:
      'placeholder-neutral-400 w-full text-ellipsis outline-none h-full min-h-[theme("spacing.12")] bg-transparent ',
  },
  variants: {
    startSlot: {
      false: {
        inputElement: "pl-4",
      },
      true: {},
    },
    endSlot: {
      false: {
        inputElement: "pr-4",
      },
      true: {},
    },
    state: {
      destructive: {
        base: "border-destructive-400  focus-within:outline-destructive-400/50",
      },
      positive: {
        base: "border-positive-400  focus-within:border-positive-500 focus-within:outline-positive-500/50",
      },
      warn: {
        base: "border-warn-400 focus-within:border-warn-500 focus-within:outline-warn-500/50",
      },
      neutral: {
        base: "border-neutral-300 hover:border-neutral-400 hover:focus-within:border-primary-500 focus-within:border-primary-500 focus-within:outline-primary-400/50",
      },
    },
  },
  defaultVariants: {
    state: "neutral",
    startSlot: false,
    endSlot: false,
  },
})

export interface InputProps extends Omit<VariantProps<typeof input>, "startSlot" | "endSlot"> {
  startSlot?: React.ReactNode
  endSlot?: React.ReactNode
  baseProps?: ComponentPropsWithoutRef<"div">
}

const _Input = forwardRef<ComponentRef<"input">, InputProps & ComponentPropsWithoutRef<"input">>(
  (props, ref) => {
    let context: ReturnType<typeof useFormFieldContext> | undefined = undefined
    try {
      context = useFormFieldContext()
    } catch (e) {
      // do nothing
    }
    const { children, className, state, startSlot, endSlot, baseProps, ...rest } = {
      ...context,
      ...props,
    }
    const { className: baseClassName, ...baseRest } = baseProps ?? {}

    const { base, inputElement } = input({ state, startSlot: !!startSlot, endSlot: !!endSlot })
    return (
      <div className={cn(base(), baseClassName)} {...baseRest}>
        {startSlot}
        <input
          ref={ref}
          className={cn(
            inputElement(),

            className,
          )}
          {...rest}
        />
        {endSlot}
      </div>
    )
  },
)

export const inputAffix = tv({
  base: "",
  variants: {
    size: {
      md: "px-2",
      lg: "px-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface InputAffixProps extends VariantProps<typeof inputAffix> {}

const InputAffix = forwardRef<
  ComponentRef<"div">,
  InputAffixProps & ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { children, className, size, ...rest } = props

  return (
    <div ref={ref} className={cn(inputAffix({ size }), className)} {...rest}>
      {children}
    </div>
  )
})

export const Input = Object.assign(_Input, { Affix: InputAffix })
