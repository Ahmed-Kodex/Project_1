import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Project } from '../../../database/entities/project.entity';
import { CreateProjectDto } from '../dto/create_project.dto';
import { User } from '../../../database/entities/user.entity';
import { UpdateProjectDto } from '../dto/update_project.dto';

interface DatabaseError {
  code?: string;
  message?: string;
}

function isDbError(error: unknown): error is DatabaseError {
  return typeof error === 'object' && error !== null && 'code' in error;
}

@Injectable()
export class ProjectService {
  private projectRepo: Repository<Project>;

  constructor(private dataSource: DataSource) {
    this.projectRepo = this.dataSource.getRepository(Project);
  }

  async saveDraft(dto: CreateProjectDto, user: User, projectId?: number) {
    try {
      let project: Project | null = null;

      if (projectId) {
        project = await this.projectRepo.findOne({
          where: { id: projectId, userId: user.id },
        });
        if (!project) throw new BadRequestException('Project not found');
      } else {
        project = this.projectRepo.create({ userId: user.id });
      }

      if (dto.audienceId) project.audienceId = parseInt(dto.audienceId);
      if (dto.videoSpecId) project.videoSpecId = parseInt(dto.videoSpecId);
      if (dto.avatarId) project.avatarId = parseInt(dto.avatarId);
      if (dto.hookIds) project.hookIds = dto.hookIds;
      if (dto.script) project.script = dto.script;

      let step = 0;
      if (project.audienceId) step = 1;
      if (project.videoSpecId) step = 2;
      if (project.avatarId) step = 3;
      if (project.hookIds?.trim()) step = 4;
      if (project.script?.trim()) step = 5;

      project.currentStep = step.toString();
      project.status = step === 5 ? 'completed' : 'draft';

      await this.projectRepo.save(project);

      return {
        status: 'success',
        message: 'Draft saved successfully',
        data: project,
      };
    } catch (err: unknown) {
      if (
        isDbError(err) &&
        (err.code === 'ER_NO_REFERENCED_ROW_2' ||
          err.code === 'ER_NO_REFERENCED_ROW')
      ) {
        throw new BadRequestException(
          'Invalid reference: One or more selected IDs do not exist.',
        );
      }

      throw err;
    }
  }
  async getProjectById(projectId: number, user: User) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId, userId: user.id },
    });
    if (!project) throw new BadRequestException('Project not found');

    return {
      status: 'success',
      message: 'Project fetched successfully',
      data: project,
    };
  }
  async updateProject(dto: UpdateProjectDto, user: User) {
    const project = await this.projectRepo.findOne({
      where: { id: dto.projectId, userId: user.id },
    });
    if (!project) throw new BadRequestException('Project not found');

    if (dto.audienceId) project.audienceId = parseInt(dto.audienceId);
    if (dto.videoSpecId) project.videoSpecId = parseInt(dto.videoSpecId);
    if (dto.avatarId) project.avatarId = parseInt(dto.avatarId);
    if (dto.hookIds) project.hookIds = dto.hookIds;
    if (dto.script) project.script = dto.script;

    let step = 0;
    if (project.audienceId) step = 1;
    if (project.videoSpecId) step = 2;
    if (project.avatarId) step = 3;
    if (project.hookIds?.trim()) step = 4;
    if (project.script?.trim()) step = 5;

    project.currentStep = step.toString();
    project.status = step === 5 ? 'completed' : 'draft';

    await this.projectRepo.save(project);

    return {
      status: 'success',
      message: 'Project updated successfully',
      data: project,
    };
  }
}
