import { ProjectRisk } from '../types/project';

const labels: Record<ProjectRisk, string> = { LOW: 'Baixo', MEDIUM: 'Médio', HIGH: 'Alto' };

export function RiskBadge({ risk }: { risk: ProjectRisk }) {
  return <span className={`badge risk-${risk.toLowerCase()}`}>{labels[risk]}</span>;
}
