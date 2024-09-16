import { z } from "astro:schema"

export const MAX_FILE_SIZE_MB = 5
export const MAX_IMAGE_FILE_SIZE = MAX_FILE_SIZE_MB * 1000 * 1000
export const ACCEPTED_FILE_TYPES = ["image/*", "application/*", "text/*"]
export const MAX_FILES = 5

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
      return Array.from(files).every(file => file.size <= MAX_IMAGE_FILE_SIZE)
    }, `Die Datei darf maximal ${MAX_FILE_SIZE_MB}MB groß sein.`)
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
