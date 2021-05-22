import { Body, Controller, Post } from '@nestjs/common';
import { CreateBenchmarkDto } from 'src/benchmarks/dto/create-benchmark.dto';
import { BenchmarkService } from 'src/benchmarks/benchmark.service';
import { Benchmark } from './benchmark.entity';


@Controller('benchmarks')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {
  }

  @Post()
  async createBenchmark(
    @Body()
      benchmark: CreateBenchmarkDto
  ) : Promise<Benchmark>{
    console.log(benchmark);
    return this.benchmarkService.create(benchmark);
  }

}