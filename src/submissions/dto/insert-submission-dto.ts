import { User } from 'src/users/user.entity';

export class InsertSubmissionDTO {
  benchmarkId: string;

  language: string;

  code: string;

  user: User;
}
