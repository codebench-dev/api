import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindUserDTO {
  @ApiProperty()
  @IsString()
  username: string;
}
