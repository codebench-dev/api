import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userData: CreateUserDTO): Promise<UserModel> {
    const password = await argon2.hash(userData.password);

    return this.prismaService.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: password,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        profilepicurl: true,
      },
    });
  }

  async findOne(user: FindUserDTO): Promise<UserModel | undefined> {
    return this.prismaService.user.findUnique({
      where: { username: user.username },
    });
  }
}
