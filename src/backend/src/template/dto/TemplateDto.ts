import { Template } from "../schema/template.schema";

export interface TemplateDto {
  id: string;
  name: string;
  templateHtml: string;
  templateCss: string;
  zones: Record<string, string>;
  creater: number;
}

export function createTemplateDto(jsonSource: Template): TemplateDto {
  return {
    id: jsonSource.id,
    name: jsonSource.name,
    templateHtml: jsonSource.templateHtml,
    templateCss: jsonSource.templateCss,
    zones: jsonSource.zones,
    creater: jsonSource.creater,
  };
}
