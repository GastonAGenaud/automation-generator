import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

export function createFileFromTemplate(projectPath: string, templateName: string, config: any) {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.hbs`);
  const outputPath = path.join(projectPath, templateName.replace('.hbs', ''));

  // Crear el directorio si no existe
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateContent);
  const result = template(config);
  fs.writeFileSync(outputPath, result, 'utf8');
}
