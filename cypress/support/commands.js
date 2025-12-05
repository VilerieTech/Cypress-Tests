// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import MailSlurp from "mailslurp-client";

// Create MailSlurp instance
Cypress.Commands.add("mailslurp", () => {
  const apiKey = Cypress.env("MAILSLURP_API_KEY");
  if (!apiKey) throw new Error("Missing MAILSLURP_API_KEY in Cypress.env");
  return new MailSlurp({ apiKey });
});


Cypress.Commands.add("createMailSlurpInbox", () => {
  return cy.mailslurp()
    .then(ms => ms.createInbox())
    .then(inbox => {
      Cypress.env("NEW_USER_EMAIL", inbox.emailAddress);
      Cypress.env("INBOX_ID", inbox.id);

      return inbox;
    });
});



Cypress.Commands.add("signupViaAPI", (email, password = Cypress.env("PASSWORD"), name = Cypress.env("NAME")) => {
  return cy.request({
    method: "POST",
    url: "/sign-up",
    body: { name, email, password },
    failonStatusCode: false
  }).then(res => {
    expect(res.status).to.eq(201);
    return res.body;
  });
});

Cypress.Commands.add("apiLogin", (email, password = Cypress.env("PASSWORD")) => {
  return cy.request({
    method: "POST",
    url: "/login",
    body: { email, password }
  }).then(res => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property("Access_token");
    const token = res.body.Access_token;
    Cypress.env("TOKEN", token);
    return token;
  });
});

Cypress.Commands.add("getOTP", (inboxId) => {
  return cy.mailslurp().then(ms =>
    ms.waitForLatestEmail(inboxId, 30000)
      .then(email => {
        const otp = email.body.match(/(\d{6})/)?.[1];
        expect(otp).to.not.be.null;
        return otp;
      })
  );
});







