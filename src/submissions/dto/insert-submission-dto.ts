import { LintErrorDTO } from 'src/lint/dto/lint-error.dto';
import { User } from 'src/users/user.entity';

export class InsertSubmissionDTO {
  benchmarkId: string;

  language: string;

  code: string;

  user: User;

  lintErrors?: LintErrorDTO[];
}
