import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindSubmissionDTO } from './dto/find-submission.dto';
import { InsertSubmissionDTO } from './dto/insert-submission-dto';
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
}
