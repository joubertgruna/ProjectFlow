import { api } from './api';
import { AiAnalysis, Project, ProjectPayload, ProjectStatus } from '../types/project';

export const projectService = {
  async list() {
    const { data } = await api.get<Project[]>('/projects');
    return data;
  },
  async get(id: string) {
    const { data } = await api.get<Project>(`/projects/${id}`);
    return data;
  },
  async create(payload: ProjectPayload) {
    const { data } = await api.post<Project>('/projects', payload);
    return data;
  },
  async update(id: string, payload: ProjectPayload) {
    const { data } = await api.patch<Project>(`/projects/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await api.delete(`/projects/${id}`);
  },
  async updateStatus(id: string, status: ProjectStatus) {
    const { data } = await api.patch<Project>(`/projects/${id}/status`, { status });
    return data;
  },
  async analyze(id: string) {
    const { data } = await api.get<AiAnalysis>(`/projects/${id}/ai-analysis`);
    return data;
  },
};
