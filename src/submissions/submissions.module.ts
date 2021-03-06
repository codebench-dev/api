import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeQualityModule } from 'src/code-quality/code-quality.module';
import { LintModule } from 'src/lint/lint.module';
import { LintService } from 'src/lint/lint.service';
import { UsersModule } from 'src/users/users.module';
import { BenchmarkModule } from '../benchmarks/benchmark.module';
import { Submission } from './submission.entity';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    forwardRef(() => UsersModule),
    CacheModule.register(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'jobs_ex',
            type: 'direct',
          },
        ],
        uri:
          configService.get<string>('RABBITMQ_URL') ||
          'amqp://admin:admin@localhost:5672/',
      }),
    }),
    forwardRef(() => BenchmarkModule),
    CodeQualityModule,
    LintModule,
  ],
  providers: [SubmissionsService, LintService],
  controllers: [SubmissionsController],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
