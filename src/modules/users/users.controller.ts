import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../modules/auth/guard/jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get paginated users list' })
  @Get()
  findAll(@Query() paginationDto: UsersDto) {
    return this.usersService.findAllpaginated(paginationDto);
  }
}
