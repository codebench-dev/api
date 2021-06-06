import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BenchmarkService } from 'src/benchmarks/benchmark.service';
import { CreateBenchmarkDto } from 'src/benchmarks/dto/create-benchmark.dto';
import { ValidatedJWTReq } from '../auth/dto/validated-jwt-req';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Benchmark } from './benchmark.entity';
import { BenchmarkIdDto } from './dto/benchmarkId.dto';

@Controller('benchmarks')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {}

  @ApiOperation({ summary: 'Create a benchmark' })
  @ApiOkResponse({ type: Benchmark, description: 'Created benchmark' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBenchmark(
    @Request() req: ValidatedJWTReq,
    @Body()
    benchmark: CreateBenchmarkDto,
  ): Promise<Benchmark> {
    return this.benchmarkService.create(benchmark, req.user);
  }

  @ApiOperation({ summary: 'Get all benchmarks' })
  @ApiOkResponse({ type: [Benchmark], description: 'Array of benchmarks' })
  @Get()
  async getEveryBenchMarks(): Promise<Benchmark[]> {
    return this.benchmarkService.getAll();
  }

  @ApiOperation({ summary: 'Get benchmark by id' })
  @ApiOkResponse({ type: Benchmark, description: 'Requested benchmark' })
  @Get(':id')
  async getBenchmarkById(
    @Param() benchmarkIdDto: BenchmarkIdDto,
  ): Promise<Benchmark | undefined> {
    return this.benchmarkService.findOne(benchmarkIdDto.id);
  }
}
