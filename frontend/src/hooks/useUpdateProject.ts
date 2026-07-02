import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import { ProjectPayload } from '../types/project';

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProjectPayload) => projectService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};
