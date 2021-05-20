import * as passportJwt from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
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
