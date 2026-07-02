import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};
