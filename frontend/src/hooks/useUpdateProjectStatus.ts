import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import { ProjectStatus } from '../types/project';

export const useUpdateProjectStatus = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: ProjectStatus) => projectService.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};
