import { HttpException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { HttpUtilService } from '@utils/http/http.service';
import {
  ClassificationRequest,
  ClassificationResponse,
} from '../../domain/classification.types';

@Injectable()
export class ClassifierClient {
  private readonly logger = new Logger(ClassifierClient.name);

  constructor(
    private readonly httpService: HttpUtilService,
    private readonly configService: ConfigService,
  ) {}

  async classify(
    request: ClassificationRequest,
  ): Promise<ClassificationResponse> {
    const baseUrl = this.configService.getOrThrow<string>('classifier.baseUrl');
    const token = this.configService.get<string>('classifier.token');
    const timeout = this.configService.get<number>('classifier.timeoutMs', 2500);
    const retries = this.configService.get<number>('classifier.retries', 2);

    if (!token) {
      throw new ServiceUnavailableException('Classifier token is not configured');
    }

    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        return await this.httpService.post<ClassificationResponse>(
          `${baseUrl}/classify-intent`,
          request,
          {
            timeout,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        lastError = error;
        this.logAttemptFailure(error, attempt, retries);
      }
    }

    throw new ServiceUnavailableException({
      message: 'Classifier service is unavailable',
      cause: this.errorMessage(lastError),
    });
  }

  private logAttemptFailure(
    error: unknown,
    attempt: number,
    retries: number,
  ): void {
    const isFinalAttempt = attempt === retries;
    const level = isFinalAttempt ? 'error' : 'warn';
    this.logger[level](
      `Classifier attempt ${attempt + 1}/${retries + 1} failed: ${this.errorMessage(
        error,
      )}`,
    );
  }

  private errorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
      return error.response
        ? `HTTP ${error.response.status} ${error.response.statusText}`
        : error.message;
    }
    if (error instanceof HttpException) {
      const response = error.getResponse();
      return typeof response === 'string' ? response : error.message;
    }
    return error instanceof Error ? error.message : 'unknown error';
  }
}
