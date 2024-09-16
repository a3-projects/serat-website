import type { ComponentPropsWithRef } from "react"
import { tv } from "tailwind-variants"
import type { VariantProps } from "tailwind-variants"

export const main = tv({
  base: "min-h-screen w-full relative z-0",
})

export interface MainProps extends VariantProps<typeof main> {}

export const Main = (props: MainProps & ComponentPropsWithRef<"main">) => {
  const { children, className, ...rest } = props

  return (
    <main className={main({ className })} {...rest}>
      {children}
    </main>
  )
}
