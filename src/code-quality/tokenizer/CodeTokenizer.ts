import { CodeTokens } from './CodeTokens';
import { PythonIdentifiers } from './identifiers/PythonIdentifiers';
import { CommonLangIdentifiers } from './identifiers/CommonLangIdentifiers';
import { GolangIdentifiers } from './identifiers/GolangIdentifiers';

export class CodeTokenizer {
  private pyIdentifiers = new PythonIdentifiers();

  private golangIdentifiers = new GolangIdentifiers();

  public tokenize(code: string, language: string): CodeTokens[] {
    switch (language) {
      case 'python':
        return this.tokenizeCode(code, this.pyIdentifiers);
      case 'go':
        return this.tokenizeCode(code, this.golangIdentifiers);
      default:
        return [];
    }
  }

  private tokenizeCode(
    code: string,
    languageIdentifier: CommonLangIdentifiers,
  ): CodeTokens[] {
    const lines = code.split('\n');
    let tokenizedCode: CodeTokens[] = [];

    lines.forEach((line) => {
      const trimedLine = line.trim();

      if (trimedLine !== '' && trimedLine !== '}')
        if (
          trimedLine.startsWith(languageIdentifier.functionIdentifier()) &&
          trimedLine.endsWith(languageIdentifier.endLoopAndCondIdentifier())
        ) {
          // Function detection
          tokenizedCode.push(CodeTokens.FUNC);
          const numberOfParams =
            CodeTokenizer.numberOfFunctionParameters(trimedLine);
          tokenizedCode = CodeTokenizer.pushTokensInTab(
            tokenizedCode,
            CodeTokens.FUNCPARAM,
            numberOfParams,
          );

          // For line
        } else if (
          trimedLine.startsWith(languageIdentifier.forIdentifier()) &&
          trimedLine.endsWith(languageIdentifier.endLoopAndCondIdentifier())
        ) {
          tokenizedCode.push(CodeTokens.FOR);
          // While line
        } else if (
          trimedLine.startsWith(languageIdentifier.whileIdentifier()) &&
          trimedLine.endsWith(languageIdentifier.endLoopAndCondIdentifier())
        ) {
          tokenizedCode.push(CodeTokens.WHILE);
          // If line
        } else if (
          trimedLine.startsWith(languageIdentifier.ifIdentifier()) &&
          trimedLine.endsWith(languageIdentifier.endLoopAndCondIdentifier())
        ) {
          tokenizedCode.push(CodeTokens.IF);
          const andOccurrences = CodeTokenizer.numberTokenPresentInLine(
            languageIdentifier.andIdentifier(),
            trimedLine,
          );
          tokenizedCode = CodeTokenizer.pushTokensInTab(
            tokenizedCode,
            CodeTokens.AND,
            andOccurrences,
          );

          const orOccurrences = CodeTokenizer.numberTokenPresentInLine(
            languageIdentifier.orIdentifier(),
            trimedLine,
          );
          tokenizedCode = CodeTokenizer.pushTokensInTab(
            tokenizedCode,
            CodeTokens.OR,
            orOccurrences,
          );

          // Case line
        } else if (
          trimedLine.startsWith(languageIdentifier.caseIdentifier()) &&
          trimedLine.endsWith(':')
        ) {
          tokenizedCode.push(CodeTokens.CASE);
          // Other lines
        } else {
          tokenizedCode.push(CodeTokens.LINE);
        }

      console.log(trimedLine);
    });

    console.log(tokenizedCode);

    return tokenizedCode;
  }

  private static numberOfFunctionParameters(line: string): number {
    const attributes = line.substring(line.indexOf('('), line.indexOf(')'));
    const attribNb = this.numberTokenPresentInLine(',', attributes);
    return attribNb === 0 ? 0 : attribNb + 1;
  }

  private static numberTokenPresentInLine(token: string, line: string): number {
    return line.split(token).length - 1;
  }

  private static pushTokensInTab(
    tab: CodeTokens[],
    token: CodeTokens,
    occurrences: number,
  ): CodeTokens[] {
    for (let i = 0; i < occurrences; i += 1) {
      tab.push(token);
    }
    return tab;
  }
}
