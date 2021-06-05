import { Module } from '@nestjs/common';
import { CodeQualityService } from './code-quality.service';

@Module({
  providers: [CodeQualityService],
  exports: [CodeQualityService],
})
export class CodeQualityModule {}
