import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BenchmarkIdDto {
  @IsUUID('all')
  @ApiProperty()
  id: string;
}
