import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBenchmarkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  giturl?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  difficulty: string;

  @IsNotEmpty()
  @IsNumberString()
  // @Transform(parseInt)
  // @IsInt()
  // @Min(1)
  // @Max(100)
  maxCyclomaticComplexity: number;
}
