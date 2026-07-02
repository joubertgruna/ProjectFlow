import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';
import { Project } from '../types/project';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <section className="panel details">
      <div><strong>Status</strong><StatusBadge status={project.status} /></div>
      <div><strong>Risco</strong><RiskBadge risk={project.risk} /></div>
      <div><strong>Orçamento</strong><span>{formatCurrency(project.totalBudget)}</span></div>
      <div><strong>Início</strong><span>{formatDate(project.startDate)}</span></div>
      <div><strong>Término</strong><span>{formatDate(project.endDate)}</span></div>
      <div className="wide"><strong>Descrição</strong><p>{project.description}</p></div>
    </section>
  );
}
