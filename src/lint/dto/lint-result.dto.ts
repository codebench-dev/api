import { LintErrorDTO } from './lint-error.dto';

export class LintResultDTO {
  score: number;

  errors: LintErrorDTO[];
}
