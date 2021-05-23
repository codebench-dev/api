/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('submissions')
export class Submission extends BaseEntity {
  constructor(partial: Partial<Submission>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  language: string;

  @ApiProperty()
  @Column()
  code: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  output: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.submissions, {
    nullable: false,
    eager: true,
  })
  @ApiProperty({ type: () => User })
  user: User;
}
