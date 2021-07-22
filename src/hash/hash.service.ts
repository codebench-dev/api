import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hashCode(source: string): Promise<string> {
    return bcrypt.hash(source, 8);
  }
}
