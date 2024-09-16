import type { Config } from "tailwindcss"
import fluid, { extract, screens } from "fluid-tailwind"

import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"

export default {
  content: {
    files: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    extract,
  },
  theme: {
    borderRadius: {
      DEFAULT: "var(--radius)",
      lg: "var(--radius-lg)",
      sm: "var(--radius-sm)",
      full: defaultTheme.borderRadius.full,
    },
    screens,

    fontFamily: {
      sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      //serif: ["'Playfair Display'", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      /* @ts-ignore*/
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.black"),
            "--tw-prose-headings": theme("colors.neutral[800]"),
            "--tw-prose-lead": theme("colors.black"),
            "--tw-prose-links": theme("colors.neutral[800]"),
            "--tw-prose-bullets": theme("colors.primary[500]"),
            "--tw-prose-hr": theme("colors.primary[200]"),
          },
        },
      }),
      colors: {
        fg: "hsl(var(--color-fg))",
        bg: "hsl(var(--color-bg))",
        primary: {
          DEFAULT: "hsl(var(--color-primary-500))",
          50: "hsl(var(--color-primary-50))",
          100: "hsl(var(--color-primary-100))",
          200: "hsl(var(--color-primary-200))",
          300: "hsl(var(--color-primary-300))",
          400: "hsl(var(--color-primary-400))",
          500: "hsl(var(--color-primary-500))",
          600: "hsl(var(--color-primary-600))",
          700: "hsl(var(--color-primary-700))",
          800: "hsl(var(--color-primary-800))",
          900: "hsl(var(--color-primary-900))",
          950: "hsl(var(--color-primary-950))",
          gradient:
            "linear-gradient(to right, hsl(var(--color-primary-400)), hsl(var(--color-primary-600)))",
        },
        neutral: { ...colors.slate, DEFAULT: colors.slate[500], fg: "#fff" },
        destructive: { ...colors.rose, DEFAULT: colors.rose[500], fg: "#fff" },
        positive: { ...colors.emerald, DEFAULT: colors.emerald[500], fg: "#fff" },
        warn: { ...colors.amber, DEFAULT: colors.amber[500], fg: "#fff" },
        info: { ...colors.blue, DEFAULT: colors.blue[500], fg: "#fff" },
        black: "#000",
        white: "#fff",
      },
      spacing: { header: "4rem", input: "35rem" },
      maxWidth: {
        input: "35rem",
      },
    },
  },
  plugins: [fluid, require("tailwindcss-hero-patterns"), require("@tailwindcss/typography")],
} satisfies Config
