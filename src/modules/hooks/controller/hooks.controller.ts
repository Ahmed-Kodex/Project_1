import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { HookService } from '../service/hooks.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { CreateHookDto, paginatedHookDto } from '../dto/create-hook.dto';

@ApiTags('Hooks')
@Controller('hooks')
export class HookController {
  constructor(private readonly hookService: HookService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all hooks with pagination' })
  async getAllHooks(@Query() query: paginatedHookDto) {
    return this.hookService.findAllPaginated(query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('create')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Create a new hook' })
  async createHook(@Body() dto: CreateHookDto, @Request() req) {
    const user = req.user;
    return this.hookService.create(dto, user);
  }
}
