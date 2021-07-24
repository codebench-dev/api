export class CommonLangIdentifiers {
  functionIdentifier(): string {
    return '';
  }

  forIdentifier(): string {
    return 'for';
  }

  whileIdentifier(): string {
    return 'while';
  }

  ifIdentifier(): string {
    return 'if';
  }

  caseIdentifier(): string {
    return 'case';
  }

  orIdentifier(): string {
    return '||';
  }

  andIdentifier(): string {
    return '&&';
  }

  endLoopAndCondIdentifier(): string {
    return '{';
  }

  commentIdentifier(): string {
    return '//';
  }

  isFunction(line: string): boolean {
    return (
      line.startsWith(this.functionIdentifier()) &&
      line.endsWith(this.endLoopAndCondIdentifier())
    );
  }
}
