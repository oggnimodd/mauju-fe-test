import AuthButton from "./AuthButton";

describe("AuthButton", () => {
  it("triggers onClick function when clicked", () => {
    const onClickSpy = cy.spy();

    cy.mount(<AuthButton onClick={onClickSpy}>Test</AuthButton>);

    cy.get("button").contains("Test").click();
    cy.wrap(onClickSpy).should("be.calledOnce");
  });
});
