import AuthTextInput from "./AuthTextInput";

describe("AuthTextInput", () => {
  it("renders", () => {
    cy.mount(<AuthTextInput />);
    cy.getByTestId("auth-text-input").should("be.visible");
  });

  it("accepts input", () => {
    cy.mount(<AuthTextInput />);
    const text = "myText";
    cy.getByTestId("auth-text-input").type(text).should("have.value", text);
  });
});
