import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SubmissionsConsumer } from './submission.consumer';
import { Submission } from './submission.entity';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    forwardRef(() => UsersModule),
    BullModule.registerQueue({
      name: 'submissions',
    }),
  ],
  providers: [SubmissionsService, SubmissionsConsumer],
  controllers: [SubmissionsController],
})
export class SubmissionsModule {}
