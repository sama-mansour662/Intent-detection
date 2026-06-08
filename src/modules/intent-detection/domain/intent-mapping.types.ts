import { ClassificationResponse } from './classification.types';

export type IntentGroup = 'cs' | 'sales' | 'payment';

export interface IntentMappingRule {
  intent: string;
  intentGroup: IntentGroup;
  recordType?: string;
  category?: string;
  subCategory?: string;
  reason?: string;
  productType?: string;
  pending?: true;
}

export interface MappedIntent {
  intent: string;
  intentGroup: IntentGroup;
}

export type ClassificationMappingInput = Pick<
  ClassificationResponse,
  'record_type' | 'category' | 'sub_category' | 'reason' | 'product_type'
>;
