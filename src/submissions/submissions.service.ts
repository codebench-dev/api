import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(insertSubmissionDTO: InsertSubmissionDTO): Promise<Submission> {
    const submission = new Submission(insertSubmissionDTO);
    submission.status = 'waiting';

    return submission.save();
  }

  async setStatus(id: string, status: string, output?: string): Promise<void> {
    const submission = await this.submissionsRepository.findOne({
      id,
    });
    if (submission) {
      submission.status = status;
      if (output) {
        submission.output = output;
      }
      await submission.save();
    }
  }

  async findOne(
    submission: FindSubmissionDTO,
  ): Promise<Submission | undefined> {
    return this.submissionsRepository.findOne({ id: submission.id });
  }

  @RabbitSubscribe({
    exchange: 'jobs_status_ex',
    routingKey: 'jobs_status_rk',
    queue: 'jobs_status_q',
  })
  public async handleJobStatus(msg: string): Promise<void> {
    // TODO: use logger instead
    console.log(`Received job status: ${JSON.stringify(msg)}`);

    const serializer = new TypedJSON(JobStatusDTO);

    const jobStatus = serializer.parse(msg);
    if (jobStatus) {
      await this.setStatus(jobStatus.id, jobStatus.status, jobStatus.stdout);
    }
  }
}
