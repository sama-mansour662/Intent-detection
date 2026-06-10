import { parsePositiveInt } from '@utils/helpers/value-coercion';

export default () => ({
  app: process.env.APP ?? 'intent-detection-service',
  port: parsePositiveInt(process.env.PORT, 3000),
  host: process.env.HOST ?? '127.0.0.1',
  env: process.env.ENV ?? 'local',
  auth: {
    secretKey: process.env.INTERNAL_SECRET_KEY,
  },
  classifier: {
    baseUrl:
      process.env.CLASSIFIER_BASE_URL?.replace(/\/$/, '') ??
      'http://ds-stage.alm-data.io',
    token: process.env.CLASSIFIER_TOKEN,
    timeoutMs: parsePositiveInt(process.env.CLASSIFIER_TIMEOUT_MS, 10000),
    retries: parsePositiveInt(process.env.CLASSIFIER_RETRIES, 2),
  },
  intentDetection: {
    fallbackIntent: process.env.FALLBACK_INTENT ?? 'live_agent_escalation',
  },
});
