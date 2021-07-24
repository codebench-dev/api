import { CodeTokens } from './CodeTokens';
import { PythonIdentifiers } from './identifiers/PythonIdentifiers';
import { CommonLangIdentifiers } from './identifiers/CommonLangIdentifiers';
import { GolangIdentifiers } from './identifiers/GolangIdentifiers';
import { CppIdentifiers } from './identifiers/CppIdentifiers';

export class CodeTokenizer {
  private pyIdentifiers = new PythonIdentifiers();

  private golangIdentifiers = new GolangIdentifiers();

  private cppIdentifiers = new CppIdentifiers();

  public tokenize(code: string, language: string): CodeTokens[] {
    switch (language) {
      case 'python':
        return this.tokenizeCode(code, this.pyIdentifiers);
      case 'go':
        return this.tokenizeCode(code, this.golangIdentifiers);
      case 'cpp':
        return this.tokenizeCode(code, this.cppIdentifiers);
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
      const trimmedLine = line.trim();

      if (trimmedLine !== '' && trimmedLine !== '}')
        if (languageIdentifier.isFunction(trimmedLine)) {
          // Function detection
          tokenizedCode.push(CodeTokens.FUNC);
          const numberOfParams =
            CodeTokenizer.numberOfFunctionParameters(trimmedLine);
          tokenizedCode = CodeTokenizer.pushTokensInTab(
            tokenizedCode,
            CodeTokens.FUNCPARAM,
            numberOfParams,
          );

          // For line
        } else if (
          trimmedLine.startsWith(languageIdentifier.forIdentifier()) &&
          trimmedLine.endsWith(languageIdentifier.endLoopAndCondIdentifier())
        ) {
          tokenizedCode.push(CodeTokens.FOR);
          // While line
        } else if (
          trimmedLine.startsWith(languageIdentifier.whileIdentifier()) &&
          trimmedLine.endsWith(languageIdentifier.endLoopAndCondIdentifier())
        ) {
          tokenizedCode.push(CodeTokens.WHILE);
          // If line
        } else if (languageIdentifier.isIfBlock(trimmedLine)) {
          tokenizedCode.push(CodeTokens.IF);
          tokenizedCode = CodeTokenizer.getAndOrTokens(
            trimmedLine,
            languageIdentifier,
            tokenizedCode,
          );

          // Else if line
        } else if (
          CodeTokenizer.numberTokenPresentInLine(
            languageIdentifier.elseIfIdentifier(),
            trimmedLine,
          ) > 0
        ) {
          tokenizedCode.push(CodeTokens.ELSEIF);
          tokenizedCode = CodeTokenizer.getAndOrTokens(
            trimmedLine,
            languageIdentifier,
            tokenizedCode,
          );

          // Else line
        } else if (
          CodeTokenizer.numberTokenPresentInLine(
            languageIdentifier.elseIdentifier(),
            trimmedLine,
          ) > 0
        ) {
          tokenizedCode.push(CodeTokens.ELSE);
          // Case line
        } else if (
          trimmedLine.startsWith(languageIdentifier.caseIdentifier()) &&
          trimmedLine.endsWith(':')
        ) {
          tokenizedCode.push(CodeTokens.CASE);

          // Comment line
        } else if (
          trimmedLine.startsWith(languageIdentifier.commentIdentifier())
        ) {
          tokenizedCode.push(CodeTokens.COMMENT);

          // Other lines
        } else {
          tokenizedCode.push(CodeTokens.LINE);
        }

      // console.log(trimmedLine);
    });

    // console.log(tokenizedCode);

    return tokenizedCode;
  }

  private static getAndOrTokens(
    line: string,
    languageIdentifier: CommonLangIdentifiers,
    tokens: CodeTokens[],
  ): CodeTokens[] {
    let tokenizedCode = tokens;
    const andOccurrences = CodeTokenizer.numberTokenPresentInLine(
      languageIdentifier.andIdentifier(),
      line,
    );
    tokenizedCode = CodeTokenizer.pushTokensInTab(
      tokenizedCode,
      CodeTokens.AND,
      andOccurrences,
    );

    const orOccurrences = CodeTokenizer.numberTokenPresentInLine(
      languageIdentifier.orIdentifier(),
      line,
    );
    tokenizedCode = CodeTokenizer.pushTokensInTab(
      tokenizedCode,
      CodeTokens.OR,
      orOccurrences,
    );

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
