import { Injectable } from '@nestjs/common';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { Benchmark } from './benchmark.entity';

@Injectable()
export class BenchmarkService {

  async create(benchmarkData: CreateBenchmarkDto): Promise<Benchmark> {
    const benchmark = new Benchmark(benchmarkData);
    // TODO : Link benchmark to user
    return benchmark.save();
  }
}
