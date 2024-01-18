import { defineConfig } from "cypress";

const { VITE_CLERK_PUBLISHABLE_KEY } = process.env;

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      VITE_CLERK_PUBLISHABLE_KEY,
    },
  },
  component: {
    screenshotOnRunFailure: false,
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "**/*.{cy,spec}.{js,ts,jsx,tsx}",
  },
});
