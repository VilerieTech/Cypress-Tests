describe("LOGIN API Tests", () => {
  const password = Cypress.env("PASSWORD");
  const name = "Test User"; 
  let verifiedEmail;
  let inboxId;
  let testEmail;

  before(() => {
    cy.createMailSlurpInbox().then(inbox => {
    testEmail = inbox.emailAddress;
    inboxId = inbox.id;
  });

      cy.signupViaAPI(verifiedEmail, password, name).then(() => {
        return cy.mailslurp().then(ms =>
          cy.wrap(ms.waitForLatestEmail(inboxId, 30000), { timeout: 35000 })
        );
      })
      cy.getOTP(inboxId).then(otp => {
        return cy.request({
          method: "POST",
          url: "/email-otp/verify",
          body: { email: verifiedEmail, otp }
        }).then(res => {
          expect(res.status).to.eq(200);
        });
    })
  })
      

it("should login successfully with verified user", () => {
    const email = Cypress.env("VERIFIED_EMAIL");
    const password = Cypress.env("PASSWORD");
    cy.apiLogin(email, password).then(token => {
    Cypress.env("TOKEN", token);
    });
  });

  it("should get profile after login", () => {
  cy.apiLogin(Cypress.env("VERIFIED_EMAIL"), Cypress.env("PASSWORD"))
    .then(token => {
      cy.request({
        method: "GET",
        url: "/profile",
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("user");
      });
    });
  });
   it("should fail login with incorrect password", () => {
    cy.request({
      method: "POST",
      url: "/login",
      failOnStatusCode: false,
      body: { email: verifiedEmail, password: "WrongPass123" }
    }).then(res => {
      expect(res.status).to.eq(401);
    });
  });

  it("should fail login with incorrect email", () => {
    cy.request({
      method: "POST",
      url: "/login",
      failOnStatusCode: false,
      body: { email: "fake@mail.com", password }
    }).then(res => {
      expect(res.status).to.eq(401);
    });
  });

  it("should fail login for unverified user", () => {
    cy.request({
      method: "POST",
      url: "/login",
      failOnStatusCode: false,
      body: { email: unverifiedEmail, password }
    }).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  it("should not resend OTP for already verified user", () => {
    cy.request({
      method: "POST",
      url: "/email-otp/resend",
      failOnStatusCode: false,
      body: { email: verifiedEmail },
    }).then(res => {
      expect(res.status).to.eq(400);
      expect(res.body.message.toLowerCase()).to.include("email already verified");
    });
  });

  it("should allow resending OTP for unverified user", () => {
    cy.request({
      method: "POST",
      url: "/email-otp/resend",
      body: { email: "mail@mail.com" },
    }).then(res => {
      expect(res.status).to.eq(200);
    });
  });
})

 