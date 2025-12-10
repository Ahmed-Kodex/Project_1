import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { ScriptService } from '../service/scriptApi.service';
import { CreateScriptDto } from '../dto/create-script.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard';
import { User } from '../../../database/entities/user.entity'; // adjust path

// Define a type-safe request interface
interface AuthenticatedRequest {
  user: User;
}

@ApiTags('Script')
@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('generate-script')
  @ApiOperation({ summary: 'Generate video script using GPT' })
  async generate(
    @Body() dto: CreateScriptDto,
    @Request() req: AuthenticatedRequest, // <- type-safe request
  ) {
    const user = req.user; // properly typed as User
    return this.scriptService.generateScript(dto, user);
  }
}
