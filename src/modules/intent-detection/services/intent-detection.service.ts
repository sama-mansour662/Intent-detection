import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClassifierClient } from '../infra/classifier/classifier.client';
import { DetectIntentRequestDto } from '../dto/detect-intent.request';
import { DetectIntentResponseDto } from '../dto/detect-intent.response';
import { IntentMappingService } from './intent-mapping.service';
import { ClassificationResponse } from '../domain/classification.types';

@Injectable()
export class IntentDetectionService {
  private readonly logger = new Logger(IntentDetectionService.name);

  constructor(
    private readonly classifierClient: ClassifierClient,
    private readonly intentMappingService: IntentMappingService,
    private readonly configService: ConfigService,
  ) {}

  async detectIntent(request: DetectIntentRequestDto): Promise<DetectIntentResponseDto> {
    try {
      const classification = await this.classifierClient.classify({
        transcript: request.transcript,
        include_summary: request.includeSummary ?? true,
        include_subject: request.includeSubject ?? true,
        include_product_type: request.includeProductType ?? true,
      });

      const mapped = this.intentMappingService.resolve(classification);

      if (mapped) {
        return {
          intent: mapped.intent,
          intentGroup: mapped.intentGroup,
          confidence: 'mapped',
          conversationId: request.conversationId,
          classification,
        };
      }

    
      const reason = this.intentMappingService.hasPendingRules()
        ? 'pending_mapping'
        : 'classification_unmapped';

      this.logger.warn(
        `[${reason}] No intent mapping found for classifier uuid=${classification.uuid} ` +
          `record_type="${classification.record_type}" product_type="${classification.product_type ?? '-'}"`,
      );

      return this.fallback(reason, request.conversationId, classification);
    } catch (error) {
      this.logger.error(
        `Intent detection failed: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
      return this.fallback('classification_failed', request.conversationId);
    }
  }

  private fallback(
    reason: 'pending_mapping' | 'classification_unmapped' | 'classification_failed',
    conversationId?: string,
    classification?: ClassificationResponse,
  ): DetectIntentResponseDto {
    return {
      intent: this.configService.get<string>(
        'intentDetection.fallbackIntent',
        'live_agent_escalation',
      ),
      confidence: 'fallback',
      fallbackReason: reason,
      conversationId,
      classification,
    };
  }
}
