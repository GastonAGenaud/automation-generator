import inquirer from 'inquirer';
import { generateProject } from './projectGenerator';

async function main() {
  // Pregunta inicial: Selección de idioma
  const languageSelection = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Select your language / Selecciona tu idioma',
      choices: [
        { name: 'English', value: 'english' },
        { name: 'Español', value: 'spanish' },
      ],
    },
  ]);

  const isSpanish = languageSelection.language === 'spanish';

  // Pregunta 1: Tipo de Proyecto
  const projectTypeAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: isSpanish
        ? '¿Qué tipo de proyecto de automatización de pruebas deseas crear?'
        : 'What type of test automation project do you want to create?',
      choices: [
        { name: isSpanish ? 'Navegador (E2E)' : 'Browser (E2E)', value: 'e2e' },
        { name: 'API', value: 'api' },
        { name: isSpanish ? 'Móvil' : 'Mobile', value: 'mobile' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ],
    },
  ]);

  // Pregunta 2: Lenguaje de Programación
  const languageAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: isSpanish
        ? `¿Qué lenguaje de programación deseas utilizar para las pruebas ${projectTypeAnswer.projectType}?`
        : `Which programming language do you want to use for ${projectTypeAnswer.projectType} tests?`,
      choices: [
        { name: 'JavaScript', value: 'javascript' },
        { name: 'TypeScript', value: 'typescript' },
        { name: 'Python', value: 'python' },
        { name: 'Java', value: 'java' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ],
    },
  ]);

  // Pregunta 3: Framework de Pruebas
  let frameworkChoices: { name: string; value: string; }[] = [];

  if (projectTypeAnswer.projectType === 'e2e') {
    if (languageAnswer.language === 'javascript' || languageAnswer.language === 'typescript') {
      frameworkChoices = [
        { name: 'Selenium', value: 'selenium' },
        { name: 'Cypress', value: 'cypress' },
        { name: 'Playwright', value: 'playwright' },
        { name: 'Puppeteer', value: 'puppeteer' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    } else if (languageAnswer.language === 'python') {
      frameworkChoices = [
        { name: 'Selenium', value: 'selenium' },
        { name: 'pytest-selenium', value: 'pytest-selenium' },
        { name: 'Robot Framework', value: 'robot-framework' },
        { name: 'Playwright', value: 'playwright' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    } else if (languageAnswer.language === 'java') {
      frameworkChoices = [
        { name: 'Selenium', value: 'selenium' },
        { name: 'Selenide', value: 'selenide' },
        { name: 'Cucumber', value: 'cucumber' },
        { name: 'Geb', value: 'geb' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    }
  } else if (projectTypeAnswer.projectType === 'api') {
    if (languageAnswer.language === 'javascript' || languageAnswer.language === 'typescript') {
      frameworkChoices = [
        { name: 'Postman/Newman', value: 'postman' },
        { name: 'Supertest', value: 'supertest' },
        { name: 'Frisby', value: 'frisby' },
        { name: 'Chai-http', value: 'chai-http' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    } else if (languageAnswer.language === 'python') {
      frameworkChoices = [
        { name: 'pytest', value: 'pytest' },
        { name: 'requests', value: 'requests' },
        { name: 'Tavern', value: 'tavern' },
        { name: 'Locust', value: 'locust' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    } else if (languageAnswer.language === 'java') {
      frameworkChoices = [
        { name: 'RestAssured', value: 'restassured' },
        { name: 'HttpClient', value: 'httpclient' },
        { name: 'Karate', value: 'karate' },
        { name: 'JUnit', value: 'junit' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    }
  } else if (projectTypeAnswer.projectType === 'mobile') {
    if (languageAnswer.language === 'javascript' || languageAnswer.language === 'typescript') {
      frameworkChoices = [
        { name: 'Appium', value: 'appium' },
        { name: 'Detox', value: 'detox' },
        { name: 'WebdriverIO', value: 'webdriverio' },
        { name: 'Jest', value: 'jest' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    } else if (languageAnswer.language === 'python') {
      frameworkChoices = [
        { name: 'Appium', value: 'appium' },
        { name: 'pytest-appium', value: 'pytest-appium' },
        { name: 'Robot Framework', value: 'robot-framework' },
        { name: 'Selenium', value: 'selenium' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    } else if (languageAnswer.language === 'java') {
      frameworkChoices = [
        { name: 'Appium', value: 'appium' },
        { name: 'Espresso', value: 'espresso' },
        { name: 'UIAutomator', value: 'uiautomator' },
        { name: 'Selendroid', value: 'selendroid' },
        { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
      ];
    }
  }

  const frameworkAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: isSpanish
        ? `¿Qué framework de pruebas deseas utilizar para ${projectTypeAnswer.projectType} con ${languageAnswer.language}?`
        : `Which test framework do you want to use for ${projectTypeAnswer.projectType} with ${languageAnswer.language}?`,
      choices: frameworkChoices,
    },
  ]);

  // Pregunta 4: Herramientas de CI/CD
  const ciCdAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ciCd',
      message: isSpanish
        ? '¿Deseas configurar integración continua (CI/CD)?'
        : 'Do you want to set up continuous integration (CI/CD)?',
    },
  ]);

  let ciCdToolAnswer: any = null;
  if (ciCdAnswer.ciCd) {
    ciCdToolAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'ciCdTool',
        message: isSpanish
          ? '¿Qué herramienta de CI/CD deseas utilizar?'
          : 'Which CI/CD tool do you want to use?',
        choices: [
          { name: 'GitHub Actions', value: 'github-actions' },
          { name: 'GitLab CI/CD', value: 'gitlab-ci' },
          { name: 'Jenkins', value: 'jenkins' },
          { name: 'CircleCI', value: 'circleci' },
          { name: 'Azure DevOps', value: 'azure-devops' },
          { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
        ],
      },
    ]);
  }

  // Pregunta 5: Administración de Dependencias
  let dependencyChoices: { name: string; value: string; }[] = [];

  if (languageAnswer.language === 'javascript' || languageAnswer.language === 'typescript') {
    dependencyChoices = [
      { name: 'npm/yarn', value: 'npm' },
    ];
  } else if (languageAnswer.language === 'python') {
    dependencyChoices = [
      { name: 'pip', value: 'pip' },
    ];
  } else if (languageAnswer.language === 'java') {
    dependencyChoices = [
      { name: 'Maven/Gradle', value: 'maven' },
    ];
  }

  const dependenciesAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'dependencies',
      message: isSpanish
        ? '¿Qué herramienta de administración de dependencias deseas utilizar?'
        : 'Which dependency management tool do you want to use?',
      choices: [...dependencyChoices, { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' }],
    },
  ]);

  // Pregunta 6: Configuración de Linter/Formatters
  const linterFormatterAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'linterFormatter',
      message: isSpanish
        ? '¿Deseas configurar herramientas de linting y formateo de código?'
        : 'Do you want to set up linting and code formatting tools?',
    },
  ]);

  let linterFormatterToolAnswer: any = null;
  if (linterFormatterAnswer.linterFormatter) {
    let linterFormatterChoices: { name: string; value: string; }[] = [];

    if (languageAnswer.language === 'javascript' || languageAnswer.language === 'typescript') {
      linterFormatterChoices = [
        { name: 'ESLint y Prettier', value: 'eslint-prettier' },
      ];
    } else if (languageAnswer.language === 'python') {
      linterFormatterChoices = [
        { name: 'pylint y black', value: 'pylint-black' },
      ];
    } else if (languageAnswer.language === 'java') {
      linterFormatterChoices = [
        { name: 'Checkstyle y Spotless', value: 'checkstyle-spotless' },
      ];
    }

    linterFormatterToolAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'linterFormatterTool',
        message: isSpanish
          ? `¿Qué herramientas de linting y formateo deseas utilizar para ${languageAnswer.language}?`
          : `Which linting and formatting tools do you want to use for ${languageAnswer.language}?`,
        choices: linterFormatterChoices,
      },
    ]);
  }

  // Pregunta 7: Configuración de Reporting
  const reportingAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'reporting',
      message: isSpanish
        ? '¿Deseas configurar herramientas de reporting de pruebas?'
        : 'Do you want to set up test reporting tools?',
    },
  ]);

  let reportingToolAnswer: any = null;
  if (reportingAnswer.reporting) {
    reportingToolAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'reportingTool',
        message: isSpanish
          ? '¿Qué herramientas de reporting deseas utilizar?'
          : 'Which reporting tools do you want to use?',
        choices: [
          { name: 'Allure', value: 'allure' },
          { name: 'ReportPortal', value: 'reportportal' },
          { name: 'Mochawesome', value: 'mochawesome' },
          { name: isSpanish ? 'Otro (Especificar)' : 'Other (Specify)', value: 'other' },
        ],
      },
    ]);
  }

  // Pregunta 8: Configuración de Docker
  const dockerAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'docker',
      message: isSpanish
        ? '¿Deseas configurar Docker para contenerizar las pruebas?'
        : 'Do you want to set up Docker to containerize the tests?',
    },
  ]);

  // Configuración Final
  console.log(isSpanish ? 'Configuración final:' : 'Final configuration:');
  console.log(`${isSpanish ? 'Tipo de Proyecto' : 'Project Type'}: ${projectTypeAnswer.projectType}`);
  console.log(`${isSpanish ? 'Lenguaje de Programación' : 'Programming Language'}: ${languageAnswer.language}`);
  console.log(`${isSpanish ? 'Framework de Pruebas' : 'Test Framework'}: ${frameworkAnswer.framework}`);
  if (ciCdAnswer.ciCd) {
    console.log(`CI/CD: ${ciCdToolAnswer.ciCdTool}`);
  }
  console.log(`${isSpanish ? 'Administración de Dependencias' : 'Dependency Management'}: ${dependenciesAnswer.dependencies}`);
  if (linterFormatterAnswer.linterFormatter) {
    console.log(`${isSpanish ? 'Linter/Formatters' : 'Linting/Formatting Tools'}: ${linterFormatterToolAnswer.linterFormatterTool}`);
  }
  if (reportingAnswer.reporting) {
    console.log(`${isSpanish ? 'Reporting' : 'Reporting Tools'}: ${reportingToolAnswer.reportingTool}`);
  }
  console.log(`Docker: ${dockerAnswer.docker}`);

  const proceedAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: isSpanish
        ? '¿Deseas proceder con la creación del proyecto?'
        : 'Do you want to proceed with the project creation?',
    },
  ]);

  if (proceedAnswer.proceed) {
    console.log(isSpanish ? 'Creando el proyecto...' : 'Creating the project...');
    const config = {
      projectType: projectTypeAnswer.projectType,
      language: languageAnswer.language,
      framework: frameworkAnswer.framework,
      ciCd: ciCdAnswer.ciCd ? ciCdToolAnswer.ciCdTool : null,
      dependencies: dependenciesAnswer.dependencies,
      linterFormatter: linterFormatterAnswer.linterFormatter ? linterFormatterToolAnswer.linterFormatterTool : null,
      reporting: reportingAnswer.reporting ? reportingToolAnswer.reportingTool : null,
      docker: dockerAnswer.docker,
    };
    console.log('Configuración seleccionada:', config);
    generateProject(config);
  } else {
    console.log(isSpanish ? 'Operación cancelada.' : 'Operation canceled.');
  }
}

main().catch(error => console.error(error));
