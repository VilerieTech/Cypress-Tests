describe("Sign-up API Tests", () => {
  let inboxId;
  let testEmail;
  const password = Cypress.env("USER_PASSWORD");
  const name = Cypress.env("USER_NAME");

  before(() => {
    cy.createMailSlurpInbox().then(inbox => {
    testEmail = inbox.emailAddress;
    inboxId = inbox.id;
});

  it("Should register a new user with valid credentials", () => {
    cy.signupViaAPI(testEmail, password, name).then(res => {
      expect(res.message.toLowerCase()).to.include("successful");
    });
  });

  it("Should verify the user account using OTP", () => {
    cy.mailslurp().then(ms => {
      return cy.wrap(ms.waitForLatestEmail(inboxId, 30000), { timeout: 35000 });
    }).then(email => {
      const otp = email.body.match(/(\d{6})/)?.[1];
      expect(otp).to.not.be.null;
      cy.log("Extracted OTP:", otp);

      cy.request({
        method: "POST",
        url: "/email-otp/verify",
        body: { email: testEmail, otp }
      }).then(res => expect(res.status).to.eq(200));
      Cypress.env("VERIFIED_EMAIL", testEmail);
    });
  });

  it("Should not register an already existing email", () => {
    cy.signupViaAPI(testEmail, password, name).then(res => {
      expect(res.status).to.eq(409);
      expect(res.body.message.toLowerCase()).to.include("exists");      
    });
  });

  it("Should not resend OTP for already verified email", () => {
    cy.request({
      method: "POST",
      url: "/email-otp/resend",
      failOnStatusCode: false,
      body: { email: testEmail },
    }).then(res => {
      expect(res.status).to.eq(400);
      expect(res.body.message.toLowerCase()).to.include("email already verified");
    });
  });

  // it.only("Should NOT resend OTP for unknown email", () => {
  //   cy.request({
  //     method: "POST",
  //     url: "/email-otp/resend",
  //     body: { email: "unknown@mail.com" },
  //   }).then(res => {
  //      expect(res.message.toLowerCase()).to.include("not");
  //   });
  // });
});
})
