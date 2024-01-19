// Import styles
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import "../../src/styles/index.css";

// Import setup script
import "./commands";

// Helper
import { mount } from "cypress/react18";
import Provider from "../../src/Provider";
import React from "react";

Cypress.Commands.add("mount", (component, options) => {
  const wrapped = <Provider>{component}</Provider>;

  return mount(wrapped, options);
});
