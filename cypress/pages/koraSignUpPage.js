class koraSignUpPage {

    enterFullName(name) {
        cy.get('input[name="full_name"]')
        .type(name)
    }

    enterUserName(userName) {
        cy.get('input[name="username"]')
        .type(userName)
    }

    enterPhoneNumber(phone) {
        cy.get('input[name="phone_number"]')
        .type(phone)
    }

    enterEmail(email) {
        cy.get('input[name="email"]')
        .type(email)
    }

    enterPassword(password) {
        cy.get('input[name="password"]')
        .type(password)
    }

    confirmPassword(confirmation) {
        cy.get('input[name="confirmPassword"]')
        .type(confirmation)
    }

    clickSubmitButton() {
        cy.get('button:contains("Create Account")')
        .click();
    }

    assertSignup() {
        cy.get('[role="status"]')
        .should('be.visible')
        .and('contain', 'Signed up successfully');
    }

    assertEmptyFullName() {
        cy.get('.error:contains("Provide your full name please")')
        .should('be.visible');
    }

    assertEmptyEmail() {
        cy.get('.error:contains("Provide your email please")')
        .should('be.visible');
    }

    assertEmptyPassword() {
        cy.get('.error:contains("Provide a password please")')
        .should('be.visible');
    }

    assertShortPassword() {
        cy.get('.error:contains("Password must be 9 characters or longer")')
        .should('be.visible');
    }

    assertInvalidPassword() {
        cy.get('.error:contains("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")')
        .should('be.visible');
    }

    assertMismatchPassword() {
        cy.get('.error:contains("Both password need to be the same")')
        .should('be.visible');
    }
}
export default koraSignUpPage