import websitePage from "../pages/websitePage"
import registrationPage from "../pages/registrationPage"

describe('Login functionality tests', () => {

  before('visit webpage', () =>{
     websitePage.website();
  } )

  it('Verify user can login succesfully using valid credentials', () => {
    const register = new registrationPage;
    register.clickRegisterButton()
    register.enterFirstName("Test")
    register.enterLastName("User")
    register.enterAddress("1 test address")
    register.enterCity("city")
    register.enterState("state")
    register.enterZipcode("1234567")
    register.enterPhoneNumber("12345687654")
    register.enterSsn("123456789")
    register.enterUserName("tester")
    register.enterPassword(Cypress.env('PASSWORD'))
    register.confirmPassword(Cypress.env('PASSWORD'))
    register.clickSubmitButton()
    // cy.wait(10000)
    register.checkbox()
  })

  
})