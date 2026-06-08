import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { HttpAgent, HttpsAgent } from 'agentkeepalive';

@Injectable()
export class HttpUtilService {
  private readonly logger = new Logger(HttpUtilService.name);
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
      httpAgent: new HttpAgent({
        keepAlive: true,
        maxSockets: 100,
        freeSocketTimeout: 4000,
      }),
      httpsAgent: new HttpsAgent({
        keepAlive: true,
        maxSockets: 100,
        freeSocketTimeout: 4000,
      }),
    });
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('POST', url, { ...config, data });
  }

  private async request<T>(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const start = Date.now();

    try {
      const { data } = await this.client.request<T>({ method, url, ...config });
      this.logger.debug(`[HTTP] ${method} ${url} (${Date.now() - start}ms)`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        // Re-throw as HttpException so callers get a structured error.
        // Logging is intentionally left to the caller — it knows whether this
        // is a retry attempt (WARN) or a final failure (ERROR).
        throw new HttpException(error.response?.data ?? error.message, status);
      }

      throw new InternalServerErrorException('Unexpected HTTP client error');
    }
  }
}
