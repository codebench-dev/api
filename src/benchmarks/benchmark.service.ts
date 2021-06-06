import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { Benchmark } from './benchmark.entity';
import { User } from '../users/user.entity';

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
