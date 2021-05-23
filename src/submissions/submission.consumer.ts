import {
  OnGlobalQueueActive,
  OnGlobalQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { RedisService } from 'nestjs-redis';
import { JobDTO } from './dto/job.dto';
import { SubmissionsService } from './submissions.service';

@Processor('submissions')
export class SubmissionsConsumer {
  constructor(
    private readonly redisService: RedisService,
    private readonly submissionsService: SubmissionsService,
  ) {}

  private readonly logger = new Logger(SubmissionsConsumer.name);

  @OnGlobalQueueActive()
  onActive(job: Job): void {
    // eslint-disable-next-line no-console
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnGlobalQueueCompleted()
  async onCompleted(job: Job, result: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedRes: { realID: string; output: string } = JSON.parse(result);

    await this.submissionsService.setStatus(
      parsedRes.realID,
      'completed',
      parsedRes.output,
    );
  }

  @Process()
  async transcode(job: Job<JobDTO>): Promise<unknown> {
    const client = this.redisService.getClient();

    await client.rpush(
      'jobs',
      JSON.stringify({
        id: job.data.realID,
        code: job.data.code,
        variant: job.data.language,
      }),
    );

    while (true) {
      const res = await client.blpop(
        `worker_job_status_${job.data.realID}`,
        10000,
      );

      if (res[1] === 'done') {
        const res2 = await client.blpop(
          `worker_job_status_${job.data.realID}`,
          10000,
        );

        // await job.moveToCompleted('toto', true, true);

        return { realID: job.data.realID, output: res2[1] };
      }
    }
  }
}
