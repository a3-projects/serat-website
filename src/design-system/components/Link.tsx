import { type ComponentPropsWithRef } from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const link = tv({
  base: " decoration-thickness-1 relative inline-flex items-baseline",
  variants: {
    variant: {
      plain: "hover:underline",
      animated:
        "text-primary-600 underline underline-offset-[8px] before:border-primary-500  relative  before:h-full before:scale-y-0 hover:before:scale-y-100 before:transition-all before:origin-bottom before:w-full before:absolute before:bg-primary-500/20 before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2",
    },
  },
  defaultVariants: {
    variant: "animated",
    target: undefined,
  },
})

export type LinkProps = VariantProps<typeof link> & {
  external?: boolean
}

export const Link = ({
  className,
  variant,
  children,
  external,
  ...props
}: LinkProps & ComponentPropsWithRef<"a">) => {
  return (
    <a
      className={link({ className, variant })}
      rel={external ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
      {props.target === "_blank" && <>↗</>}
    </a>
  )
}
