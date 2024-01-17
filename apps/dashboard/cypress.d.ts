import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(value: string): Chainable<JQuery<HTMLElement>>;
      mount: typeof mount;
    }
  }
}
