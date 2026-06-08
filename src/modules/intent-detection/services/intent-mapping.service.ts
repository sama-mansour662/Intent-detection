import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClassificationResponse } from '../domain/classification.types';
import { IntentMappingConfig, MappedIntent } from '../domain/intent-mapping.types';
import { intentMappings } from '../infra/mapping/intent-mapping.config';
import { IntentMappingMapper } from '../infra/mapping/intent-mapping.mapper';

@Injectable()
export class IntentMappingService {
  constructor(private readonly configService: ConfigService) {}

  resolve(classification: ClassificationResponse): MappedIntent | null {
    return IntentMappingMapper.toMappedIntent(classification, this.activeMapping());
  }

  hasPendingRules(): boolean {
    return IntentMappingMapper.hasPendingRules(this.activeMapping());
  }

  private activeMapping(): IntentMappingConfig {
    const version = this.configService.get<string>(
      'intentDetection.mappingVersion',
      'v1',
    );
    return intentMappings.find((m) => m.version === version) ?? intentMappings[0];
  }
}
