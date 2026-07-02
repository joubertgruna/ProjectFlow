import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/project.service';

export const useProjectAiAnalysis = (id: string, enabled: boolean) =>
  useQuery({
    queryKey: ['projects', id, 'ai-analysis'],
    queryFn: () => projectService.analyze(id),
    enabled,
  });
