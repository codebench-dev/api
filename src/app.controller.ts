import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User as UserModel, Prisma } from '@prisma/client';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthUserDTO } from './auth/dto/auth-user.dto';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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
