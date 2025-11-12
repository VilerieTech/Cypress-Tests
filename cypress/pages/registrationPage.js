const getIframeBody = (iframeSelector) => {
    return cy.get(iframeSelector)
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
}

class registrationPage {
    clickRegisterButton() {
        // cy.get('[data-cy="register-link"]').click()
        cy.get('a[href*="register"]').click()

    }

    enterFirstName(firstName) {
        cy.get('input[name="customer.firstName"]').type(firstName)
    }

     enterLastName(lastName) {
        cy.get('input[name="customer.lastName"]').type(lastName)
    }

     enterAddress(address) {
        cy.get('input[name="customer.address.street"]').type(address)
    }

    enterCity(city) {
        cy.get('input[name="customer.address.city"]').type(city)
    }

    enterState(state) {
        cy.get('input[name="customer.address.state"]').type(state)
    }

    enterZipcode(zipcode) {
        cy.get('input[name="customer.address.zipCode"]').type(zipcode)
    }

    enterPhoneNumber(phoneNumber) {
        cy.get('input[name="customer.phoneNumber"]').type(phoneNumber)
    }

    enterSsn(ssn) {
        cy.get('input[name="customer.ssn"]').type(ssn)
    }

    enterUserName(userName) {
        cy.get('input[name="customer.username"]').type(userName)
    }

    enterPassword(password) {
        cy.get('input[name="customer.password"]').type(password)
    }
    
    confirmPassword(password) {
        cy.get('input[name="repeatedPassword"]').type(password)
    }

    clickSubmitButton() {
        cy.get('input[value=Register]').click()
    }

    checkbox() {
        cy.get('.loading-spinner').should('not.exist');
        getIframeBody('#terms-of-service-iframe').find('input[type="checkbox"]').check();
        // cy.get('input[type="checkbox"]').check()
    }
}
export default registrationPage