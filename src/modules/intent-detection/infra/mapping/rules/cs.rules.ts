import { IntentMappingRule } from '../../../domain/intent-mapping.types';

export const csMappingRules: IntentMappingRule[] = [
  { intent: 'CS + Cancel', intentGroup: 'cs', pending: true },
  { intent: 'CS + Amend', intentGroup: 'cs', pending: true },

  { intent: 'Stay + CS + Complaint', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + HCN', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + Special request', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + Cancel', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + Recap', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + Enquiry', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + Date amend', intentGroup: 'cs', pending: true },
  { intent: 'Stay + CS + Amend', intentGroup: 'cs', pending: true },

  {
    intent: 'Flight + CS + Cancel',
    intentGroup: 'cs',
    recordType: 'ALM - Cancellation',
    category: 'Supplier Waiving Request',
    subCategory: 'Cancel to Rebook',
    reason: 'Supplier Cancellation',
    productType: 'flight',
  },
  {
    intent: 'Flight + CS + Cancel',
    intentGroup: 'cs',
    recordType: 'ALM - Cancellation',
    productType: 'flight',
  },
  { intent: 'Flight + CS + Baggage', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Schedule Change', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Flight status', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Boarding pass', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Date amend', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Route amend', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Amend', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Terminal', intentGroup: 'cs', pending: true },
  { intent: 'Flight + CS + Complaint', intentGroup: 'cs', pending: true },
];
