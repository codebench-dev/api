import { Injectable } from '@nestjs/common';
import { QualityDTO } from './dto/quality.dto';
import { CPPQualityVisitor } from './languages/cpp/cpp.vistor';
import { PythonVisitor } from './languages/python/python.visitor';

@Injectable()
export class CodeQualityService {
  public run(source: string, language: string): QualityDTO {
    const cppVisitor = new CPPQualityVisitor();
    const pyVisitor = new PythonVisitor();
    const ret = {
      score: 100,
    };

    switch (language) {
      case 'cpp':
        return cppVisitor.run(source);
      case 'py':
        return pyVisitor.run(source);
      default:
        return ret;
    }
  }
}
