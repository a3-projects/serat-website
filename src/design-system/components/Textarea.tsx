"use client"

import type { ComponentPropsWithRef } from "react"
import { tv } from "tailwind-variants"
import type { VariantProps } from "tailwind-variants"
import { useFormFieldContext } from "./FormField"
import { type InputProps, input } from "./Input"
import { cn } from "@/design-system/lib/utils"

export const textArea = tv({
  base: "py-4 h-40",
})

export interface TextAreaProps extends VariantProps<typeof textArea>, InputProps {}

const TextArea = (props: TextAreaProps & ComponentPropsWithRef<"textarea">) => {
  let context: ReturnType<typeof useFormFieldContext> | undefined = undefined
  try {
    context = useFormFieldContext()
  } catch (e) {
    // do nothing
  }
  const { children, className, state, startSlot, endSlot, ref, ...rest } = {
    ...context,
    ...props,
  }
  const { base, inputElement } = input({ state, startSlot: !!startSlot, endSlot: !!endSlot })
  return (
    <div className={cn(base())}>
      {startSlot}
      <textarea
        ref={ref}
        className={cn(
          inputElement(),
          textArea(),

          className,
        )}
        {...rest}
      />
      {endSlot}
    </div>
  )
}

export { TextArea }
