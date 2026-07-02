import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { Loading } from '../components/Loading';
import { ProjectTable } from '../components/ProjectTable';
import { useDeleteProject } from '../hooks/useDeleteProject';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types/project';

export function ProjectListPage() {
  const { data, isLoading, isError } = useProjects();
  const remove = useDeleteProject();

  const handleDelete = (project: Project) => {
    if (confirm(`Deseja remover o projeto ${project.name}?`)) remove.mutate(project.id);
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;

  return (
    <>
      <header className="page-header">
        <div>
          <h1>Projetos</h1>
          <p>Cadastro, acompanhamento e análise inteligente de projetos.</p>
        </div>
        <Link className="button button-primary" to="/projects/new">
          Criar novo projeto
        </Link>
      </header>
      {!data?.length ? <EmptyState /> : <ProjectTable projects={data} onDelete={handleDelete} />}
    </>
  );
}
