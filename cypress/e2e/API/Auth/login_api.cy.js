describe('LOGIN API tests', () => {

  it("should login user with valid credentials", () => {
    cy.apiLogin(Cypress.env("NEW_USER_EMAIL"), Cypress.env("PASSWORD"));
  });

  it('should fail with incorrect password', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        email: Cypress.env("NEW_USER_EMAIL"),
        password: Cypress.env("INVALID_PASSWORD")
      }
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });

  it('should fail with incorrect email', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        email: "fake@mail.com",
        password: Cypress.env("PASSWORD")
      }
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });

  it('should fail for unverified user', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        email: Cypress.env("UNVERIFIED_EMAIL"),
        password: Cypress.env("PASSWORD")
      }
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });

});
