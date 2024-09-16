import { type ComponentPropsWithoutRef } from "react"
import { type VariantProps, tv } from "tailwind-variants"

const textHighlight = tv({
  slots: {
    base: "relative inline-block z-10",
    underline:
      "absolute bottom-0 -translate-x-1/2 left-1/2 w-full h-full w-[calc(100%_+_0.2em)] -z-10 ",
  },
  variants: {
    color: {
      primary: {
        base: "",
        underline: "bg-primary-500/30",
      },
    },
    tilt: {
      sm: { underline: "-skew-y-1" },
      default: { underline: "-skew-y-2" },
    },
  },
  defaultVariants: {
    color: "primary",
    tilt: "default",
  },
})

export type TextHighlightProps = VariantProps<typeof textHighlight> &
  ComponentPropsWithoutRef<"span">

export const TextHighlight = ({ className, color, tilt, ...props }: TextHighlightProps) => {
  const { base, underline } = textHighlight({ color, tilt })
  return (
    <span className={base({ className })} {...props}>
      {props.children}

      <span className={underline()} aria-hidden="true"></span>
    </span>
  )
}
