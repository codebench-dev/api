import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
  public async hashCode(source: string): Promise<string> {
    return crypto.createHash('sha256').update(source).digest('base64');
  }

  public async compareSourceToHash(
    source: string,
    hash: string,
  ): Promise<boolean> {
    return (await this.hashCode(source)) === hash;
  }
}
