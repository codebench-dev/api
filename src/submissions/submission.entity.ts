/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { jsonMember, jsonObject } from 'typedjson';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@jsonObject
@Entity('submissions')
export class Submission extends BaseEntity {
  constructor(partial: Partial<Submission>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @jsonMember
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @jsonMember
  @Column()
  language: string;

  @ApiProperty()
  @jsonMember
  @Column()
  code: string;

  @jsonMember
  @Column()
  status: string;

  @jsonMember
  @Column({ nullable: true })
  output: string;

  @jsonMember
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @jsonMember
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.submissions, {
    nullable: false,
    eager: true,
  })
  @ApiProperty({ type: () => User })
  @jsonMember(() => User)
  user: User;
}
