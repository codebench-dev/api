/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedUserDTO } from './dto/authenticated-user.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private usersService: UsersService) {
    super();
  }

  // Get username from JWT payload and inject full user from repository
  // req.user of type User will be accessible anywhere the guard is called
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleRequest(err: any, user: AuthenticatedUserDTO): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const userfull = (async (): Promise<User> => {
      const authUser = await this.usersService.findOne(user);
      if (!authUser) {
        throw new UnauthorizedException();
      }
      return authUser;
    })();

    return userfull;
  }
}
