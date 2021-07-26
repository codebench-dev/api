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
import { LintResultDTO } from 'src/lint/dto/lint-result.dto';
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
    let lintScore: LintResultDTO;
    let qualityScore = { score: 100 };
    switch (createSubmissionDTO.language) {
      case 'python':
        qualityScore = this.qualityService.run(createSubmissionDTO.code, 'py');
        lintScore = this.lintService.lintPython3(createSubmissionDTO.code);
        break;
      case 'cpp':
        qualityScore = this.qualityService.run(createSubmissionDTO.code, 'cpp');
        lintScore = this.lintService.lintCpp(createSubmissionDTO.code);
        break;
      case 'go':
        qualityScore = this.qualityService.run(createSubmissionDTO.code, 'go');
        lintScore = this.lintService.lintGolang(createSubmissionDTO.code);
        break;
      default:
        lintScore = { score: 0, errors: [] };
        qualityScore = { score: 0 };
    }

    const submission = await this.submissionsService.create(
      {
        ...createSubmissionDTO,
        user: req.user,
        lintErrors: lintScore.errors,
      },
      lintScore.score,
      qualityScore.score,
    );

    // Send job to worker
    await this.amqpConnection.publish('jobs_ex', 'jobs_rk', {
      id: submission.id,
      code: createSubmissionDTO.code,
      language: createSubmissionDTO.language,
    });

    return {
      submission,
      lint: lintScore,
      quality: qualityScore,
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
