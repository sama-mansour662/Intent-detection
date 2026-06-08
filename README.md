# Intent Detection Service

NestJS service that replaces Infobip intent detection with a deterministic mapping layer on top of the ML classification API.

## Flow

1. WhatsApp/chatbot sends a transcript to `POST /api/v1/intent-detection`.
2. The service calls `POST /classify-intent` on the ML classifier.
3. The mapping engine translates business classification fields into chatbot intents.
4. If classification fails or no mapping exists, the response routes to the configured fallback intent.

## Setup

```bash
npm install
cp .env.example .env
npm run start:dev
```

Set these values in `.env` before calling the service:

```bash
INTERNAL_SECRET_KEY=shared-secret-used-by-whatsappct
CLASSIFIER_TOKEN=ml-classifier-token
```

WhatsAppCT should call this service with:

```http
x-internal-secret: shared-secret-used-by-whatsappct
```

## Request

```bash
curl --location 'http://localhost:3000/api/v1/intent-detection' \
  --header 'Content-Type: application/json' \
  --header 'x-internal-secret: shared-secret-used-by-whatsappct' \
  --data '{
    "transcript": "The flight was cancelled, and this is the file number.75437623",
    "conversationId": "wa-123",
    "includeSummary": true,
    "includeSubject": true,
    "includeProductType": true
  }'
```

## Response

```json
{
  "intent": "Flight + CS + Cancel",
  "intentGroup": "cs",
  "confidence": "mapped",
  "mappingVersion": "v1",
  "conversationId": "wa-123",
  "classification": {
    "uuid": "483d0d52-d044-4cea-975c-e68614b9fd42",
    "record_type": "ALM - Cancellation",
    "category": "Supplier Waiving Request",
    "sub_category": "Cancel to Rebook",
    "reason": "Supplier Cancellation",
    "summary": "The customer is following up on a previously cancelled flight and provides a file number for reference.",
    "subject": "Follow-up on cancelled flight with file number 75437623",
    "product_type": "flight"
  }
}
```

## Mapping

Mappings live in `src/modules/intent-detection/infra/mapping/intent-mapping.config.ts`.

Rules are evaluated in order. More specific rules should come before broader fallback rules. Add a new mapping version by appending a new config object and setting `INTENT_MAPPING_VERSION`.
