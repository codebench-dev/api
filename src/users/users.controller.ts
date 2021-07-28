import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Benchmark } from 'src/benchmarks/benchmark.entity';
import { BenchmarkService } from 'src/benchmarks/benchmark.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly benchmarkService: BenchmarkService,
  ) {}

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

  @ApiOperation({ summary: 'Get a user' })
  @ApiParam({ name: 'username', type: FindUserDTO })
  @ApiOkResponse({ type: User, description: 'User object' })
  // @ApiBadRequestResponse({
  //   type: BadRequestResponse,
  //   description: 'Invalid input',
  // })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param() userReq: { username: string }): Promise<User> {
    const user: User | undefined = await this.usersService.findOne(userReq);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @ApiOperation({ summary: 'Get benchmarks for user' })
  @ApiOkResponse({ type: [Benchmark], description: 'Array of benchmarks' })
  @Get(':username/benchmarks')
  async getBenchmarkForUser(
    @Param() userReq: { username: string },
  ): Promise<Benchmark[]> {
    const user = await this.usersService.findOne(userReq);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.benchmarkService.findBy({ where: { creator: user } });
  }
}
