import { forwardRef, useId } from "react"
import type { ElementRef, ComponentPropsWithoutRef } from "react"
import {
  FormField,
  getFormState,
  type CommonFormFieldProps,
} from "@/design-system/components/FormField"
import { Checkbox } from "@/design-system/components/Checkbox"

export interface CheckboxFieldProps extends Omit<CommonFormFieldProps, "label"> {
  label: string
}

export const CheckboxField = forwardRef<
  ElementRef<typeof Checkbox>,
  CheckboxFieldProps & ComponentPropsWithoutRef<typeof Checkbox>
>((props, ref) => {
  const { children, className, state, label, errors, ...rest } = props
  const formState = getFormState(props)
  const id = useId()

  return (
    <FormField state={formState} className="items-start">
      <div className="flex gap-2">
        <Checkbox id={id} ref={ref} state={formState} {...rest} />
        <label className="leading-[1.3]" htmlFor={id}>
          {label}
        </label>
      </div>
      {!!errors && (
        <FormField.Caption>
          {(typeof errors === "string" ? errors : errors?.message) ?? "Fehler"}
        </FormField.Caption>
      )}
      {children}
    </FormField>
  )
})
