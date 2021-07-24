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

  elseIdentifier(): string {
    return 'else';
  }

  elseIfIdentifier(): string {
    return 'else if';
  }

  isFunction(line: string): boolean {
    return (
      line.startsWith(this.functionIdentifier()) &&
      line.endsWith(this.endLoopAndCondIdentifier())
    );
  }

  isIfBlock(line: string): boolean {
    return (
      line.startsWith(this.ifIdentifier()) &&
      line.endsWith(this.endLoopAndCondIdentifier())
    );
  }

  isElseBlock(line: string): boolean {
    return (
      line.startsWith(this.elseIdentifier()) &&
      line.endsWith(this.endLoopAndCondIdentifier())
    );
  }
}
