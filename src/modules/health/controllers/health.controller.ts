import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { Public } from '@common/decorators/public.decorator';

@Public()
@Controller({ version: VERSION_NEUTRAL })
export class HealthController {
  @Get('/health')
  getHealth(): string {
    return 'OK';
  }

  @Get('/ping')
  getPing(): string {
    return 'OK';
  }
}
