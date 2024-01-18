import Banner from "./Banner";

describe("Banner Component", () => {
  it("renders the banner and circles correctly", () => {
    cy.mount(<Banner />);

    // Check that the banner exists
    cy.getByTestId("banner").should("be.visible");

    // Check that the circles exist
    cy.getByTestId("banner-circle").should("have.length", 2);

    // Check that the title exists
    cy.getByTestId("banner-title").should("be.visible");

    // Check that the subtile exists
    cy.getByTestId("banner-subtile").should("be.visible");

    // Check that the button exists
    cy.getByTestId("banner-button").should("be.visible");
  });
});
