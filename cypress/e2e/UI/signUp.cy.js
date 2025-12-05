import alphapayDashboardPage from "../pages/alphapayDashboardPage";
import alphapaySignUpPage from "../pages/alphapaySignUpPage";

describe('signUp functionality tests', () => {

     const site = new alphapayDashboardPage(); 
     const register = new alphapaySignUpPage();
     let userData;
     let invalidData;
     //const password = Cypress.env('PASSWORD')
    beforeEach('visit site', () => {
        cy.fixture('testData').then((data) => {
            userData = data.validUser
            invalidData = data.invalidUser
        })
        site.visitSite();
    })

    it('should be able to signup using valid credentials', () => {
        site.clickSignUpButton();
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
        register.assertSignup()
    })

    it('should not sign up when invalid full name is entered', () => {
        site.clickSignUpButton()
        register.enterFullName(invalidData.invalidFullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
    })

    it('should not sign up when full name is left empty', () => {
        site.clickSignUpButton()
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton();
    })   

    it('should not sign up when invalid email is entered', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(invalidData.invalidEmail)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
    })

    it('should not sign up when email is left empty', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
        register.assertEmptyEmail()
    })

    it('should not sign up when user enters email already in use', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(invalidData.emailInUse)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
    })

    it('should not sign up when password field is empty', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.confirmPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
        register.assertEmptyPassword()
    })

    it('should not sign up when password does not meet criteria for length',  () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('SHORT_PASSWORD'))
        register.confirmPassword(Cypress.env('SHORT_PASSWORD'))
        register.clickSubmitButton()
        register.assertShortPassword()
    })

    it('should not sign up when password does not meet criteria for complexity', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('INVALID_PASSWORD'))
        register.confirmPassword(Cypress.env('INVALID_PASSWORD'))
        register.clickSubmitButton()
        register.assertInvalidPassword()
    })

    it('should not sign up when confirm password field is empty', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.clickSubmitButton()
    })

    it('should not sign up when password and confirm password do not match', () => {
        site.clickSignUpButton()
        register.enterFullName(userData.fullName)
        register.enterUserName(userData.username)
        register.enterPhoneNumber(userData.phoneNumber)
        register.enterEmail(userData.validEmail)
        register.enterPassword(Cypress.env('PASSWORD'))
        register.confirmPassword(Cypress.env('INVALID_PASSWORD'))
        register.clickSubmitButton()
        register.assertMismatchPassword()
    })

 })