import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindSubmissionIDDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
}
