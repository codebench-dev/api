/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

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

  @ManyToOne((type) => User, (user) => user.benchmarks, {eager: true})
  @ApiProperty({type: () => User})
  creator: User;

}