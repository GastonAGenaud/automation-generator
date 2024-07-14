import { createFileFromTemplate } from './templates';

export function setupDocker(projectPath: string, config: any) {
  createFileFromTemplate(projectPath, 'docker/Dockerfile', config);
}
