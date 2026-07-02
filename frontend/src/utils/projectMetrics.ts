import { Project, ProjectRisk, ProjectStatus } from '../types/project';

export function getProjectMetrics(projects: Project[] = []) {
  const totalBudget = projects.reduce((sum, project) => sum + project.totalBudget, 0);
  const highRisk = projects.filter((project) => project.risk === ProjectRisk.HIGH).length;
  const inProgress = projects.filter((project) => project.status === ProjectStatus.IN_PROGRESS).length;
  const finished = projects.filter((project) => project.status === ProjectStatus.FINISHED).length;
  const cancelled = projects.filter((project) => project.status === ProjectStatus.CANCELLED).length;
  const active = projects.filter((project) =>
    [ProjectStatus.ANALYSIS, ProjectStatus.APPROVED, ProjectStatus.IN_PROGRESS].includes(
      project.status,
    ),
  ).length;
  const completionRate = projects.length ? Math.round((finished / projects.length) * 100) : 0;
  const cancellationRate = projects.length ? Math.round((cancelled / projects.length) * 100) : 0;

  return {
    total: projects.length,
    active,
    inProgress,
    finished,
    cancelled,
    highRisk,
    totalBudget,
    completionRate,
    cancellationRate,
  };
}
