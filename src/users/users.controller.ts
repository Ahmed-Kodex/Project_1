import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-users.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Post('create')
  // create(@Body() dto: CreateUserDto) {
  //   if (dto.password !== dto.confirmPassword) {
  //     throw new Error('Passwords do not match');
  //   }
  //   return this.usersService.create(dto.username, dto.email, dto.password);
  // }
}
