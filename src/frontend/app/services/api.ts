import axios from "axios";
import { ResourceData } from "@/app/types/resourceTypes";
import { TemplateData } from "@/app/types/templateTypes";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export default api;

export const resourceApi = {
  getAll: () => api.get<ResourceData[]>("/resources"), 
  getByName: (name: string) => api.get<ResourceData>(`/resources/${name}`),
  create: (data: ResourceData) => api.post<ResourceData>("/resources", data),
  update: (id: string, data: ResourceData) => api.put<ResourceData>(`/resources/${id}`, data),
  delete: (id: string) => api.delete<void>(`/resources/${id}`),
};

export const templateApi = {
  getAll: () => api.get("/templates"),
  getById: (id: string) => api.get(`/templates/${id}`),
  create: (data: TemplateData) => api.post("/templates", data),
  update: (id: string, data: TemplateData) => api.put(`/templates/${id}`, data),
  delete: (id: string) => api.delete(`/templates/${id}`),
};