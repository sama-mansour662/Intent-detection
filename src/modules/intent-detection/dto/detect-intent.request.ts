import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class DetectIntentRequestDto {
  @IsString()
  @MinLength(1)
  transcript!: string;

  @IsOptional()
  @IsString()
  conversationId?: string;

  @IsOptional()
  @IsBoolean()
  includeSummary?: boolean;

  @IsOptional()
  @IsBoolean()
  includeSubject?: boolean;

  @IsOptional()
  @IsBoolean()
  includeProductType?: boolean;
}
