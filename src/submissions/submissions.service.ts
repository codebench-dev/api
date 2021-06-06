import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  BadRequestException,
  CACHE_MANAGER,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { TypedJSON } from 'typedjson';
import { Repository } from 'typeorm';
import { BenchmarkService } from '../benchmarks/benchmark.service';
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(forwardRef(() => BenchmarkService))
    private benchmarkService: BenchmarkService,
  ) {}

  async create(insertSubmissionDTO: InsertSubmissionDTO): Promise<Submission> {
    const submission = new Submission(insertSubmissionDTO);
    submission.status = 'waiting';

    const benchmark = await this.benchmarkService.findOne(
      insertSubmissionDTO.benchmarkId,
    );

    if (benchmark) {
      submission.benchmark = benchmark;
    }

    return submission.save();
  }

  async setStatus(
    id: string,
    status: string,
    stdout?: string,
    stderr?: string,
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
      await submission.save();
      return submission;
    }
    return undefined;
  }

  async findOne(
    queriedSubmission: FindSubmissionDTO,
  ): Promise<Submission | undefined> {
    // First, try to get from cache
    const cachedSubmission = await this.cacheManager.get(queriedSubmission.id);

    if (cachedSubmission !== '') {
      const serializer = new TypedJSON(Submission);

      const submission = serializer.parse(cachedSubmission);
      if (submission) {
        return submission;
      }
    }

    // Fallback to DB
    return this.submissionsRepository.findOne({ id: queriedSubmission.id });
  }

  @RabbitSubscribe({
    exchange: 'jobs_status_ex',
    routingKey: 'jobs_status_rk',
    queue: 'jobs_status_q',
  })
  public async handleJobStatus(msg: string): Promise<void> {
    // TODO: use logger instead
    console.log(`Received job status: ${JSON.stringify(msg)}`);

    const jobSerializer = new TypedJSON(JobStatusDTO);
    const jobStatus = jobSerializer.parse(msg);

    if (jobStatus) {
      // Set in DB
      const submission = await this.setStatus(
        jobStatus.id,
        jobStatus.status,
        jobStatus.stdout,
      );

      if (submission) {
        const submissionSerializer = new TypedJSON(Submission);

        // Set in cache to speed up polling
        await this.cacheManager.set(
          jobStatus.id,
          submissionSerializer.stringify(submission),
          { ttl: 600 },
        );
      }
    }
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
      order: { createdAt: 'DESC' },
    });
  }

  async languageMatcher(language: string): Promise<string | undefined> {
    switch (language) {
      case 'python':
        return 'cpython3';
      default:
        return undefined;
    }
  }
}
