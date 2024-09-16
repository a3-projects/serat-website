import { type ComponentPropsWithoutRef } from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const text = tv({
  base: "leading-[1.1]",
  variants: {
    ty: {
      hero: "~text-4xl/6xl font-bold",
      h1: "~text-xl/4xl font-bold",
      h2: "~text-lg/2xl font-bold",
      subtitle: "~text-lg/2xl ",
      body: "~text-base/lg",
      base: "text-base",

      caption: "text-sm",
      "caption-sm": "text-xs",
    },
  },
  defaultVariants: {
    ty: "body",
  },
})

export type TextElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "em"
  | "abbr"
  | "cite"
  | "code"

export type TextProps<T extends TextElement> = {
  as?: T
} & VariantProps<typeof text> &
  ComponentPropsWithoutRef<T>

export const Text = <T extends TextElement = "p">({
  as,
  ty,
  className,
  ...props
}: TextProps<T>) => {
  const Component = as || "p"
  return <Component className={text({ ty, className })} {...props} />
}
