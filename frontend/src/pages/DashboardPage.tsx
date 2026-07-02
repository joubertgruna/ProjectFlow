import { AlertTriangle, Banknote, CheckCircle2, Clock3, FolderKanban, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { Loading } from '../components/Loading';
import { MetricCard } from '../components/MetricCard';
import { RiskBadge } from '../components/RiskBadge';
import { StatusBadge } from '../components/StatusBadge';
import { useProjects } from '../hooks/useProjects';
import { ProjectRisk, ProjectStatus } from '../types/project';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { getProjectMetrics } from '../utils/projectMetrics';

export function DashboardPage() {
  const { data = [], isLoading, isError } = useProjects();
  const metrics = getProjectMetrics(data);
  const recent = data.slice(0, 5);
  const highAttention = data.filter(
    (project) => project.risk === ProjectRisk.HIGH || project.status === ProjectStatus.IN_PROGRESS,
  );

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;

  return (
    <>
      <header className="page-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Visão executiva do portfólio</h1>
          <p>Indicadores de risco, orçamento, andamento e conclusão dos projetos.</p>
        </div>
        <Link className="button button-primary" to="/projects/new">Criar projeto</Link>
      </header>

      <section className="metrics-grid">
        <MetricCard title="Projetos totais" value={metrics.total} hint={`${metrics.active} ativos`} icon={FolderKanban} />
        <MetricCard title="Em andamento" value={metrics.inProgress} hint="execução ativa" icon={Clock3} />
        <MetricCard title="Risco alto" value={metrics.highRisk} hint="exigem atenção" icon={AlertTriangle} />
        <MetricCard title="Orçamento total" value={formatCurrency(metrics.totalBudget)} hint="portfólio cadastrado" icon={Banknote} />
        <MetricCard title="Conclusão" value={`${metrics.completionRate}%`} hint={`${metrics.finished} encerrados`} icon={CheckCircle2} />
        <MetricCard title="Cancelamento" value={`${metrics.cancellationRate}%`} hint={`${metrics.cancelled} cancelados`} icon={Gauge} />
      </section>

      <section className="dashboard-grid" id="analytics">
        <article className="panel">
          <h2>Projetos recentes</h2>
          {!recent.length ? <EmptyState /> : (
            <div className="stack-list">
              {recent.map((project) => (
                <Link className="project-row" to={`/projects/${project.id}`} key={project.id}>
                  <div>
                    <strong>{project.name}</strong>
                    <span>{formatDate(project.startDate)} até {formatDate(project.endDate)}</span>
                  </div>
                  <StatusBadge status={project.status} />
                  <RiskBadge risk={project.risk} />
                </Link>
              ))}
            </div>
          )}
        </article>
        <article className="panel">
          <h2>Acompanhamento crítico</h2>
          {!highAttention.length ? <p>Nenhum projeto crítico no momento.</p> : (
            <div className="stack-list">
              {highAttention.slice(0, 6).map((project) => (
                <div className="attention-row" key={project.id}>
                  <div>
                    <strong>{project.name}</strong>
                    <span>{formatCurrency(project.totalBudget)}</span>
                  </div>
                  <RiskBadge risk={project.risk} />
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </>
  );
}
