import { BadRequestException } from '@nestjs/common';
import { ProjectStatus } from '../enums/project-status.enum';
import { ProjectStatusService } from '../services/project-status.service';

describe('ProjectStatusService', () => {
  const service = new ProjectStatusService();

  it('permite transição ANALYSIS para APPROVED', () => {
    expect(service.canTransition(ProjectStatus.ANALYSIS, ProjectStatus.APPROVED)).toBe(true);
  });

  it('bloqueia transição ANALYSIS para IN_PROGRESS', () => {
    expect(service.canTransition(ProjectStatus.ANALYSIS, ProjectStatus.IN_PROGRESS)).toBe(false);
  });

  it('permite cancelamento a partir de qualquer status', () => {
    Object.values(ProjectStatus).forEach((status) => {
      expect(service.canTransition(status, ProjectStatus.CANCELLED)).toBe(true);
    });
  });

  it('bloqueia exclusão para IN_PROGRESS', () => {
    expect(() => service.assertCanDelete(ProjectStatus.IN_PROGRESS)).toThrow(BadRequestException);
  });

  it('bloqueia exclusão para FINISHED', () => {
    expect(() => service.assertCanDelete(ProjectStatus.FINISHED)).toThrow(BadRequestException);
  });
});
