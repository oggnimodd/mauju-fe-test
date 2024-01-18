import AuthPasswordInput from "./AuthPasswordInput";

describe("AuthPasswordInput", () => {
  it("renders", () => {
    cy.mount(<AuthPasswordInput />);
    cy.getByTestId("auth-password-input").should("be.visible");
  });

  it("accepts input", () => {
    cy.mount(<AuthPasswordInput />);
    const password = "myPassword";
    cy.getByTestId("auth-password-input")
      .type(password)
      .should("have.value", password);
  });

  it("toggles visibility on eye icon click", () => {
    cy.mount(<AuthPasswordInput />);

    cy.getByTestId("auth-password-input").should(
      "have.attr",
      "type",
      "password",
    );

    cy.getByTestId("auth-password-input").get("button").click();

    cy.getByTestId("auth-password-input").should("have.attr", "type", "text");
  });
});
