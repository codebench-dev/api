import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { AuthUserDTO } from './auth/dto/auth-user.dto';
import { LoggedInTokenResponse } from './auth/dto/logged-in-token-response.dto';
import { UnauthorizedResponse } from './auth/dto/unothorized-response.dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate and get token' })
  @ApiCreatedResponse({
    type: LoggedInTokenResponse,
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: 'Invalid username or password',
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() authUserDTO: AuthUserDTO): { access_token: string } {
    return this.authService.login(new User(authUserDTO));
  }
}
