import fs from 'fs';
import path from 'path';

export function setupAllureConfig(projectPath: string) {
  const cypressConfigPath = path.join(projectPath, 'cypress.config.js');
  const allureConfigContent = `
    const { defineConfig } = require('cypress');
    const allureWriter = require('@shelex/cypress-allure-plugin/writer');

    module.exports = defineConfig({
      e2e: {
        setupNodeEvents(on, config) {
          allureWriter(on, config);
          return config;
        },
      },
    });
  `;

  fs.writeFileSync(cypressConfigPath, allureConfigContent.trim(), 'utf8');
}
