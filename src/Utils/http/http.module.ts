import { Module } from '@nestjs/common';
import { HttpUtilService } from './http.service';

@Module({
  providers: [HttpUtilService],
  exports: [HttpUtilService],
})
export class HttpUtilModule {}
