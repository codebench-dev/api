import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionsModule } from 'src/submissions/submissions.module';
import { UsersModule } from 'src/users/users.module';
import { BenchmarkController } from './benchmark.controller';
import { Benchmark } from './benchmark.entity';
import { BenchmarkService } from './benchmark.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Benchmark]),
    forwardRef(() => UsersModule),
    SubmissionsModule,
  ],
  providers: [BenchmarkService],
  controllers: [BenchmarkController],
  exports: [BenchmarkService],
})
export class BenchmarkModule {}
