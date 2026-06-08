import { Module } from '@nestjs/common';
import { HttpUtilModule } from '@utils/http/http.module';
import { IntentDetectionController } from './controllers/intent-detection.controller';
import { IntentDetectionService } from './services/intent-detection.service';
import { ClassifierClient } from './infra/classifier/classifier.client';
import { IntentMappingService } from './services/intent-mapping.service';

@Module({
  imports: [HttpUtilModule],
  controllers: [IntentDetectionController],
  providers: [IntentDetectionService, ClassifierClient, IntentMappingService],
})
export class IntentDetectionModule {}
