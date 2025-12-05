describe("GET Profile API Tests", () => {
  let token;

  before(() => {
  cy.apiLogin(Cypress.env("VERIFIED_EMAIL"), Cypress.env("PASSWORD"))
    .then(t => { token = t; });
});
  // before(() => {
  //   const name = "Profile Test User";
  //   return cy.mailslurp().then(ms => ms.createInbox())
  //     .then(newInbox => {
  //       testEmail = newInbox.emailAddress;
  //       return cy.request({
  //         method: "POST",
  //         url: "/sign-up",
  //         body: { name, email: testEmail, password }
  //       }).then(res => {
  //         expect(res.status).to.eq(201);
  //         return newInbox.id;
  //       });
  //     })
  //     .then(inboxId => {
  //       return cy.mailslurp().then(ms => ms.waitForLatestEmail(inboxId, 30000))
  //         .then(email => {
  //           const otp = email.body.match(/(\d{6})/)?.[1];
  //           expect(otp).to.not.be.null;

  //           return cy.request({
  //             method: "POST",
  //             url: "/email-otp/verify",
  //             body: { email: testEmail, otp }
  //           }).then(res => expect(res.status).to.eq(200));
  //         });
  //     })
  //     .then(() => {
  //       return cy.apiLogin(testEmail, password)
  //         .then(t => token = t);
  //     });
  // });

  it("Should return user profile", () => {
    cy.request({
      method: "GET",
      url: "/profile",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("email", testEmail);
    });
  });
});
