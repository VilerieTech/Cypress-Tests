const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

function loadEnv(envName) {
  const envPath = `.env.${envName}`;
  dotenv.config({ path: envPath });
  console.log(`Loaded ENV File: ${envPath}`);
}

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      //  default environment = dev
      const envName = config.env.ENV || "dev";
      dotenv.config({ path: `.env.${envName}` });

      loadEnv(envName);

      config.env = {
        ...config.env,
        NAME: process.env.USER_NAME,
        BASE_URL: process.env.BASE_URL,
        EMAIL: process.env.USER_EMAIL,
        PASSWORD: process.env.USER_PASSWORD,
        INVALID_PASSWORD: process.env.INVALID_PASSWORD,
        UNVERIFIED_EMAIL: process.env.UNVERIFIED_EMAIL,
        SHORT_PASSWORD: process.env.SHORT_PASSWORD,
        MAILSLURP_API_KEY: process.env.MAILSLURP_API_KEY,
        NEW_USER_EMAIL: process.env.NEW_USER_EMAIL
      };


      config.baseUrl = process.env.BASE_URL;

      console.log("Cypress Base URL:", config.baseUrl);

      return config;
    }
  }
});
