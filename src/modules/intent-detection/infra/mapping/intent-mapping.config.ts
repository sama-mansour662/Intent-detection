import { IntentMappingConfig } from '../../domain/intent-mapping.types';
import { csMappingRules } from './rules/cs.rules';
import { paymentMappingRules } from './rules/payment.rules';
import { salesMappingRules } from './rules/sales.rules';

export const intentMappings: IntentMappingConfig[] = [
  {
    version: 'v1',
    rules: [...csMappingRules, ...salesMappingRules, ...paymentMappingRules],
  },
];
