"use client"

import {
  FormField,
  getFormState,
  type CommonFormFieldProps,
} from "@/design-system/components/FormField"
import { TextArea } from "@/design-system/components/Textarea"
import { forwardRef, useId } from "react"
import type { ElementRef, ComponentPropsWithoutRef } from "react"

export interface TextareaFieldProps extends CommonFormFieldProps {}

export const TextareaField = forwardRef<
  ElementRef<typeof TextArea>,
  TextareaFieldProps & ComponentPropsWithoutRef<typeof TextArea>
>((props, ref) => {
  const { children, className, state, label, errors, ...rest } = props

  const formState = getFormState(props)
  const fieldId = useId()

  return (
    <FormField state={formState}>
      <FormField.Label htmlFor={fieldId}>{label}</FormField.Label>
      <TextArea id={fieldId} ref={ref} className={className} {...rest} />
      {!!errors && (
        <FormField.Caption>
          {(typeof errors === "string" ? errors : errors?.message) ?? "Fehler"}
        </FormField.Caption>
      )}
      {children}
    </FormField>
  )
})
