export const CS_INTENTS = [
  'CS + Cancel',
  'CS + Amend',

] as const;

export const STAY_CS_INTENTS = [
  'Stay + CS + Complaint',
  'Stay + CS + HCN',
  'Stay + CS + Special request',
  'Stay + CS + Cancel',
  'Stay + CS + Recap',
  'Stay + CS + Enquiry',
  'Stay + CS + Date amend',
  'Stay + CS + Amend',
] as const;


export const FLIGHT_CS_INTENTS = [
  'Flight + CS + Baggage',
  'Flight + CS + Schedule Change',
  'Flight + CS + Flight status',
  'Flight + CS + Boarding pass',
  'Flight + CS + Date amend',
  'Flight + CS + Route amend',
  'Flight + CS + Amend',
  'Flight + CS + Cancel',
  'Flight + CS + Terminal',
  'Flight + CS + Complaint',
] as const;

export type CsIntent = (typeof CS_INTENTS)[number];
export type StayCsIntent = (typeof STAY_CS_INTENTS)[number];
export type FlightCsIntent = (typeof FLIGHT_CS_INTENTS)[number];

export const SALES_INTENTS = [
  'Sales + Enquiry',
  'Flight + Sales',
  'Stay + Sales',
  'Airport transfer + Sales',
  'Activities + sales',
  'Cruises + sales',
] as const;

export type SalesIntent = (typeof SALES_INTENTS)[number];


export const PAYMENT_INTENTS = [
  'Apple pay',
  'Tabby',
  'Tamara',
  'Qitaf',
  'Alfursan',
  'bank installments',
  'Mokafa',
  'Credit card',
] as const;

export type PaymentIntent = (typeof PAYMENT_INTENTS)[number];


export const ALL_INTENTS = [...CS_INTENTS, ...STAY_CS_INTENTS, ...FLIGHT_CS_INTENTS, ...SALES_INTENTS, ...PAYMENT_INTENTS] as const;

export type KnownIntent = CsIntent | StayCsIntent | FlightCsIntent | SalesIntent | PaymentIntent;
