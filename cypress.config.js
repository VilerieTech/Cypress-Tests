// const { defineConfig } = require("cypress");
// const dotenv = require("dotenv");

// module.exports = defineConfig({
//   reporter: "mochawesome",
//   reporterOptions: {
//     reportDir: "cypress/reports",
//     overwrite: false,
//     html: true,
//     json: true,
//   },

//   supportFile: "cypress/support/e2e.js",

//   e2e: {
//     setupNodeEvents(on, config) {
//       const envName = config.env.configFile || "dev";
//       const envPath = `.env.${envName}`;
//       dotenv.config({ path: envPath });

//       config.env = {
//         ...config.env,
//         BASE_URL: process.env.BASE_URL,
//         EMAIL: process.env.USER_EMAIL,
//         PASSWORD: process.env.USER_PASSWORD,
//         INVALID_PASSWORD: process.env.INVALID_PASSWORD,
//         UNVERIFIED_EMAIL: process.env.UNVERIFIED_EMAIL,
//         OTP: process.env.OTP,
//         NAME: process.env.USER_NAME,
//         SSN: process.env.USER_SSN,
//         SHORT_PASSWORD: process.env.SHORT_PASSWORD,

//         MAILSLURP_API_KEY: process.env.MAILSLURP_API_KEY,
//       };

//       config.baseUrl = process.env.BASE_URL;

//       console.log("Loaded ENV File:", envPath);
//       console.log("Cypress Running Against:", config.baseUrl);

//       return config;
//     },
//   },
// });
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
    supportFile: "cypress/support/e2e.js",   // ✅ moved here (correct)

    setupNodeEvents(on, config) {
      const envName = config.env.configFile || "dev";
      const envPath = `.env.${envName}`;
      dotenv.config({ path: envPath });

      config.env = {
        ...config.env,
        BASE_URL: process.env.BASE_URL,
        EMAIL: process.env.USER_EMAIL,
        PASSWORD: process.env.USER_PASSWORD,
        INVALID_PASSWORD: process.env.INVALID_PASSWORD,
        UNVERIFIED_EMAIL: process.env.UNVERIFIED_EMAIL,
        OTP: process.env.OTP,
        NAME: process.env.USER_NAME,
        SSN: process.env.USER_SSN,
        SHORT_PASSWORD: process.env.SHORT_PASSWORD,
        MAILSLURP_API_KEY: process.env.MAILSLURP_API_KEY,
        NEW_USER_EMAIL: process.env.NEW_USER_EMAIL,
      };

      config.baseUrl = process.env.BASE_URL;

      return config;
    },
  },
});

