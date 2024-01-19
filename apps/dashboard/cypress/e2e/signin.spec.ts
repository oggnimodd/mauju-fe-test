describe("Sign In Feature", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
  });

  it("allows a user to sign in", () => {
    cy.getByTestId("auth-text-input").type(Cypress.env("TEST_EMAIL"));
    cy.getByTestId("auth-password-input").type(Cypress.env("TEST_PASSWORD"));
    cy.get("form").submit();

    // Assertions for successful sign-in
    cy.url().should("include", "/"); // Check if redirected to homepage after successful sign-in
  });

  it("shows error when invalid email is entered", () => {
    cy.getByTestId("auth-text-input").type("invalid_email");
    cy.getByTestId("auth-password-input").type(Cypress.env("TEST_PASSWORD"));
    cy.get("form").submit();

    // Assertion for error message
    cy.get(".mantine-TextInput-error").should("exist");
  });

  it("shows error when password is less than 8 characters", () => {
    cy.getByTestId("auth-text-input").type(Cypress.env("TEST_EMAIL"));
    cy.getByTestId("auth-password-input").type("short");
    cy.get("form").submit();

    // Assertion for error message
    cy.get(".mantine-PasswordInput-error").should("exist");
  });

  it("shows error when wrong credentials are entered", () => {
    cy.getByTestId("auth-text-input").type("wrong@example.com");
    cy.getByTestId("auth-password-input").type("wrongpassword");
    cy.get("form").submit();

    // Assertion for error message
    cy.getByTestId("error-alert").should("exist");
  });
});
