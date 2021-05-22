import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BenchmarkModule } from './benchmarks/benchmark.module';
import { HealthController } from './health/health.controller';
import ormconfig from './ormconfig';
import redisconfig from './redisconfig';
import { SubmissionsModule } from './submissions/submissions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    BenchmarkModule,
    AuthModule,
    UsersModule,
    SubmissionsModule,
    BullModule.forRoot({
      redis: redisconfig,
    }),
    RedisModule.register(redisconfig),
    TerminusModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}
