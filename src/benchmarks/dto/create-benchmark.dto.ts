import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBenchmarkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  giturl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  difficulty: string;
}