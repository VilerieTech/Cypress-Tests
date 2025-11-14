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
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    setupNodeEvents(on, config) {
      config.env.PASSWORD = process.env.USER_PASSWORD;
      config.env.SSN = process.env.USER_SSN;
      config.env.SHORT_PASSWORD = process.env.SHORT_PASSWORD;
      config.env.INVALID_PASSWORD = process.env.INVALID_PASSWORD;
      return config;
    },
  }
});
