import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiAnalysisCard } from '../components/AiAnalysisCard';
import { Button } from '../components/Button';
import { ErrorState } from '../components/ErrorState';
import { Loading } from '../components/Loading';
import { ProjectDetails } from '../components/ProjectDetails';
import { useProject } from '../hooks/useProject';
import { useProjectAiAnalysis } from '../hooks/useProjectAiAnalysis';
import { useUpdateProjectStatus } from '../hooks/useUpdateProjectStatus';
import { ProjectStatus, statusLabels } from '../types/project';

const nextStatus: Partial<Record<ProjectStatus, ProjectStatus>> = {
  ANALYSIS: ProjectStatus.APPROVED,
  APPROVED: ProjectStatus.IN_PROGRESS,
  IN_PROGRESS: ProjectStatus.FINISHED,
};

export function ProjectDetailPage() {
  const { id = '' } = useParams();
  const [analysisEnabled, setAnalysisEnabled] = useState(false);
  const { data, isLoading, isError } = useProject(id);
  const statusMutation = useUpdateProjectStatus(id);
  const analysis = useProjectAiAnalysis(id, analysisEnabled);

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorState />;

  const next = nextStatus[data.status];
  const cancelled = data.status === ProjectStatus.CANCELLED;

  return (
    <>
      <header className="page-header">
        <div>
          <h1>{data.name}</h1>
          <p>Detalhes completos, status e análise executiva.</p>
        </div>
        <Link className="button button-ghost" to={`/projects/${id}/edit`}>
          Editar
        </Link>
      </header>
      <ProjectDetails project={data} />
      <div className="toolbar">
        <Button disabled={!next || cancelled || statusMutation.isPending} onClick={() => next && statusMutation.mutate(next)}>
          {next ? `Avançar para ${statusLabels[next]}` : 'Sem próxima etapa'}
        </Button>
        <Button variant="danger" disabled={cancelled || statusMutation.isPending} onClick={() => statusMutation.mutate(ProjectStatus.CANCELLED)}>
          Cancelar projeto
        </Button>
        <Button variant="ghost" onClick={() => setAnalysisEnabled(true)}>Gerar análise com IA</Button>
      </div>
      {statusMutation.isError && <p className="error">Transição de status não permitida.</p>}
      {analysis.isLoading && <Loading />}
      {analysis.isError && <ErrorState />}
      {analysis.data && <AiAnalysisCard analysis={analysis.data} />}
    </>
  );
}
