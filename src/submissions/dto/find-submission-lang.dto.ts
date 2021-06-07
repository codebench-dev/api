import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindSubmissionLangDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language: string;
}
