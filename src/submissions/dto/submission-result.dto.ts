import { QualityDTO } from 'src/code-quality/dto/quality.dto';
import { Submission } from '../submission.entity';

export class SubmissionResultDTO {
  submission: Submission;

  lint: { score: number };

  quality: QualityDTO;
}
