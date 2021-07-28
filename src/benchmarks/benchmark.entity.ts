/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Submission } from '../submissions/submission.entity';

@Entity('benchmarks')
export class Benchmark extends BaseEntity {
  constructor(partial: Partial<Benchmark>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  subject: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  gitUrl?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  difficulty: string;

  @OneToMany((type) => Submission, (submission) => submission.benchmark)
  submissions: Submission[];

  @ManyToOne((type) => User, (user) => user.benchmarks, { eager: true })
  @ApiProperty({ type: () => User })
  creator: User;

  @ApiProperty()
  @Column({ default: 10 })
  maxCyclomaticComplexity: number;
}
