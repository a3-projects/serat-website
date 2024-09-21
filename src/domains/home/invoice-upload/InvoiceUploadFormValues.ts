import { z } from "astro:schema"

export const MAX_FILE_SIZE_MB = 20
export const MAX_IMAGE_FILE_SIZE = MAX_FILE_SIZE_MB * 1000 * 1000
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
export const MAX_FILES = 5
export const FILE_INPUT_ACCEPT = ACCEPTED_FILE_TYPES.join(",")

export const invoiceUploadSchema = <T extends z.ZodTypeAny>({ files }: { files: T }) =>
  z.object({
    email: z
      .string({ message: "Bitte gib eine Email ein, damit wir dich kontaktieren können." })
      .min(1, "Bitte gib eine Email ein, damit wir dich kontaktieren können.")
      .max(120)
      .email("Bitte gib eine gültige Email ein."),
    freeText: z.string().max(400).optional(),
    files,
  })

export const filesSchema = <
  T extends {
    [Symbol.iterator](): IterableIterator<any>
  },
>(
  zodObj: z.ZodType<T, z.ZodTypeDef, T> | z.ZodEffects<z.ZodUnknown, T, unknown>,
) =>
  zodObj
    .refine(files => {
      return Array.from(files).length >= 1
    }, "Bitte lade eine Rechnung hoch.")
    .refine(files => {
      const sum = Array.from(files).reduce((sum, file) => {
        return sum + file.size
      }, 0)
      console.log(sum)

      return sum <= MAX_IMAGE_FILE_SIZE
    }, `Die Dateien dürfen insgesamt ${MAX_FILE_SIZE_MB}MB groß sein.`)
    .refine(
      files =>
        Array.from(files).every(file =>
          ACCEPTED_FILE_TYPES.some(type => file.type?.startsWith(type.replace("*", ""))),
        ),
      "Nur Dateien in den erlaubten Formaten sind zulässig.",
    )
    .refine(files => {
      return Array.from(files).length <= MAX_FILES
    }, `Bitte lade maximal ${MAX_FILES} Datei/en hoch.`)
