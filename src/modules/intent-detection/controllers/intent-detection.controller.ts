import { Body, Controller, Post } from '@nestjs/common';
import { DetectIntentRequestDto } from '../dto/detect-intent.request';
import { DetectIntentResponseDto } from '../dto/detect-intent.response';
import { IntentDetectionService } from '../services/intent-detection.service';

@Controller('intent-detection')
export class IntentDetectionController {
  constructor(
    private readonly intentDetectionService: IntentDetectionService,
  ) {}

  @Post()
  detectIntent(
    @Body() request: DetectIntentRequestDto,
  ): Promise<DetectIntentResponseDto> {
    return this.intentDetectionService.detectIntent(request);
  }
}
