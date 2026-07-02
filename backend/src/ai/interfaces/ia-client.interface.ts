import { ProjectEntity } from '../../modules/projects/entities/project.entity';
import { AiAnalysisResponseDto } from '../dto/ai-analysis-response.dto';

export interface IAClient {
  analyzeProject(project: ProjectEntity, prompt: string): Promise<AiAnalysisResponseDto>;
}

export const IA_CLIENT = Symbol('IA_CLIENT');
