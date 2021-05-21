import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Post()
  async signupUser(
    @Body()
    userData: CreateUserDTO,
  ): Promise<UserModel> {
    try {
      const res = await this.userServices.create({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      return res;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${userData.email} already used.`);
      } else {
        throw new Error(e);
      }
    }
  }
}
