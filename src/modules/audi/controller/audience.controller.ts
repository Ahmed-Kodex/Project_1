import { Controller, Get } from '@nestjs/common';
import { AudienceService } from '../service/audience.service';

@Controller('audience')
export class AudienceController {
  constructor(private readonly audienceService: AudienceService) {}

  @Get()
  findAll() {
    return this.audienceService.findAll();
  }
}
