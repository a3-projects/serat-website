import { ArrowUpIcon } from "lucide-react"
import { type ComponentPropsWithRef } from "react"
import { type VariantProps, tv } from "tailwind-variants"

export const fileUpload = tv({
  slots: {
    base: "border-2 rounded hover:bg-primary/30 cursor-pointer hover:border-primary border-neutral-300 border-dashed ~p-8/12 relative flex flex-col items-center justify-center",
    input: "opacity-0 absolute w-full h-full text-fg z-10 cursor-pointer",
  },
  variants: {},
  defaultVariants: {},
})

export type FileUploadProps = VariantProps<typeof fileUpload> & {
  label: string
}

export const FileUpload = ({
  className,
  label,
  ...props
}: FileUploadProps & ComponentPropsWithRef<"input">) => {
  const { base, input } = fileUpload()
  return (
    <div className={base({ className })}>
      <ArrowUpIcon className="text-primary-500" />
      <span>{label}</span>
      <input type="file" className={input()} {...props} />
    </div>
  )
}
