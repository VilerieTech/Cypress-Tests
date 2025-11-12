class koraLoginPage {

    enterEmail(email) {
        cy.get('input[name="email"]')
        // .wait(5000)
        // .should('have.text', "example@gmail.com")
        .type(email)
    }

    enterPassword(password) {
        cy.get('input[name="password"]')
        // .contains('password')
        .type(password)
    }

    clickSigninButton() {
        cy.get('button:contains("Sign In")').click();
    }
}
export default koraLoginPage