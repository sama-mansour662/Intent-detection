import { IntentMappingRule } from '../../../domain/intent-mapping.types';

export const paymentMappingRules: IntentMappingRule[] = [
  { intent: 'Apple pay', intentGroup: 'payment', pending: true },
  { intent: 'Tabby', intentGroup: 'payment', pending: true },
  { intent: 'Tamara', intentGroup: 'payment', pending: true },
  { intent: 'Qitaf', intentGroup: 'payment', pending: true },
  { intent: 'Alfursan', intentGroup: 'payment', pending: true },
  { intent: 'bank installments', intentGroup: 'payment', pending: true },
  { intent: 'Mokafa', intentGroup: 'payment', pending: true },
  { intent: 'Credit card', intentGroup: 'payment', pending: true },
];
