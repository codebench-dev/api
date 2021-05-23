import {
  Module,
  forwardRef,
} from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benchmark } from './benchmark.entity';
import { BenchmarkService } from './benchmark.service';
import { BenchmarkController } from './benchmark.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Benchmark]),
    forwardRef(() => UsersModule),
  ],
  providers: [BenchmarkService],
  controllers: [BenchmarkController],
  exports: [BenchmarkService],

})
export class BenchmarkModule {
}