import { defineConfig } from "cypress";

const {
  VITE_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY,
  REACT_APP_CLERK_PUBLISHABLE_KEY,
  CLERK_PUBLISHABLE_KEY,
  TEST_EMAIL,
  TEST_PASSWORD,
} = process.env;

export default defineConfig({
  e2e: {
    setupNodeEvents() {},
    env: {
      VITE_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY,
      REACT_APP_CLERK_PUBLISHABLE_KEY,
      CLERK_PUBLISHABLE_KEY,
      TEST_EMAIL,
      TEST_PASSWORD,
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
    screenshotOnRunFailure: false,
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
