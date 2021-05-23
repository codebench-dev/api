import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Queue } from 'bull';
import { ValidatedJWTReq } from 'src/auth/dto/validated-jwt-req';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSubmissionDTO } from './dto/create-submission-dto';
import { FindSubmissionDTO } from './dto/find-submission.dto';
import { Submission } from './submission.entity';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    @InjectQueue('submissions') private readonly jobQ: Queue,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: ValidatedJWTReq,
    @Body() createSubmissionDTO: CreateSubmissionDTO,
  ): Promise<Submission> {
    const submission = await this.submissionsService.create({
      ...createSubmissionDTO,
      user: req.user,
    });
    await this.jobQ.add({
      realID: submission.id,
      code: createSubmissionDTO.code,
      language: createSubmissionDTO.language,
    });

    return submission;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Request() req: ValidatedJWTReq,
    @Param() findSubmissionDTO: FindSubmissionDTO,
  ): Promise<Submission> {
    const submission: Submission | undefined =
      await this.submissionsService.findOne(findSubmissionDTO);

    if (!submission) {
      throw NotFoundException;
    }

    return submission;
  }
}
