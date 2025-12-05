📘 Cypress + MailSlurp Automated Testing

Automated API/UI tests using Cypress and MailSlurp to validate user signup, OTP email verification, login, profile management, and account deletion features.

This project dynamically creates real disposable inboxes for each test run, ensuring clean and collision-free email workflows.

🚀 Features

Automated user signup flow

Real inbox creation using MailSlurp

OTP extraction & verification

Login & authentication tests

Profile retrieval

User deletion (soft-delete)

Fully isolated, repeatable test data

Supports local & CI execution

📦 Installation & Setup

1️⃣ Clone the Repository
git clone <repo-url>
cd <project-folder>

2️⃣ Install Dependencies
npm install
npm install --save-dev cypress-mailslurp

🔑 Environment Variables

Create .env.dev (or .env.staging, .env.prod depending on env):
BASE_URL=https://your-api.com
USER_EMAIL=test@example.com
USER_PASSWORD=YourPassword123!
INVALID_PASSWORD=wrongpass123!
UNVERIFIED_EMAIL=unverified@mail.com
USER_NAME=Test User
MAILSLURP_API_KEY=//your-mailslurp-api-key

⚙️ Cypress Configuration

cypress.config.js:

const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      const envName = config.env.configFile || "dev";
      const envPath = `.env.${envName}`;
      dotenv.config({ path: envPath });

      require("cypress-mailslurp")(on, config);

      config.env = {
        ...config.env,
        BASE_URL: process.env.BASE_URL,
        EMAIL: process.env.USER_EMAIL,
        PASSWORD: process.env.USER_PASSWORD,
        INVALID_PASSWORD: process.env.INVALID_PASSWORD,
        UNVERIFIED_EMAIL: process.env.UNVERIFIED_EMAIL,
        NAME: process.env.USER_NAME,
        SHORT_PASSWORD: process.env.SHORT_PASSWORD,
        MAILSLURP_API_KEY: process.env.MAILSLURP_API_KEY,
        NEW_USER_EMAIL: process.env.NEW_USER_EMAIL,
      };

      config.baseUrl = process.env.BASE_URL;
      return config;
    },
  },
});

📬 MailSlurp Inbox Creation

A new inbox is dynamically created before test suites run.

Custom Command (cypress/support/commands.js):
Cypress.Commands.add("createMailSlurpInbox", () => {
  return cy.mailslurp().then(ms => ms.createInbox());
});

🔐 OTP Extraction Command
Cypress.Commands.add("getOTP", inboxId => {
  return cy.mailslurp().then(ms =>
    ms.waitForLatestEmail(inboxId, 30000).then(email => {
      const otp = email.body.match(/\b\d{6}\b/)[0];
      return otp;
    })
  );
});

🧵 Signup via API Command
Cypress.Commands.add("signupViaAPI", (email, password, name) => {
  return cy.request({
    method: "POST",
    url: "/signup",
    failOnStatusCode: false,
    body: { email, password, name }
  });
});

🔧 Troubleshooting
❌ Email never arrives

Increase wait time: ms.waitForLatestEmail(inboxId, 60000)

Check MailSlurp dashboard logs

❌ OTP extraction fails

Update regex if email template changes.

❌ 401 errors on protected routes

Ensure auth token is stored and passed correctly:

Authorization: Bearer <token>

🧩 Workflow Diagram
Cypress → Create MailSlurp Inbox
        → Signup via API
        → App sends OTP email
        → MailSlurp receives email
        → Cypress extracts OTP
        → Cypress verifies OTP
        → Account activated
