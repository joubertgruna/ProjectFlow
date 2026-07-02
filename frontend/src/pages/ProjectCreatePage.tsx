import { useNavigate } from 'react-router-dom';
import { ProjectForm } from '../components/ProjectForm';
import { useCreateProject } from '../hooks/useCreateProject';
import { ProjectPayload } from '../types/project';

export function ProjectCreatePage() {
  const navigate = useNavigate();
  const create = useCreateProject();
  const submit = (payload: ProjectPayload) =>
    create.mutate(payload, { onSuccess: () => navigate('/projects') });

  return (
    <>
      <header className="page-header project-form-header">
        <div>
          <span className="eyebrow">Novo projeto</span>
          <h1>Novo projeto</h1>
          <p>Cadastre as informações base para cálculo automático de risco.</p>
        </div>
      </header>
      <ProjectForm onSubmit={submit} loading={create.isPending} />
      {create.isError && <p className="error">Não foi possível criar o projeto.</p>}
    </>
  );
}
