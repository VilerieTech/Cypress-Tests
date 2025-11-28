// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("apiLogin", (email, password) => {
  return cy.request({
    method: "POST",
    url: "/login",
    body: { email, password }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property("token");

    // Save JWT for later tests
    Cypress.env("token", res.body.token);

    cy.log("JWT token saved:", res.body.token);
    return res.body.token;
  });
});

