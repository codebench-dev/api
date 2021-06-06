import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ValidatedJWTReq } from 'src/auth/dto/validated-jwt-req';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSubmissionDTO } from './dto/create-submission-dto';
import { FindSubmissionDTO } from './dto/find-submission.dto';
import { Submission } from './submission.entity';
import { SubmissionsService } from './submissions.service';
import { FindLastSubmissionByLanguageDTO } from './dto/find-last-submission-by-language.dto';

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly amqpConnection: AmqpConnection,
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

    // Send job to worker
    await this.amqpConnection.publish('jobs_ex', 'jobs_rk', {
      id: submission.id,
      code: createSubmissionDTO.code,
      variant: createSubmissionDTO.language,
    });

    return submission;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async findLastForUserByLanguage(
    @Request() req: ValidatedJWTReq,
    @Body() findLastSubmissionByLanguageDTO: FindLastSubmissionByLanguageDTO,
  ): Promise<Submission> {
    console.log(findLastSubmissionByLanguageDTO.language);
    console.log(findLastSubmissionByLanguageDTO.benchmarkId);
    const submission: Submission | undefined =
      await this.submissionsService.findLastByLanguage(
        findLastSubmissionByLanguageDTO,
        req.user,
      );

    if (!submission) {
      throw NotFoundException;
    }

    return submission;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param() findSubmissionDTO: FindSubmissionDTO,
  ): Promise<Submission> {
    // Since this endpoint is used for polling, the service will fetch from cache first and fallback to DB
    const submission = await this.submissionsService.findOne(findSubmissionDTO);

    if (!submission) {
      throw NotFoundException;
    }

    return submission;
  }
}
