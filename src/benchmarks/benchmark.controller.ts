import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateBenchmarkDto } from 'src/benchmarks/dto/create-benchmark.dto';
import { BenchmarkService } from 'src/benchmarks/benchmark.service';
import { Benchmark } from './benchmark.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidatedJWTReq } from '../auth/dto/validated-jwt-req';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BenchmarkIdDto } from './dto/benchmarkId.dto';


@Controller('benchmarks')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {
  }

  @ApiOperation({ summary: 'Create a benchmark' })
  @ApiOkResponse({type: Benchmark, description: 'Created benchmark'})

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBenchmark(
    @Request() req: ValidatedJWTReq,
    @Body()
      benchmark: CreateBenchmarkDto
  ) : Promise<Benchmark>{
    return this.benchmarkService.create(benchmark, req.user);
  }

  @ApiOperation({ summary: 'Get all benchmarks' })
  @ApiOkResponse({type: [Benchmark], description: 'Array of benchmarks'})
  @Get()
  async getEveryBenchMarks() : Promise<Benchmark[]> {
    return this.benchmarkService.getAll();
  }

  @ApiOperation({ summary: 'Get benchmark by id' })
  @ApiOkResponse({type: Benchmark, description: 'Requested benchmark'})
  @Get(':id')
  async getBenchmarkById(@Param() id: BenchmarkIdDto): Promise<Benchmark | undefined> {
    const benchmark =  await this.benchmarkService.findOne(id);

    return benchmark;
  }


}