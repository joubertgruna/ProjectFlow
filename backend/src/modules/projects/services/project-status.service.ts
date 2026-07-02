import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectStatus } from '../enums/project-status.enum';

@Injectable()
export class ProjectStatusService {
  canTransition(from: ProjectStatus, to: ProjectStatus): boolean {
    if (to === ProjectStatus.CANCELLED) return true;

    const allowed: Record<ProjectStatus, ProjectStatus[]> = {
      [ProjectStatus.ANALYSIS]: [ProjectStatus.APPROVED],
      [ProjectStatus.APPROVED]: [ProjectStatus.IN_PROGRESS],
      [ProjectStatus.IN_PROGRESS]: [ProjectStatus.FINISHED],
      [ProjectStatus.FINISHED]: [],
      [ProjectStatus.CANCELLED]: [],
    };

    return allowed[from].includes(to);
  }

  assertTransition(from: ProjectStatus, to: ProjectStatus) {
    if (!this.canTransition(from, to)) {
      throw new BadRequestException(`Transição de status inválida: ${from} para ${to}`);
    }
  }

  assertCanDelete(status: ProjectStatus) {
    if ([ProjectStatus.IN_PROGRESS, ProjectStatus.FINISHED].includes(status)) {
      throw new BadRequestException('Projetos em andamento ou encerrados não podem ser excluídos');
    }
  }
}
