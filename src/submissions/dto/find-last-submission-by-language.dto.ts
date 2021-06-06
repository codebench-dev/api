import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindLastSubmissionByLanguageDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  benchmarkId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language: string;
}
