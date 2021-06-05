import { Module } from '@nestjs/common';
import { LintService } from './lint.service';

@Module({
  providers: [LintService]
})
export class LintModule {}
