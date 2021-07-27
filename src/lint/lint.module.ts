import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { LintService } from './lint.service';

@Module({
  imports: [LoggerModule.forRoot()],
  providers: [LintService],
})
export class LintModule {}
