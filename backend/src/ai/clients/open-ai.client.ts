import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ProjectEntity } from '../../modules/projects/entities/project.entity';
import { AiAnalysisResponseDto } from '../dto/ai-analysis-response.dto';
import { IAClient } from '../interfaces/ia-client.interface';
import { MockAiClient } from './mock-ai.client';

@Injectable()
export class OpenAiClient implements IAClient {
  private readonly client?: OpenAI;

  constructor(
    private readonly config: ConfigService,
    private readonly fallback: MockAiClient,
  ) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    this.client = apiKey ? new OpenAI({ apiKey }) : undefined;
  }

  async analyzeProject(project: ProjectEntity, prompt: string): Promise<AiAnalysisResponseDto> {
    if (!this.client) {
      return this.fallback.analyzeProject(project, prompt);
    }

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Responda apenas JSON válido com summary, attentionPoints e executiveRecommendation.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return this.fallback.analyzeProject(project, prompt);
    return JSON.parse(content) as AiAnalysisResponseDto;
  }
}
