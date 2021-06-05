import * as t from 'io-ts';
import { QualityDTO } from 'src/code-quality/dto/quality.dto';
import { PylintOutputT } from 'src/lint/lint.service';
import { Submission } from '../submission.entity';

export class SubmissionResultDTO {
  submission: Submission;

  lint: t.Validation<PylintOutputT> | unknown;

  quality: QualityDTO;
}
