import { createFileFromTemplate } from './templates';

export function setupCiCd(projectPath: string, ciCdTool: string, config: any) {
  if (ciCdTool) {
    createFileFromTemplate(projectPath, `ci/${ciCdTool}`, config);
  } else {
    console.error('No CI/CD tool specified');
  }
}
