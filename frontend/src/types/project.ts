export enum ProjectStatus {
  ANALYSIS = 'ANALYSIS',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export enum ProjectRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type Project = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  description: string;
  status: ProjectStatus;
  risk: ProjectRisk;
  createdAt: string;
  updatedAt: string;
};

export type ProjectPayload = {
  name: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  description: string;
};

export type AiAnalysis = {
  summary: string;
  attentionPoints: string[];
  executiveRecommendation: string;
};

export const statusLabels: Record<ProjectStatus, string> = {
  ANALYSIS: 'Em análise',
  APPROVED: 'Aprovado',
  IN_PROGRESS: 'Em andamento',
  FINISHED: 'Encerrado',
  CANCELLED: 'Cancelado',
};
