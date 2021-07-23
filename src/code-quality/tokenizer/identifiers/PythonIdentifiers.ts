import { CommonLangIdentifiers } from './CommonLangIdentifiers';

export class PythonIdentifiers extends CommonLangIdentifiers {
  functionIdentifier(): string {
    return 'def';
  }

  caseIdentifier(): string {
    return '';
  }

  endLoopAndCondIdentifier(): string {
    return ':';
  }
}
