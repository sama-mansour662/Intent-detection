import { Injectable } from '@nestjs/common';
import { ClassificationResponse } from '../domain/classification.types';
import { MappedIntent } from '../domain/intent-mapping.types';
import { intentMappingRules } from '../infra/mapping/intent-mapping.config';
import { IntentMappingMapper } from '../infra/mapping/intent-mapping.mapper';

@Injectable()
export class IntentMappingService {
  resolve(classification: ClassificationResponse): MappedIntent | null {
    return IntentMappingMapper.toMappedIntent(classification, intentMappingRules);
  }

  hasPendingRules(): boolean {
    return IntentMappingMapper.hasPendingRules(intentMappingRules);
  }
}
