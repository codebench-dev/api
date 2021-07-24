import { CommonLangIdentifiers } from './CommonLangIdentifiers';

export class CppIdentifiers extends CommonLangIdentifiers {
  isFunction(line: string): boolean {
    return (
      (line.startsWith('void') ||
        line.startsWith('char') ||
        line.startsWith('int') ||
        line.startsWith('float') ||
        line.startsWith('double')) &&
      line.endsWith('{')
    );
  }
}
