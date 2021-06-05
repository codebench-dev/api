import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BenchmarkModule } from './benchmarks/benchmark.module';
import { CodeQualityModule } from './code-quality/code-quality.module';
import { HealthController } from './health/health.controller';
import { LintModule } from './lint/lint.module';
import ormconfig from './ormconfig';
import { SubmissionsModule } from './submissions/submissions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...ormconfig, keepConnectionAlive: true }),
    BenchmarkModule,
    AuthModule,
    UsersModule,
    SubmissionsModule,
    TerminusModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    }),
    CodeQualityModule,
    LintModule,
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}
