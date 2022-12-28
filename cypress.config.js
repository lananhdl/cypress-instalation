const { defineConfig } = require("cypress");
const { reporters } = require("mocha");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/api-test/**.{js,jsx,ts,tsx}',
    reporters:"mochawesome"
  },
});
