import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};
