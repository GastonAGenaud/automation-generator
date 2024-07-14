import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { createFileFromTemplate } from './templates';
import { setupCiCd } from './ciCdSetup';
import { setupLinters } from './linterSetup';
import { setupReporting } from './reportingSetup';
import { setupDocker } from './dockerSetup';
import { setupAllureConfig } from './allureConfig';

function initializeCypress(projectPath: string) {
  execSync('npx cypress install', { cwd: projectPath, stdio: 'inherit' });
}

function installDependencies(projectPath: string) {
  execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
}

export function generateProject(config: any) {
  const projectPath = path.join(process.cwd(), config.projectName || 'my-project');

  // Crear la estructura de directorios
  fs.mkdirSync(projectPath, { recursive: true });

  // Crear archivos base según las opciones seleccionadas
  createFileFromTemplate(projectPath, 'package.json', config);
  const readmeTemplate = config.language === 'spanish' ? 'README_es.md' : 'README_en.md';
  createFileFromTemplate(projectPath, readmeTemplate, config);

  // Configurar herramientas de CI/CD
  if (config.ciCd) {
    setupCiCd(projectPath, config.ciCd, config);
  }

  // Configurar linters y formatters
  if (config.linterFormatter) {
    setupLinters(projectPath, config.linterFormatter, config);
  }

  // Configurar herramientas de reporting
  if (config.reporting) {
    setupReporting(projectPath, config.reporting, config);
  }

  // Configurar Docker
  if (config.docker) {
    setupDocker(projectPath, config);
  }

  // Instalar dependencias
  installDependencies(projectPath);

  // Inicializar Cypress
  initializeCypress(projectPath);

  // Configurar Allure
  if (config.reporting === 'allure') {
    setupAllureConfig(projectPath);
  }

  console.log('Proyecto generado con éxito en:', projectPath);
}
