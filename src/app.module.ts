import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/configuration';
import { IntentDetectionModule } from '@modules/intent-detection/intent-detection.module';
import { HealthModule } from '@modules/health/health.module';
import { ApiKeyAuthGuard } from '@common/guards/api-key-auth.guard';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HealthModule,
    IntentDetectionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
