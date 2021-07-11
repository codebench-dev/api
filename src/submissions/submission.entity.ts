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
import { Benchmark } from '../benchmarks/benchmark.entity';

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
  @ApiProperty()
  @Column()
  status: string;

  @jsonMember
  @ApiProperty()
  @Column({ nullable: true })
  stdout: string;

  @jsonMember
  @ApiProperty()
  @Column({ nullable: true })
  stderr: string;

  @jsonMember
  @ApiProperty()
  @Column({ nullable: true })
  message: string;

  @jsonMember
  @ApiProperty()
  @Column({ nullable: true })
  error: string;

  @jsonMember
  @ApiProperty()
  @Column({ default: 0 })
  execDuration: number;

  @jsonMember
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @jsonMember
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @jsonMember
  @Column({ nullable: true })
  lintScore: number;

  @jsonMember
  @Column({ nullable: true })
  qualityScore: number;

  @ManyToOne(() => User, (user) => user.submissions, {
    nullable: false,
    eager: true,
  })
  @ApiProperty({ type: () => User })
  @jsonMember(() => User)
  user: User;

  @ManyToOne(() => Benchmark, (benchmark) => benchmark.submissions, {
    nullable: false,
    eager: true,
  })
  @ApiProperty({ type: () => Benchmark })
  benchmark: Benchmark;
}
