import { Link } from 'react-router-dom';
import { Button } from './Button';
import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';
import { Project, ProjectStatus } from '../types/project';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

type Props = { projects: Project[]; onDelete: (project: Project) => void };

export function ProjectTable({ projects, onDelete }: Props) {
  return (
    <>
      <div className="table-wrap desktop-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Risco</th>
              <th>Orçamento</th>
              <th>Início</th>
              <th>Término</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const deleteDisabled = [ProjectStatus.IN_PROGRESS, ProjectStatus.FINISHED].includes(
                project.status,
              );
              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td><StatusBadge status={project.status} /></td>
                  <td><RiskBadge risk={project.risk} /></td>
                  <td>{formatCurrency(project.totalBudget)}</td>
                  <td>{formatDate(project.startDate)}</td>
                  <td>{formatDate(project.endDate)}</td>
                  <td className="actions">
                    <Link to={`/projects/${project.id}`}>Detalhes</Link>
                    <Link to={`/projects/${project.id}/edit`}>Editar</Link>
                    <Button variant="danger" disabled={deleteDisabled} onClick={() => onDelete(project)}>Remover</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mobile-project-list">
        {projects.map((project) => {
          const deleteDisabled = [ProjectStatus.IN_PROGRESS, ProjectStatus.FINISHED].includes(
            project.status,
          );
          return (
            <article className="mobile-project-card" key={project.id}>
              <div>
                <strong>{project.name}</strong>
                <span>{formatCurrency(project.totalBudget)}</span>
              </div>
              <div className="card-badges">
                <StatusBadge status={project.status} />
                <RiskBadge risk={project.risk} />
              </div>
              <dl>
                <div><dt>Início</dt><dd>{formatDate(project.startDate)}</dd></div>
                <div><dt>Término</dt><dd>{formatDate(project.endDate)}</dd></div>
              </dl>
              <div className="actions">
                <Link to={`/projects/${project.id}`}>Detalhes</Link>
                <Link to={`/projects/${project.id}/edit`}>Editar</Link>
                <Button variant="danger" disabled={deleteDisabled} onClick={() => onDelete(project)}>Remover</Button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
