import { mount } from "cypress/react18";
import Provider from "../../src/Provider";
import React from "react";

Cypress.Commands.add("getByTestId", (value: string) => {
  return cy.get(`[data-test-id=${value}]`);
});

Cypress.Commands.add("mount", (component, options) => {
  const wrapped = <Provider>{component}</Provider>;

  return mount(wrapped, options);
});
