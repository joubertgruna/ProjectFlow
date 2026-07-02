import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MockAiClient } from '../../ai/clients/mock-ai.client';
import { OllamaAiClient } from '../../ai/clients/ollama-ai.client';
import { OpenAiClient } from '../../ai/clients/open-ai.client';
import { IA_CLIENT } from '../../ai/interfaces/ia-client.interface';
import { ProjectAnalysisPromptBuilder } from '../../ai/prompt-builders/project-analysis-prompt.builder';
import { AiAnalysisService } from '../../ai/services/ai-analysis.service';
import { PrismaService } from '../../database/prisma.service';
import { ProjectsController } from './controllers/projects.controller';
import { EndDateAfterStartDateConstraint } from './dto/validators/end-date-after-start-date.validator';
import { ProjectsRepository } from './repositories/projects.repository';
import { ProjectStatusService } from './services/project-status.service';
import { ProjectsService } from './services/projects.service';
import { RiskCalculatorService } from './services/risk-calculator.service';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    ProjectsRepository,
    ProjectsService,
    RiskCalculatorService,
    ProjectStatusService,
    AiAnalysisService,
    ProjectAnalysisPromptBuilder,
    MockAiClient,
    OllamaAiClient,
    OpenAiClient,
    EndDateAfterStartDateConstraint,
    {
      provide: IA_CLIENT,
      inject: [ConfigService, MockAiClient, OpenAiClient, OllamaAiClient],
      useFactory: (
        config: ConfigService,
        mock: MockAiClient,
        openai: OpenAiClient,
        ollama: OllamaAiClient,
      ) => {
        const provider = config.get('AI_PROVIDER');
        if (provider === 'openai') return openai;
        if (provider === 'ollama') return ollama;
        return mock;
      },
    },
  ],
})
export class ProjectsModule {}
