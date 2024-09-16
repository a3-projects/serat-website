import { Button } from "@/design-system/components/Button"
import { useFormFieldContext } from "@/design-system/components/FormField"
import { Text } from "@/design-system/components/Text"
import { FileIcon, XIcon } from "lucide-react"
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from "react"
import { tv } from "tailwind-variants"

export interface FileUploadPreviewProps {
  file: File
  onDelete: () => void
}

const fileUploadPreview = tv({
  base: "flex items-center ~gap-4/6 ~p-2/4",
  variants: {
    state: {
      destructive: "border-destructive-400",
      positive: "border-positive-400",
      warn: "border-warn-400",
      neutral: "border-neutral-300",
    },
  },
})

export const FileUploadPreview = forwardRef<
  ElementRef<"div">,
  FileUploadPreviewProps & ComponentPropsWithoutRef<"div">
>((props, ref) => {
  let context: ReturnType<typeof useFormFieldContext> | undefined
  try {
    context = useFormFieldContext()
  } catch (e) {
    // do nothing
  }
  const { children, className, file, onDelete, state, ...rest } = {
    ...context,
    ...props,
  }

  const fileSizeInMB = file.size ? (file.size / (1024 * 1024)).toFixed(2) : 0

  return (
    <div ref={ref} className={fileUploadPreview({ state })} {...rest}>
      <FileIcon strokeWidth={1} size={24} />
      <div className="flex w-full items-center justify-between ~gap-4/8">
        <div className="flex flex-col">
          <Text ty="caption" className="line-clamp-1">
            {file.name}
          </Text>
          <Text ty="caption-sm" className="uppercase text-neutral">
            {fileSizeInMB} MB
          </Text>
        </div>
        <Button
          onClick={onDelete}
          className="border"
          size="sm"
          variant="ghost"
          circle
          color="neutral"
        >
          <XIcon />
        </Button>
      </div>
    </div>
  )
})
