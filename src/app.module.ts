import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import ormconfig from './ormconfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(ormconfig)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
