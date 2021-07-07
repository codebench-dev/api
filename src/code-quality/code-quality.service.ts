import { Injectable } from '@nestjs/common';
import { QualityDTO } from './dto/quality.dto';
import { CPPQualityVisitor } from './languages/cpp/cpp.vistor';
import { PythonVisitor } from './languages/python/python.visitor';
import { GoQualityVisitor } from './languages/golang/go.visitor';

@Injectable()
export class CodeQualityService {
  public run(source: string, language: string): QualityDTO {
    const cppVisitor = new CPPQualityVisitor();
    const pyVisitor = new PythonVisitor();
    const goVisitor = new GoQualityVisitor();

    const ret = {
      score: 100,
    };

    switch (language) {
      case 'cpp':
        return cppVisitor.run(source);
      case 'py':
        return pyVisitor.run(source);
      case 'go':
        return goVisitor.run(source);
      default:
        return ret;
    }
  }
}
