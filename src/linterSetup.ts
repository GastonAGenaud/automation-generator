import { createFileFromTemplate } from './templates';

export function setupLinters(projectPath: string, linterTool: string, config: any) {
  createFileFromTemplate(projectPath, `.eslintrc.json`, config);
  if (linterTool === 'eslint-prettier') {
    createFileFromTemplate(projectPath, `.prettierrc.json`, config);
  }
}
