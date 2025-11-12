// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // make .env variable accessible in Cypress
      config.env.PASSWORD = process.env.USER_PASSWORD;
      config.env.SSN = process.env.USER_SSN;
      config.env.SHORT_PASSWORD = process.env.SHORT_PASSWORD;
      config.env.INVALID_PASSWORD = process.env.INVALID_PASSWORD;
      return config;
    },
  },
});
