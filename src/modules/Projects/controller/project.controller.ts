import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { CreateProjectDto } from '../dto/create_project.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { User } from '../../../database/entities/user.entity';
import { UpdateProjectDto } from '../dto/update_project.dto';

interface AuthRequest {
  user: User;
}

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('save-draft')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Save project draft (partial step)' })
  async saveDraft(@Body() dto: CreateProjectDto, @Request() req: AuthRequest) {
    return this.projectService.saveDraft(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('update')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Update existing project draft' })
  async updateProject(
    @Body() dto: UpdateProjectDto,
    @Request() req: AuthRequest,
  ) {
    return this.projectService.updateProject(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  async getOne(@Param('id') id: number, @Request() req: AuthRequest) {
    return this.projectService.getProjectById(Number(id), req.user);
  }
}
