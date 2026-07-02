import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AiAnalysisResponseDto } from '../../../ai/dto/ai-analysis-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectResponseDto } from '../dto/project-response.dto';
import { UpdateProjectStatusDto } from '../dto/update-project-status.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectsService } from '../services/projects.service';

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOkResponse({ type: ProjectResponseDto })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [ProjectResponseDto] })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectResponseDto })
  findById(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProjectResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

  @Patch(':id/status')
  @ApiOkResponse({ type: ProjectResponseDto })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateProjectStatusDto) {
    return this.projectsService.updateStatus(id, dto);
  }

  @Get(':id/ai-analysis')
  @ApiOkResponse({ type: AiAnalysisResponseDto })
  analyze(@Param('id') id: string) {
    return this.projectsService.analyze(id);
  }
}
