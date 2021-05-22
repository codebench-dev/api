import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signupUser(
    @Body()
    user: CreateUserDTO,
  ): Promise<User> {
    if (await this.usersService.isEmailTaken(user.email)) {
      throw new ConflictException('This email is already taken');
    }

    if (await this.usersService.isUsernameTaken(user.username)) {
      throw new ConflictException('This username is already taken');
    }

    return this.usersService.create(user);
  }
}
