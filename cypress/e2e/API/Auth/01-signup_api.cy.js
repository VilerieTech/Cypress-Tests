describe("Sign-up API Tests", () => {
  let inbox;                 
  let testEmail;             
  let inboxId;               
  const password = Cypress.env("PASSWORD");
  const name = Cypress.env("NAME");

  before(() => {
    cy.mailslurp().then((mailslurp) => mailslurp.createInbox())
      .then((newInbox) => {
        inbox = newInbox;
        inboxId = newInbox.id;
        testEmail = newInbox.emailAddress;

        cy.log("Generated MailSlurp Email:", testEmail);

        Cypress.env("UNVERIFIED_EMAIL", `unverified_${Date.now()}@mail.com`);
      });
  });

  it("should register a new user with valid credentials", () => {
    cy.request({
      method: "POST",
      url: "/sign-up",
      body: { name, email: testEmail, password }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.include("successful");

      Cypress.env("NEW_USER_EMAIL", testEmail);
    });
  });

  it("should verify the user account using OTP", () => {
    cy.wait(5000);

    cy.mailslurp()
      .then((ms) => ms.waitForLatestEmail(inboxId, 20000))
      .then((email) => {
        const otp = email.body.match(/(\d{6})/)?.[1];
        expect(otp).to.not.be.null;

        cy.request({
          method: "POST",
          url: "/email-otp/verify",
          body: { email: testEmail, otp }
        }).then((res) => {
          expect(res.status).to.eq(200);
        });
      });
  });

  it("should not allow registering an already existing email", () => {
    cy.request({
      method: "POST",
      url: "/sign-up",
      failOnStatusCode: false,
      body: { name, email: testEmail, password }
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 409]);
      expect(res.body.message.toLowerCase()).to.include("exist");
    });
  });

  it("should resend OTP for unverified email", () => {
    cy.request({
      method: "POST",
      url: "/email-otp/resend",
      body: { email: Cypress.env("UNVERIFIED_EMAIL") },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it("should NOT resend OTP for already verified email", () => {
    cy.request({
      method: "POST",
      url: "/email-otp/resend",
      failOnStatusCode: false,
      body: { email: testEmail },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message.toLowerCase()).to.include("email already verified");
    });
  });

  it("should NOT resend OTP for unknown email", () => {
    cy.request({
      method: "POST",
      url: "/email-otp/resend",
      failOnStatusCode: false,
      body: { email: "unknown@mail.com" },
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});
