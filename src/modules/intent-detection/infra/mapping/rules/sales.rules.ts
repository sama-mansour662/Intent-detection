import { IntentMappingRule } from '../../../domain/intent-mapping.types';

export const salesMappingRules: IntentMappingRule[] = [
  { intent: 'Sales + Enquiry', intentGroup: 'sales', pending: true },
  { intent: 'Flight + Sales', intentGroup: 'sales', pending: true },
  { intent: 'Stay + Sales', intentGroup: 'sales', pending: true },
  { intent: 'Airport transfer + Sales', intentGroup: 'sales', pending: true },
  { intent: 'Activities + sales', intentGroup: 'sales', pending: true },
  { intent: 'Cruises + sales', intentGroup: 'sales', pending: true },
];
