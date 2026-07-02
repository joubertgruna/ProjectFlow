import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../modules/projects/entities/project.entity';

@Injectable()
export class ProjectAnalysisPromptBuilder {
  build(project: ProjectEntity): string {
    return [
      'Analise o projeto abaixo de forma executiva.',
      `Nome: ${project.name}`,
      `Descrição: ${project.description}`,
      `Orçamento: ${project.totalBudget}`,
      `Início: ${project.startDate.toISOString()}`,
      `Término: ${project.endDate.toISOString()}`,
      `Status: ${project.status}`,
      `Risco: ${project.risk}`,
      'Retorne resumo, pontos de atenção e recomendação executiva.',
    ].join('\n');
  }
}
