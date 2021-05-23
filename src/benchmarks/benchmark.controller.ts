import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateBenchmarkDto } from 'src/benchmarks/dto/create-benchmark.dto';
import { BenchmarkService } from 'src/benchmarks/benchmark.service';
import { Benchmark } from './benchmark.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidatedJWTReq } from '../auth/dto/validated-jwt-req';


@Controller('benchmarks')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBenchmark(
    @Request() req: ValidatedJWTReq,
    @Body()
      benchmark: CreateBenchmarkDto
  ) : Promise<Benchmark>{
    console.log(benchmark);
    return this.benchmarkService.create(benchmark, req.user);
  }

}