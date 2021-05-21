import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { AuthUserDTO } from './auth/dto/auth-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body() authUserDTO: AuthUserDTO): { access_token: string } {
    return this.authService.login(authUserDTO);
  }
}
