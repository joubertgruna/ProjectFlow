import { Inject, Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../modules/projects/entities/project.entity';
import { AiAnalysisResponseDto } from '../dto/ai-analysis-response.dto';
import { IA_CLIENT, IAClient } from '../interfaces/ia-client.interface';
import { ProjectAnalysisPromptBuilder } from '../prompt-builders/project-analysis-prompt.builder';

@Injectable()
export class AiAnalysisService {
  constructor(
    @Inject(IA_CLIENT) private readonly aiClient: IAClient,
    private readonly promptBuilder: ProjectAnalysisPromptBuilder,
  ) {}

  analyze(project: ProjectEntity): Promise<AiAnalysisResponseDto> {
    return this.aiClient.analyzeProject(project, this.promptBuilder.build(project));
  }
}
