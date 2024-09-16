import {
  filesSchema,
  invoiceUploadSchema,
} from "@/domains/home/invoice-upload/InvoiceUploadFormValues"
import { defineAction, ActionInputError, ActionError } from "astro:actions"
import { z } from "astro:schema"
import nodemailer from "nodemailer"

export const server = {
  sendInvoiceInquiry: defineAction({
    accept: "form",
    input: invoiceUploadSchema({
      /**
       *  Only Transforms FormData correctly, the complete validation is in the handler below
       *  Why? Doing .refine at this level will lead to "expected array, received object" error (not sure why)
       * */
      files: z.array(z.instanceof(File)),
    }),
    handler: async unsafeInput => {
      const parsed = invoiceUploadSchema({
        files: filesSchema(z.array(z.instanceof(File))),
      }).safeParse(unsafeInput)
      if (!parsed.success) {
        throw new ActionInputError(parsed.error.issues)
      }
      const input = parsed.data

      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "marquis.greenholt32@ethereal.email",
            pass: "UfMxZUsGFkbVkJe7KH",
          },
        })

        const attachments = await Promise.all(
          input.files.map(async file => {
            const fileContent = Buffer.from(await file.arrayBuffer())
            return {
              filename: file.name,
              type: file.type,
              content: Buffer.from(fileContent),
            }
          }),
        )

        // Send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Test Sender" <sender@example.com>',
          to: "mina79@ethereal.email",
          subject: `Anfrage von ${input.email}`,
          html: `<div>
                  <p>Der Kunde hat <b>${attachments.length} ${attachments.length === 1 ? "Datei" : "Dateien"}</b> angehängt.</p>
                  ${input.freeText ? "<p>Freitext:</p>" : ""}
                  ${input.freeText ? input.freeText : ""}`,
          attachments,
        })

        return info
      } catch (e) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Oh, nein! Ein unerwarterer Fehler ist aufgetreten. Bitte versuche es später nocheinmal.",
        })
      }
    },
  }),
}
