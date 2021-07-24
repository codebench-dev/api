import { CodeTokens } from '../tokenizer/CodeTokens';

/**
 * The cyclomatic complexity number reflect the number of decisions in an algorithm.
 */
export class CyclomaticComplexity {
  /**
   * The cyclomatic complexity of a function is calculated according to the following rules:
   *    -1 is the base complexity of a function
   *    +1 for each 'if', 'for', 'case', '&&' or '||'
   * @param tokenizedCode
   * @return cyclomaticComplexity
   */
  public compute(tokenizedCode: CodeTokens[]): number {
    let cyclomaticComplexity = -1;

    tokenizedCode.forEach((token) => {
      switch (token) {
        case CodeTokens.FOR:
          cyclomaticComplexity += 1;
          break;
        case CodeTokens.WHILE:
          cyclomaticComplexity += 1;
          break;
        case CodeTokens.IF:
          cyclomaticComplexity += 1;
          break;
        case CodeTokens.CASE:
          cyclomaticComplexity += 1;
          break;
        case CodeTokens.AND:
          cyclomaticComplexity += 1;
          break;
        case CodeTokens.OR:
          cyclomaticComplexity += 1;
          break;
        default:
          break;
      }
    });

    return cyclomaticComplexity;
  }
}
