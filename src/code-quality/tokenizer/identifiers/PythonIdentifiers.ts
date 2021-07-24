import { CommonLangIdentifiers } from './CommonLangIdentifiers';

export class PythonIdentifiers extends CommonLangIdentifiers {
  functionIdentifier(): string {
    return 'def';
  }

  caseIdentifier(): string {
    return '';
  }

  commentIdentifier(): string {
    return '#';
  }

  endLoopAndCondIdentifier(): string {
    return ':';
  }
}
