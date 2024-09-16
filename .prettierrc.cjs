/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  semi: false,
  trailingComma: "all",
  arrowParens: "avoid",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
