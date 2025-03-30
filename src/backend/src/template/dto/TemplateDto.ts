export interface TemplateDto {
  id: string;
  name: string;
  templateHtml: string;
  creater: number;
}

export function createTemplateDto(jsonSource: any): TemplateDto {
  return {
    id: jsonSource.id,
    name: jsonSource.name,
    templateHtml: jsonSource.templateHtml,
    creater: jsonSource.creater,
  };
}
