import { Injectable } from '@nestjs/common';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { Benchmark } from './benchmark.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BenchmarkService {

  async create(benchmarkData: CreateBenchmarkDto, user: User): Promise<Benchmark> {
    const benchmark = new Benchmark(benchmarkData);
    benchmark.creator = user;
    return benchmark.save();
  }
}
