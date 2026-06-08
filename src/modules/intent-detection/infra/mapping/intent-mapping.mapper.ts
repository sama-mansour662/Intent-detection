import { ClassificationResponse } from '../../domain/classification.types';
import { IntentMappingRule, MappedIntent } from '../../domain/intent-mapping.types';

export class IntentMappingMapper {
  static hasPendingRules(rules: IntentMappingRule[]): boolean {
    return rules.some((r) => r.pending);
  }

  static toMappedIntent(
    classification: ClassificationResponse,
    rules: IntentMappingRule[],
  ): MappedIntent | null {
    const rule = rules.find(
      (candidate) => !candidate.pending && IntentMappingMapper.matches(candidate, classification),
    );

    if (!rule) return null;

    return {
      intent: rule.intent,
      intentGroup: rule.intentGroup,
    };
  }

  private static matches(
    rule: IntentMappingRule,
    classification: ClassificationResponse,
  ): boolean {
    return (
      IntentMappingMapper.matchesField(rule.recordType, classification.record_type) &&
      IntentMappingMapper.matchesField(rule.category, classification.category) &&
      IntentMappingMapper.matchesField(rule.subCategory, classification.sub_category) &&
      IntentMappingMapper.matchesField(rule.reason, classification.reason) &&
      IntentMappingMapper.matchesField(rule.productType, classification.product_type)
    );
  }

  private static matchesField(expected?: string, actual?: string): boolean {
    return expected === undefined || expected === actual;
  }
}
