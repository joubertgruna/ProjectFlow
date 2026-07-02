import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { AiAnalysisResponseDto } from '../../../ai/dto/ai-analysis-response.dto';
import { AiAnalysisService } from '../../../ai/services/ai-analysis.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectStatusDto } from '../dto/update-project-status.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectStatus } from '../enums/project-status.enum';
import { ProjectsRepository } from '../repositories/projects.repository';
import { ProjectStatusService } from './project-status.service';
import { RiskCalculatorService } from './risk-calculator.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly repository: ProjectsRepository,
    private readonly riskCalculator: RiskCalculatorService,
    private readonly statusService: ProjectStatusService,
    private readonly aiAnalysisService: AiAnalysisService,
  ) {}

  async create(dto: CreateProjectDto): Promise<ProjectEntity> {
    const risk = this.riskCalculator.calculate(dto.totalBudget, dto.startDate, dto.endDate);
    const project = await this.repository.create({
      ...dto,
      status: ProjectStatus.ANALYSIS,
      risk,
    });
    return this.toEntity(project);
  }

  async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.repository.findAll();
    return projects.map((project) => this.toEntity(project));
  }

  async findById(id: string): Promise<ProjectEntity> {
    const project = await this.repository.findById(id);
    if (!project) throw new NotFoundException('Projeto não encontrado');
    return this.toEntity(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectEntity> {
    const current = await this.findById(id);
    const startDate = dto.startDate ?? current.startDate;
    const endDate = dto.endDate ?? current.endDate;
    const totalBudget = dto.totalBudget ?? current.totalBudget;
    const risk = this.riskCalculator.calculate(totalBudget, startDate, endDate);
    const project = await this.repository.update(id, { ...dto, risk });
    return this.toEntity(project);
  }

  async updateStatus(id: string, dto: UpdateProjectStatusDto): Promise<ProjectEntity> {
    const current = await this.findById(id);
    this.statusService.assertTransition(current.status, dto.status);
    const project = await this.repository.update(id, { status: dto.status });
    return this.toEntity(project);
  }

  async delete(id: string): Promise<void> {
    const project = await this.findById(id);
    this.statusService.assertCanDelete(project.status);
    await this.repository.delete(id);
  }

  async analyze(id: string): Promise<AiAnalysisResponseDto> {
    return this.aiAnalysisService.analyze(await this.findById(id));
  }

  private toEntity(project: Project): ProjectEntity {
    return {
      id: project.id,
      name: project.name,
      startDate: project.startDate,
      endDate: project.endDate,
      totalBudget: project.totalBudget.toNumber(),
      description: project.description,
      status: project.status as ProjectEntity['status'],
      risk: project.risk as ProjectEntity['risk'],
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    } as ProjectEntity;
  }
}
