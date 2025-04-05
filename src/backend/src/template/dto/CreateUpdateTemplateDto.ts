export interface CreateUpdateTemplateDto {
  name: string;
  templateHtml: string;
  templateCss: string;
  zones: Record<string, string>;
  creater: number;
}

// TODO: What area i need
