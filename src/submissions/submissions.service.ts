import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypedJSON } from 'typedjson';
import { IsNull, Not, Repository } from 'typeorm';
import { Benchmark } from '../benchmarks/benchmark.entity';
import { BenchmarkService } from '../benchmarks/benchmark.service';
import { BenchmarkIdDto } from '../benchmarks/dto/benchmarkId.dto';
import { CyclomaticComplexity } from '../code-quality/complexity/CyclomaticComplexity';
import { CodeTokenizer } from '../code-quality/tokenizer/CodeTokenizer';
import { HashService } from '../hash/hash.service';
import { User } from '../users/user.entity';
import { FindLastSubmissionByLanguageDTO } from './dto/find-last-submission-by-language.dto';
import { FindSubmissionDTO } from './dto/find-submission.dto';
import { InsertSubmissionDTO } from './dto/insert-submission-dto';
import { JobStatusDTO } from './dto/job-status.dto';
import { Submission } from './submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(forwardRef(() => BenchmarkService))
    private benchmarkService: BenchmarkService,
  ) {}

  private hashService = new HashService();

  private codeTokenizer = new CodeTokenizer();

  private cyclomaticComplexity = new CyclomaticComplexity();

  async create(
    insertSubmissionDTO: InsertSubmissionDTO,
    lintScore: number,
    qualityScore: number,
  ): Promise<Submission> {
    const submission = new Submission(insertSubmissionDTO);
    const benchmark = await this.benchmarkService.findOne(
      insertSubmissionDTO.benchmarkId,
    );

    if (benchmark) {
      submission.benchmark = benchmark;
    }

    submission.codeHash = await this.hashService.hashCode(
      insertSubmissionDTO.code,
    );
    submission.status = 'waiting';
    submission.lintScore = lintScore;
    submission.qualityScore = qualityScore;
    submission.duplicatedSubmissions = await this.findSameSubmissions(
      insertSubmissionDTO.code,
      submission.benchmark,
      insertSubmissionDTO.language,
    );
    const tokenizedCode = this.codeTokenizer.tokenize(
      submission.code,
      submission.language,
    );
    submission.cyclomaticComplexity =
      this.cyclomaticComplexity.compute(tokenizedCode);
    // console.log(cycloComp);

    return submission.save();
  }

  async setStatus(
    id: string,
    status: string,
    message: string,
    error: string,
    stdout?: string,
    stderr?: string,
    execDuration?: number,
    memUsage?: number,
  ): Promise<Submission | undefined> {
    const submission = await this.submissionsRepository.findOne({
      id,
    });
    if (submission) {
      submission.status = status;
      if (stdout) {
        submission.stdout = stdout;
      }
      if (stderr) {
        submission.stderr = stderr;
      }
      if (message) {
        submission.message = message;
      }
      if (error) {
        submission.error = error;
      }
      if (execDuration) {
        submission.execDuration = execDuration;
      }
      if (memUsage) {
        submission.memUsage = memUsage;
      }
      await submission.save();
      return submission;
    }
    return undefined;
  }

  async findOne(
    queriedSubmission: FindSubmissionDTO,
  ): Promise<Submission | undefined> {
    // First, try to get from cache
    // const cachedSubmission = await this.cacheManager.get(queriedSubmission.id);

    // if (cachedSubmission !== '') {
    //   const serializer = new TypedJSON(Submission);

    //   const submission = serializer.parse(cachedSubmission);
    //   if (submission) {
    //     return submission;
    //   }
    // }

    // Fallback to DB
    return this.submissionsRepository.findOne({
      where: [
        {
          id: queriedSubmission.id,
        },
      ],
      relations: ['duplicatedSubmissions'],
      order: { createdAt: 'DESC' },
    });
  }

  @RabbitSubscribe({
    exchange: 'jobs_status_ex',
    routingKey: 'jobs_status_rk',
    queue: 'jobs_status_q',
  })
  public async handleJobStatus(msg: string): Promise<void> {
    // TODO: use logger instead
    // console.log(`Received job status: ${JSON.stringify(msg)}`);

    const jobSerializer = new TypedJSON(JobStatusDTO);
    const jobStatus = jobSerializer.parse(msg);

    if (jobStatus) {
      // Set in DB
      await this.setStatus(
        jobStatus.id,
        jobStatus.status,
        jobStatus.message,
        jobStatus.error,
        jobStatus.stdout,
        jobStatus.stderr,
        jobStatus.exec_duration,
        jobStatus.mem_usage,
      );

      // if (submission) {
      //   const submissionSerializer = new TypedJSON(Submission);

      //   // Set in cache to speed up polling
      //   await this.cacheManager.set(
      //     jobStatus.id,
      //     submissionSerializer.stringify(submission),
      //     { ttl: 600 },
      //   );
      // }
    }
  }

  async getLeaderboardForBenchmark(
    benchmarkId: BenchmarkIdDto,
  ): Promise<Submission[]> {
    const bench = await this.benchmarkService.findOne(benchmarkId.id);
    return this.submissionsRepository.find({
      where: [
        {
          benchmark: bench,
          qualityScore: Not(IsNull()),
        },
      ],
      relations: ['duplicatedSubmissions'],
      order: { qualityScore: 'DESC' },
    });
  }

  async findLastByLanguage(
    filter: FindLastSubmissionByLanguageDTO,
    requestUser: User,
  ): Promise<Submission | undefined> {
    const bench = await this.benchmarkService.findOne(filter.benchmarkId);
    const matchedLanguage = await this.languageMatcher(filter.language);

    if (!matchedLanguage) {
      throw new BadRequestException(`Invalid language: ${filter.language}`);
    }

    return this.submissionsRepository.findOne({
      where: [
        {
          user: requestUser,
          benchmark: bench,
          language: matchedLanguage,
        },
      ],
      relations: ['duplicatedSubmissions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findSameSubmissions(
    source: string,
    benchmark: Benchmark,
    language: string,
  ): Promise<Submission[]> {
    // Get all submissions in bench for the languages
    const submissions: Submission[] = await this.submissionsRepository.find({
      where: [
        {
          benchmark,
          language,
          codeHash: await this.hashService.hashCode(source),
        },
      ],
      order: { qualityScore: 'DESC' },
    });

    return submissions;
  }

  async languageMatcher(language: string): Promise<string | undefined> {
    switch (language) {
      case 'python':
        return 'python';
      case 'go':
        return 'go';
      case 'cpp':
        return 'cpp';
      default:
        return undefined;
    }
  }
}
