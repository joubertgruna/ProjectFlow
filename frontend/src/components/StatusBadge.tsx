import { ProjectStatus, statusLabels } from '../types/project';

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`badge status-${status.toLowerCase()}`}>{statusLabels[status]}</span>;
}
