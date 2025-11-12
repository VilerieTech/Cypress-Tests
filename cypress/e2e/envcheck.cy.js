describe('Environment variable check', () => {
  it('Check env value', () => {
    cy.log('PARABANK_PASSWORD:', Cypress.env('PARABANK_PASSWORD'));
  });
});
