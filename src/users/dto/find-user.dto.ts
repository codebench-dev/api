import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDTO {
  @ApiProperty()
  @IsString()
  username: string;
}
export default FindUserDTO;
