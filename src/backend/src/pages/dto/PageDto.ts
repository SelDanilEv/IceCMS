export interface PageDto {
  id: string;
  pageId: string;
  name: string;
  templateId: string;
  zones: { zoneName: string; resource: string }[];
  scripts: string[];
  creater: number;
}

export function createPageDto(jsonSource: any): PageDto {
  return {
    id: jsonSource.id,
    pageId: jsonSource.pageId,
    name: jsonSource.name,
    templateId: jsonSource.templateId,
    zones: jsonSource.zones,
    scripts: jsonSource.scripts,
    creater: jsonSource.creater,
  };
}
