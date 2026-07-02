import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/project.service';

export const useProject = (id: string) =>
  useQuery({ queryKey: ['projects', id], queryFn: () => projectService.get(id), enabled: Boolean(id) });
