import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProjectEntity } from '../../modules/projects/entities/project.entity';
import { AiAnalysisResponseDto } from '../dto/ai-analysis-response.dto';
import { IAClient } from '../interfaces/ia-client.interface';
import { MockAiClient } from './mock-ai.client';

type OllamaResponse = {
  response?: string;
};

@Injectable()
export class OllamaAiClient implements IAClient {
  private readonly logger = new Logger(OllamaAiClient.name);
  private readonly baseUrl: string;
  private readonly model: string;

  constructor(
    private readonly config: ConfigService,
    private readonly fallback: MockAiClient,
  ) {
    this.baseUrl = this.config.get<string>('OLLAMA_BASE_URL') ?? 'http://ollama:11434';
    this.model = this.config.get<string>('OLLAMA_MODEL') ?? 'qwen2.5:0.5b';
  }

  async analyzeProject(project: ProjectEntity, prompt: string): Promise<AiAnalysisResponseDto> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          stream: false,
          format: 'json',
          prompt: [
            'Responda apenas JSON válido com as chaves summary, attentionPoints e executiveRecommendation.',
            'attentionPoints deve ser uma lista de strings.',
            prompt,
          ].join('\n\n'),
        }),
      });

      if (!response.ok) {
        this.logger.warn(`Ollama returned ${response.status} for model ${this.model}`);
        return this.fallback.analyzeProject(project, prompt);
      }

      const body = (await response.json()) as OllamaResponse;
      if (!body.response) return this.fallback.analyzeProject(project, prompt);

      return this.parseResponse(body.response, project, prompt);
    } catch (error) {
      this.logger.warn(`Ollama analysis failed: ${(error as Error).message}`);
      return this.fallback.analyzeProject(project, prompt);
    }
  }

  private parseResponse(
    content: string,
    project: ProjectEntity,
    prompt: string,
  ): Promise<AiAnalysisResponseDto> | AiAnalysisResponseDto {
    try {
      const parsed = JSON.parse(content) as Partial<AiAnalysisResponseDto>;
      if (
        typeof parsed.summary === 'string' &&
        Array.isArray(parsed.attentionPoints) &&
        parsed.attentionPoints.every((point) => typeof point === 'string') &&
        typeof parsed.executiveRecommendation === 'string'
      ) {
        return parsed as AiAnalysisResponseDto;
      }
    } catch {
      this.logger.warn('Ollama returned invalid JSON. Falling back to deterministic analysis.');
    }

    return this.fallback.analyzeProject(project, prompt);
  }
}
