import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  public async hashCode(source: string): Promise<string> {
    return bcrypt.hash(source, 8);
  }

  public async compareSourceToHash(
    source: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(source, hash);
  }
}
