import { useNavigate, useParams } from 'react-router-dom';
import { ErrorState } from '../components/ErrorState';
import { Loading } from '../components/Loading';
import { ProjectForm } from '../components/ProjectForm';
import { useProject } from '../hooks/useProject';
import { useUpdateProject } from '../hooks/useUpdateProject';
import { ProjectPayload } from '../types/project';

export function ProjectEditPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProject(id);
  const update = useUpdateProject(id);
  const submit = (payload: ProjectPayload) => update.mutate(payload, { onSuccess: () => navigate(`/projects/${id}`) });

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorState />;

  return (
    <>
      <header className="page-header project-form-header">
        <div>
          <span className="eyebrow">Edição</span>
          <h1>Editar projeto</h1>
          <p>Atualize datas, orçamento e descrição para recalcular o risco automaticamente.</p>
        </div>
      </header>
      <ProjectForm project={data} onSubmit={submit} loading={update.isPending} />
      {update.isError && <p className="error">Não foi possível atualizar o projeto.</p>}
    </>
  );
}
