import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { TypedJSON } from 'typedjson';
import { Repository } from 'typeorm';
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
  ) {}

  async create(insertSubmissionDTO: InsertSubmissionDTO): Promise<Submission> {
    const submission = new Submission(insertSubmissionDTO);
    submission.status = 'waiting';

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
}
