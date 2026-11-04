const { defineConfig } = require("@playwright/test");
const { createAzurePlaywrightConfig, ServiceOS } = require("@azure/playwright");
const { DefaultAzureCredential } = require("@azure/identity");
const config = require("./playwright.config");
const reporters = [["html", { open: "never" }]];

if (process.env.PLAYWRIGHT_WORKSPACES_REPORTING === "true") {
  reporters.push(["@azure/playwright/reporter"]);
}

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: "<loopback>",
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    reporter: reporters,
  },
);
