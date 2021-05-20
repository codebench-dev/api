/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passportJwt from 'passport-jwt';
import { jwtConstants } from './constants';
import { AuthenticatedUserDTO } from './dto/authenticated-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(passportJwt.Strategy) {
  constructor() {
    super({
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: { sub: string; username: string }): AuthenticatedUserDTO {
    return { userId: payload.sub, username: payload.username };
  }
}
