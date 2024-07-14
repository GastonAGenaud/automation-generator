import { setupAllureConfig } from './allureConfig';

export function setupReporting(projectPath: string, reportingTool: string, config: any) {
  if (reportingTool === 'allure') {
    setupAllureConfig(projectPath);
  }
}
