import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Benchmark } from './benchmark.entity';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';

@Injectable()
export class BenchmarkService {
  constructor(
    @InjectRepository(Benchmark)
    private benchmarkRepository: Repository<Benchmark>,
  ) {}

  async create(
    benchmarkData: CreateBenchmarkDto,
    user: User,
  ): Promise<Benchmark> {
    const benchmark = new Benchmark(benchmarkData);
    benchmark.creator = user;
    return benchmark.save();
  }

  async getAll(): Promise<Benchmark[]> {
    return this.benchmarkRepository.find({});
  }

  async findBy(params: FindManyOptions<Benchmark>): Promise<Benchmark[]> {
    return this.benchmarkRepository.find(params);
  }

  async findOne(id: string): Promise<Benchmark | undefined> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid benchmark id: ${id}`);
    }
    const benchmark = await this.benchmarkRepository.findOne(id);

    if (!benchmark) {
      throw new BadRequestException(`Could not find benchmark: ${id}`);
    }

    return benchmark;
  }
}
