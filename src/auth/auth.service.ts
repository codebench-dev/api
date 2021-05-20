import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User as UserModel } from '@prisma/client';
import { AuthUserDTO } from './dto/auth-user.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UserDTO } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<UserModel | undefined> {
    const user = await this.usersService.findOne({ username });
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      return user;
    }
    return undefined;
  }

  login(user: AuthUserDTO): { access_token: string } {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, plainPassword);
  }
}
