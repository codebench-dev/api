import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { Benchmark } from './benchmark.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BenchmarkService {
  constructor(
    @InjectRepository(Benchmark)
    private benchmarkRepository: Repository<Benchmark>,
  ) {

  }

  async create(benchmarkData: CreateBenchmarkDto, user: User): Promise<Benchmark> {
    const benchmark = new Benchmark(benchmarkData);
    benchmark.creator = user;
    return benchmark.save();
  }

  async getAll() : Promise<Benchmark[]> {
    return this.benchmarkRepository.find({});
  }
}
