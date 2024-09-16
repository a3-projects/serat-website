"use client"

import { createContext, useContext } from "react"
import type { ComponentPropsWithRef } from "react"
import { tv } from "tailwind-variants"
import type { VariantProps } from "tailwind-variants"
import { cn } from "@/design-system/lib/utils"
import type { FieldError } from "react-hook-form"
import { text } from "@/design-system/components/Text"

export const formField = tv({
  base: "flex flex-col max-w-input w-full ",
  variants: {
    state: {
      neutral: "",
      positive: "",
      warn: "",
      destructive: "",
    },
  },
})

export interface FormFieldProps extends VariantProps<typeof formField> {}

const _FormField = (props: FormFieldProps & ComponentPropsWithRef<"div">) => {
  const { children, className, state, ref, ...rest } = props

  return (
    <FormFieldContext.Provider value={{ state }}>
      <div ref={ref} className={cn(formField({ state }), className)} {...rest}>
        {children}
      </div>
    </FormFieldContext.Provider>
  )
}

export const FormFieldContext = createContext<Pick<FormFieldProps, "state"> | undefined>(undefined)
export const useFormFieldContext = () => {
  const context = useContext(FormFieldContext)
  if (!context)
    throw new Error(
      "FormFieldContext used without Provider in the parent tree. Please make sure your component is a child of AAlert.",
    )
  return context
}

export const formFieldLabel = tv({
  base: " pb-1",
  variants: {
    state: {
      neutral: "text-neutral-950",
      positive: "text-positive-500",
      warn: "text-warn-500",
      destructive: "text-destructive-600",
    },
  },
})

export interface FormFieldLabelProps extends VariantProps<typeof formFieldLabel> {}

const FormFieldLabel = (props: FormFieldLabelProps & ComponentPropsWithRef<"label">) => {
  const context = useFormFieldContext()
  const { children, className, state, ref, ...rest } = { ...context, ...props }

  return (
    <label ref={ref} className={cn(formFieldLabel({ state }), className)} {...rest}>
      {children}
    </label>
  )
}

export const formFieldCaption = tv({
  base: text({ ty: "caption" }),
  variants: {
    state: {
      neutral: "text-neutral-500",
      positive: "text-positive-500",
      warn: "text-warn-500",
      destructive: "text-destructive-600",
    },
  },
})

export interface FormFieldCaptionProps extends VariantProps<typeof formFieldCaption> {}

const FormFieldCaption = (props: FormFieldCaptionProps & ComponentPropsWithRef<"p">) => {
  const context = useFormFieldContext()

  const { children, className, state, ref, ...rest } = { ...context, ...props }

  return (
    <p ref={ref} className={cn(formFieldCaption({ state }), className)} {...rest}>
      {children}
    </p>
  )
}

export const FormField = Object.assign(_FormField, {
  Label: FormFieldLabel,
  Caption: FormFieldCaption,
})

// utils
export interface CommonFormFieldProps {
  state?: FormFieldProps["state"]
  label: string
  errors?: FieldError | string
}

export const getFormState = (params: Pick<CommonFormFieldProps, "state" | "errors">) => {
  // Manually passed state always has perference
  if (params.state) {
    return params.state
  } else if (!!params.errors) {
    return "destructive"
  } else {
    return "neutral"
  }
}
