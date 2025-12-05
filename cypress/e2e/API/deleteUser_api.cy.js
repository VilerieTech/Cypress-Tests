describe("DELETE User API Tests", () => {
  let token;
  let verifiedEmail;
  let inboxId;

  const name = Cypress.env("USER_NAME") || "Test User";
  const password = Cypress.env("USER_PASSWORD") || "Adminnnn1$";

  before(() => {
    cy.createMailSlurpInbox().then(inbox => {
      verifiedEmail = inbox.emailAddress;
      inboxId = inbox.id;

      Cypress.env("VERIFIED_EMAIL", verifiedEmail);
      return cy.signupViaAPI(verifiedEmail, password, name);
    })
    .then(() => cy.getOTP(inboxId))
    .then(otp => {
      return cy.request({
        method: "POST",
        url: "/email-otp/verify",
        body: { email: verifiedEmail, otp },
      });
    })
    .then(() => {
      return cy.apiLogin(verifiedEmail, password).then(jwt => {
        token = jwt;
        Cypress.env("TOKEN", jwt);
      });
    });
  });

  it("Should delete the logged-in user", () => {
    cy.request({
      method: "DELETE",
      url: "/delete",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.message.toLowerCase()).to.include("deleted");
    });
  });

  it("Should get profile after deletion (soft delete)", () => {
    cy.request({
      method: "GET",
      url: "/profile",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("user");
    });
  });

  it("Should not delete user without token", () => {
    cy.request({
      method: "DELETE",
      url: "/delete",
      failOnStatusCode: false,
    }).then(res => {
      expect(res.status).to.eq(401);
    });
  });

  it("Should not delete user with invalid token", () => {
    cy.request({
      method: "DELETE",
      url: "/delete",
      failOnStatusCode: false,
      headers: { Authorization: "Bearer invalid_token" }
    }).then(res => {
      expect(res.status).to.eq(401);
    });
  });

  //  it("Should not delete user with missing token", () => {
  //   cy.request({
  //     method: "DELETE",
  //     url: "/delete",
  //     failOnStatusCode: false,
  //     headers: { Authorization: "" }
  //   }).then(res => {
  //     expect(res.status).to.eq(401);
  //   });
  // });
});
