import { createTheme, Button, Alert } from "@mantine/core";

export const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "40em",
    md: "48em",
    lg: "64em",
    xl: "80em",
  },
  fontFamily: "Poppins, sans-serif",
  headings: { fontFamily: "Poppins, sans-serif" },
  components: {
    Button: Button.extend({
      classNames: {
        root: "rounded-full h-auto max-h-auto",
        inner: "p-3",
        label: "font-base",
      },
    }),
  },
});
