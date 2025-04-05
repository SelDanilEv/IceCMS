export interface CreateUpdatePageDto {
  pageId: string;
  name: string;
  templateId: string;
  // zones: { zoneName: string; resource: string }[];
  scripts: string[];
  creater: number;
}
