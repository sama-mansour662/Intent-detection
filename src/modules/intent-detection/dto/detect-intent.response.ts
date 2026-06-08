import { ClassificationResponse } from '../domain/classification.types';

export type FallbackReason =
  | 'pending_mapping'
  | 'classification_unmapped'
  | 'classification_failed';

export interface DetectIntentResponseDto {
  intent: string;
  intentGroup?: string;
  confidence: 'mapped' | 'fallback';
  fallbackReason?: FallbackReason;
  conversationId?: string;
  classification?: ClassificationResponse;
}
