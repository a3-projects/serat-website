import { type VariantProps, tv } from "tailwind-variants"

import { createContext, forwardRef, useContext } from "react"
import type { ElementRef, ComponentPropsWithoutRef } from "react"
import { UploadIcon } from "lucide-react"

export const fileUpload = tv({
  base: "border-2 w-full rounded bg-neutral-50 hover:bg-neutral-100 cursor-pointer hover:border-neutral-400 border-neutral-300 border-dashed ~p-8/12 relative flex flex-col items-center justify-center focus-within:outline focus-within:outline-4",
  variants: {
    state: {
      destructive: "border-destructive-400  focus-within:outline-destructive-400/50",
      positive:
        "border-positive-400  focus-within:border-positive-500 focus-within:outline-positive-500/50",
      warn: "border-warn-400 focus-within:border-warn-500 focus-within:outline-warn-500/50",
      neutral:
        "border-neutral-300 hover:border-neutral-400 hover:focus-within:border-primary-500 focus-within:border-primary-500 focus-within:outline-primary-400/50",
    },
  },
  defaultVariants: {
    state: "neutral",
  },
})

export interface FileUploadProps extends VariantProps<typeof fileUpload> {}

const _FileUpload = forwardRef<
  ElementRef<"div">,
  FileUploadProps & ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { children, className, state, ...rest } = props
  return (
    <FileUploadContext.Provider value={{ state }}>
      <div ref={ref} className={fileUpload({ state, className })} {...rest}>
        {children}
      </div>
    </FileUploadContext.Provider>
  )
})

export const FileUploadContext = createContext<Pick<FileUploadProps, "state"> | undefined>(
  undefined,
)
export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext)
  if (!context)
    throw new Error(
      "FileUploadContext used without Provider in the parent tree. Please make sure your component is a child of AAlert.",
    )
  return context
}

export const fileUploadInput = tv({
  base: "opacity-0 absolute w-full h-full text-fg z-10 cursor-pointer",
})

export interface FileUploadInputProps extends VariantProps<typeof fileUploadInput> {}

const FileUploadInput = forwardRef<
  ElementRef<"input">,
  FileUploadInputProps & ComponentPropsWithoutRef<"input">
>((props, ref) => {
  const { children, className, ...rest } = props
  return (
    <input type="file" ref={ref} className={fileUploadInput({ className })} {...rest}>
      {children}
    </input>
  )
})

export const fileUploadBody = tv({
  base: "absolute left-0 top-0 z-10 w-full h-full flex flex-col  flex-grow justify-end items-start ",
})

export interface FileUploadBodyProps extends VariantProps<typeof fileUploadBody> {}

const FileUploadBody = forwardRef<
  ElementRef<"div">,
  FileUploadBodyProps & ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { children, className, ...rest } = props

  return (
    <div ref={ref} className={fileUploadBody({})} {...rest}>
      {children}
    </div>
  )
})

export const fileUploadTrigger = tv({
  base: "flex flex-col gap-2 items-center justify-center group  fl-text-step--2 w-full h-full ",
})

export interface FileUploadTriggerProps extends VariantProps<typeof fileUploadTrigger> {
  label?: string
  iconSlot?: React.ReactNode
}

const FileUploadTrigger = forwardRef<
  ElementRef<"div">,
  FileUploadTriggerProps & ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { children, className, label = "Bild Hochladen", iconSlot, ...rest } = props

  return (
    <div ref={ref} className={fileUploadTrigger({ className })} {...rest}>
      <>
        <div>
          <div className="svg-font-scale text-xl text-primary-600">
            {!!iconSlot ? iconSlot : <UploadIcon />}
          </div>
        </div>
        <span>{label}</span>
        {children}
      </>
    </div>
  )
})

export const FileUpload = Object.assign(_FileUpload, {
  Input: FileUploadInput,
  Body: FileUploadBody,
  Trigger: FileUploadTrigger,
})
