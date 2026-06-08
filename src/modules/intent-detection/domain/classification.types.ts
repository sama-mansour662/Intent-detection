export interface ClassificationRequest {
  transcript: string;
  include_summary: boolean;
  include_subject: boolean;
  include_product_type: boolean;
}

export interface ClassificationResponse {
  uuid: string;
  record_type: string;
  category: string;
  sub_category: string;
  reason: string;
  summary?: string;
  subject?: string;
  product_type?: string;
}
