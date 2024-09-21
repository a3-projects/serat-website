import { FileUploadField } from "@/design-system/components/FileUploadField"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUploadPreview } from "@/design-system/components/FileUploadPreview"
import { Button } from "@/design-system/components/Button"
import { cn } from "@/design-system/lib/utils"
import { Link } from "@/design-system/components/Link"
import { Text } from "@/design-system/components/Text"
import { TextField } from "@/design-system/components/TextField"
import { TextareaField } from "@/design-system/components/TextareaField"

import { AlertOctagonIcon, AtSignIcon } from "lucide-react"
import { useState } from "react"

import { actions, isActionError, isInputError } from "astro:actions"
import { navigate } from "astro:transitions/client"
import {
  invoiceUploadSchema,
  filesSchema,
  FILE_INPUT_ACCEPT,
} from "@/domains/home/invoice-upload/InvoiceUploadFormValues"
import { z } from "astro:schema"

export const InvoicesUploadSchema = invoiceUploadSchema({
  files: filesSchema(
    z.unknown().transform(value => {
      // cannot use z.instanceof(FileList) as FileList is not defined on the server
      // here it only works because we use it as a type, not as class
      return value as FileList
    }),
  ),
})

export type InvoicesUploadFormValues = z.infer<typeof InvoicesUploadSchema>

export const InvoiceUploadForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors: formErrors },
  } = useForm<InvoicesUploadFormValues>({
    mode: "onBlur",
    resolver: zodResolver(InvoicesUploadSchema),
  })

  const files = watch("files")
  const [serverError, setServerError] = useState("")
  const [serverInputError, setServerInputError] = useState<
    Record<keyof typeof formErrors, string> | {}
  >({})
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (formValues: InvoicesUploadFormValues) => {
    setServerInputError({})
    setServerError("")
    setIsLoading(true)

    const formData = new FormData()
    formData.append("email", formValues.email)

    formData.append("freeText", formValues.freeText ?? "")
    Array.from(formValues.files).forEach(file => {
      formData.append("files", file)
    })

    const { error } = await actions.sendInvoiceInquiry(formData as any)
    if (error) {
      console.error(error)
      if (isInputError(error)) {
        const getInputErrors = <T extends Record<string, string[] | undefined>>(fields: T) => {
          return Object.keys(fields).reduce(
            (acc, key) => {
              acc[key as keyof T] = fields[key]?.[0]
              return acc
            },
            {} as Record<keyof T, string | undefined>,
          )
        }
        setServerError("")
        setServerInputError(getInputErrors(error.fields))
      } else if (isActionError(error)) {
        setServerInputError({})
        setServerError(error.message)
      } else {
        setServerInputError({})
        setServerError(
          "Oh man! Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später noch einmal.",
        )
      }
      setIsLoading(false)
    } else {
      navigate("/anfrage-erfolgreich-übermittelt")
    }
  }

  const handleRemoveFile = (index: number) => {
    if (files) {
      const newFiles = Array.from(files).filter((_, i) => i !== index)
      const dataTransfer = new DataTransfer()
      newFiles.forEach(file => dataTransfer.items.add(file))
      setValue("files", dataTransfer.files, { shouldValidate: true })
    }
  }

  const [isFreeTextVisible, setIsFreeTextVisible] = useState(false)
  const showFreeText = () => {
    setIsFreeTextVisible(true)
  }

  const hasFiles = (files?.length ?? 0) > 0

  formErrors.files
  const errors = { ...formErrors, ...serverInputError }
  errors.files
  errors.email
  return (
    <div className="~p-4/8">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault()

          onSubmit(data)
        })}
        className="mx-auto max-w-input"
      >
        <div className="flex flex-col gap-4">
          <TextField
            label="Email"
            placeholder="Mit welcher Email sollen wir dich kontaktieren?"
            errors={errors.email}
            startSlot={
              <TextField.Affix size="lg">
                <AtSignIcon className="text-neutral-500" />
              </TextField.Affix>
            }
            {...register("email", {})}
          />
          <div>
            <FileUploadField
              errors={errors.files}
              label="Rechnung/en reinziehen oder per Klick hochladen"
              multiple
              accept={FILE_INPUT_ACCEPT}
              isUploadHidden={hasFiles}
              onFilesDrop={files => {
                setValue("files", files, { shouldValidate: true })
                window.scrollTo({
                  top: document.getElementById("rechnung-hochladen")?.offsetTop,
                  behavior: "smooth",
                })
              }}
              {...register("files", {
                onChange: () => {
                  trigger("files")
                },
              })}
            >
              {hasFiles && (
                <div className="w-full">
                  <ul
                    className={cn("flex flex-col divide-y rounded border", {
                      "divide-destructive-400 border-destructive-400": !!errors.files,
                    })}
                  >
                    {Array.from(files).map((file, index) => (
                      <li key={file.name}>
                        <FileUploadPreview onDelete={() => handleRemoveFile(index)} file={file} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FileUploadField>
          </div>

          {!isFreeTextVisible && (
            <Button
              className="self-start"
              size="sm"
              variant="ghost"
              color="neutral"
              onClick={showFreeText}
              type="button"
            >
              Du möchtest uns noch etwas mitteilen?
            </Button>
          )}
          {isFreeTextVisible && (
            <TextareaField
              label="Dein Anliegen"
              placeholder="Hier ist Platz für alles weitere! Was möchtest du uns mitteilen?"
              errors={errors.freeText}
              {...register("freeText")}
            />
          )}

          {/* <CheckboxField label="Ich stimme den allgeimenen Bedigungen zu." /> */}

          <Button loading={isLoading} className={cn("w-full")} size="lg" type="submit">
            Senden
          </Button>

          <Text className="text-center" ty="caption">
            Mit dem Absenden bestätigst du, dass du unseren{" "}
            <Link target="_blank" href="/datenschutz" className="text-neutral" variant="plain">
              Datenschutz
            </Link>{" "}
            und{" "}
            <Link target="_blank" href="/agb" className="text-neutral" variant="plain">
              AGB
            </Link>{" "}
            gelesen hast. Keine Sorge, deine Daten werden nach Bearbeitung der Anfrage gelöscht.
          </Text>
          {serverError && (
            <div className="rounded border border-destructive-500 bg-destructive-50 ~p-4/8">
              <div className="flex gap-4">
                <AlertOctagonIcon className="text-destructive-500" />
                <Text ty="base" as="p">
                  {serverError}
                </Text>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
