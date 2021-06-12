import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
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
import { ValidatedJWTReq } from 'src/auth/dto/validated-jwt-req';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CodeQualityService } from 'src/code-quality/code-quality.service';
import { LintService } from 'src/lint/lint.service';
import { CreateSubmissionDTO } from './dto/create-submission-dto';
import { FindSubmissionDTO } from './dto/find-submission.dto';
import { SubmissionResultDTO } from './dto/submission-result.dto';
import { Submission } from './submission.entity';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly amqpConnection: AmqpConnection,
    private qualityService: CodeQualityService,
    private lintService: LintService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req: ValidatedJWTReq,
    @Body() createSubmissionDTO: CreateSubmissionDTO,
  ): Promise<SubmissionResultDTO> {
    const submission = await this.submissionsService.create({
      ...createSubmissionDTO,
      user: req.user,
    });

    // Send job to worker
    await this.amqpConnection.publish('jobs_ex', 'jobs_rk', {
      id: submission.id,
      code: createSubmissionDTO.code,
      language: createSubmissionDTO.language,
    });

    return {
      submission,
      lint:
        createSubmissionDTO.language === 'cpython3' // TODO: handle more languages
          ? this.lintService.lintPython3(createSubmissionDTO.code)
          : {},
      quality:
        createSubmissionDTO.language === 'cpp' // TODO: handle more languages
          ? this.qualityService.run(createSubmissionDTO.code)
          : { score: 100 },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param() findSubmissionDTO: FindSubmissionDTO,
  ): Promise<Submission> {
    // Since this endpoint is used for polling, the service will fetch from cache first and fallback to DB
    const submission = await this.submissionsService.findOne(findSubmissionDTO);

    if (!submission) {
      throw new NotFoundException();
    }

    return submission;
  }
}
