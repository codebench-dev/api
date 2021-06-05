import { Injectable } from '@nestjs/common';
import { QualityDTO } from './dto/quality.dto';
import { CPPQualityVisitor } from './languages/cpp/cpp.vistor';

@Injectable()
export class CodeQualityService {
  public run(source: string): QualityDTO {
    // TODO: switch on language

    const visitor = new CPPQualityVisitor();
    return visitor.run(source);
  }
}
