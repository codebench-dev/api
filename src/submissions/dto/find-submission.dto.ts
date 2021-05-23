import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindSubmissionDTO {
  @IsUUID('all')
  @ApiProperty()
  id: string;
}
