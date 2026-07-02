export enum ProjectStatus {
  ANALYSIS = 'ANALYSIS',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  [ProjectStatus.ANALYSIS]: 'Em análise',
  [ProjectStatus.APPROVED]: 'Aprovado',
  [ProjectStatus.IN_PROGRESS]: 'Em andamento',
  [ProjectStatus.FINISHED]: 'Encerrado',
  [ProjectStatus.CANCELLED]: 'Cancelado',
};
