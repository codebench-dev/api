import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BenchmarkService } from 'src/benchmarks/benchmark.service';
import { CreateBenchmarkDto } from 'src/benchmarks/dto/create-benchmark.dto';
import { FindSubmissionIDDTO } from 'src/submissions/dto/find-submission-id.dto';
import { FindSubmissionLangDTO } from 'src/submissions/dto/find-submission-lang.dto';
import { Submission } from 'src/submissions/submission.entity';
import { SubmissionsService } from 'src/submissions/submissions.service';
import { ValidatedJWTReq } from '../auth/dto/validated-jwt-req';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Benchmark } from './benchmark.entity';
import { BenchmarkIdDto } from './dto/benchmarkId.dto';

@Controller('benchmarks')
export class BenchmarkController {
  constructor(
    private readonly benchmarkService: BenchmarkService,
    private readonly submissionsService: SubmissionsService,
  ) {}

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

  @ApiOperation({ summary: 'Get last submission for benchmark + language' })
  @UseGuards(JwtAuthGuard)
  @Get(':id/submissions/last')
  async findLastForUserByLanguage(
    @Request() req: ValidatedJWTReq,
    @Query() query: FindSubmissionLangDTO,
    @Param() params: FindSubmissionIDDTO,
  ): Promise<Submission> {
    const submission: Submission | undefined =
      await this.submissionsService.findLastByLanguage(
        {
          benchmarkId: params.id,
          language: query.language,
        },
        req.user,
      );

    if (!submission) {
      throw new NotFoundException();
    }

    return submission;
  }
}
