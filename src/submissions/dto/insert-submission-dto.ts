import { User } from 'src/users/user.entity';

export class InsertSubmissionDTO {
  language: string;

  code: string;

  user: User;
}
