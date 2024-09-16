"use client"

import {
  FormField,
  getFormState,
  type CommonFormFieldProps,
} from "@/design-system/components/FormField"
import { Input } from "@/design-system/components/Input"
import { forwardRef, useId } from "react"
import type { ElementRef, ComponentPropsWithoutRef } from "react"
import { tv } from "tailwind-variants"

export const textField = tv({
  base: "",
})

export interface TextFieldProps extends CommonFormFieldProps {
  captionSlot?: React.ReactNode
}

const _TextField = forwardRef<
  ElementRef<typeof Input>,
  TextFieldProps & ComponentPropsWithoutRef<typeof Input>
>((props, ref) => {
  const { children, className, state, label, errors, captionSlot, ...rest } = props

  const formState = getFormState(props)
  const fieldId = useId()

  return (
    <FormField state={formState}>
      <FormField.Label htmlFor={fieldId}>{label}</FormField.Label>
      <Input ref={ref} id={fieldId} className={textField({ className })} {...rest} />
      {!!errors && (
        <FormField.Caption>
          {(typeof errors === "string" ? errors : errors?.message) ?? "Fehler"}
        </FormField.Caption>
      )}
      {!errors && captionSlot}

      {children}
    </FormField>
  )
})

export const TextField = Object.assign(_TextField, {
  Caption: FormField.Caption,
  Affix: Input.Affix,
})
