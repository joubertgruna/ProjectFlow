import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../modules/projects/entities/project.entity';
import { ProjectRisk } from '../../modules/projects/enums/project-risk.enum';
import { AiAnalysisResponseDto } from '../dto/ai-analysis-response.dto';
import { IAClient } from '../interfaces/ia-client.interface';

@Injectable()
export class MockAiClient implements IAClient {
  async analyzeProject(project: ProjectEntity, _prompt?: string): Promise<AiAnalysisResponseDto> {
    const durationDays = Math.ceil(
      (project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const attentionPoints = [
      `Status atual: ${project.status}.`,
      `Prazo estimado de ${durationDays} dias.`,
      `Orçamento total de ${project.totalBudget.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })}.`,
    ];

    if (project.risk === ProjectRisk.HIGH) {
      attentionPoints.push('Risco alto exige governança próxima e checkpoints frequentes.');
    }

    return {
      summary: `${project.name} apresenta risco ${project.risk.toLowerCase()} considerando orçamento, prazo e estágio atual.`,
      attentionPoints,
      executiveRecommendation:
        project.risk === ProjectRisk.HIGH
          ? 'Recomenda-se revisão executiva do escopo, orçamento e cronograma antes de avançar.'
          : 'Recomenda-se manter acompanhamento periódico e validar dependências críticas do plano.',
    };
  }
}
