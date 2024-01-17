Cypress.Commands.add("getByTestId", (value: string) => {
  return cy.get(`[data-test-id=${value}]`);
});
