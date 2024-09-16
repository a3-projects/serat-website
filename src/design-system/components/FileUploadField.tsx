import { forwardRef, useEffect, useRef, useState, type MouseEvent } from "react"
import type { ElementRef, ComponentPropsWithoutRef, DragEvent } from "react"
import {
  FormField,
  getFormState,
  type CommonFormFieldProps,
} from "@/design-system/components/FormField"
import { FileUpload } from "@/design-system/components/FileUpload"
import { mergeRefs } from "@/design-system/lib/merge-refs"
import { createPortal } from "react-dom"
import { Text } from "@/design-system/components/Text"

export interface FileUploadFieldProps extends Omit<CommonFormFieldProps, "label"> {
  label: string
  onFilesDrop: (files: FileList) => void
}

export const FileUploadField = forwardRef<
  ElementRef<typeof FileUpload.Input>,
  FileUploadFieldProps & ComponentPropsWithoutRef<typeof FileUpload.Input>
>((props, ref) => {
  const { children, className, state, label, src, errors, onFilesDrop, onMouseDown, ...rest } =
    props
  const formState = getFormState(props)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isFieldVisible, setIsFieldVisible] = useState(false)

  const handleDragEnter = (e: globalThis.DragEvent) => {
    if (!isFieldVisible) return

    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!isFieldVisible) return

    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: globalThis.DragEvent) => {
    if (!isFieldVisible) return

    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!isFieldVisible) return

    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      onFilesDrop(e.dataTransfer.files)
    }
  }

  useEffect(() => {
    document.body.addEventListener("dragenter", handleDragEnter)
    document.body.addEventListener("dragover", handleDragOver)
    document.body.addEventListener("dragend", handleDragOver)

    const intersectionObserver = new IntersectionObserver(
      entries => {
        setIsFieldVisible(entries[0].isIntersecting)
      },
      {
        rootMargin: "1000px",
        threshold: 1.0,
      },
    )
    if (fileInputRef.current) {
      intersectionObserver.observe(fileInputRef.current)
    }

    return () => {
      document.body.removeEventListener("dragenter", handleDragEnter)
      document.body.removeEventListener("dragover", handleDragOver)
      document.body.removeEventListener("dragend", handleDragOver)
      if (fileInputRef.current) {
        intersectionObserver.unobserve(fileInputRef.current)
      }
    }
  }, [fileInputRef.current, handleDragEnter, handleDragOver, handleDragOver])

  const handleMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    if (onMouseDown) {
      onMouseDown(event)
    } else {
      // prevent onBlur event onMouseDown
      // this happens because the file selection window immediately takes focus after mousdown
      event.preventDefault()
    }
  }
  return (
    <FormField state={formState} className="items-start">
      {isFieldVisible &&
        isDragging &&
        createPortal(
          <div
            style={{ zIndex: 99999 }}
            className="z-90 fixed left-0 top-0 h-screen w-screen bg-primary-900/80 backdrop-blur-sm ~p-4/8"
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onClick={handleDrop}
          >
            <div className="flex h-full w-full items-center justify-center border-[14px] border-dashed border-white/50">
              <Text ty="hero" className="text-center text-white">
                Zum hochladen los lassen
              </Text>
            </div>
          </div>,
          document.body,
        )}
      <FileUpload state={formState}>
        <FileUpload.Trigger label={label}>
          <FileUpload.Input
            ref={mergeRefs([fileInputRef, ref])}
            onMouseDown={handleMouseDown}
            {...rest}
          />
        </FileUpload.Trigger>
      </FileUpload>
      {children}

      {!!errors && (
        <FormField.Caption>
          {(typeof errors === "string" ? errors : errors?.message) ?? "Fehler"}
        </FormField.Caption>
      )}
    </FormField>
  )
})
