import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async isEmailTaken(email: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({ email });
    if (existingUser) {
      return true;
    }
    return false;
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const existingUser = await this.usersRepository.findOne({ username });
    if (existingUser) {
      return true;
    }
    return false;
  }

  async create(userData: CreateUserDTO): Promise<User> {
    const user = new User(userData);
    return user.save();
    // return this.usersRepository.save(userData);
  }

  async findOne(user: FindUserDTO): Promise<User | undefined> {
    return this.usersRepository.findOne({ username: user.username });
  }
}
