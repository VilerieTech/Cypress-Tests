class websitePage {
    website() {
        cy.visit('https://parabank.parasoft.com/parabank/admin.htm')
        //cy.visit('https://parabank.parasoft.com/parabank/admin.htm').should('have.window', 'parabank')
    }

}
export default new websitePage