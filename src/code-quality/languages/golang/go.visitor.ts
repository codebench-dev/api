import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { GoParserVisitor } from './generated/GoParserVisitor';
import { QualityDTO } from '../../dto/quality.dto';
import { CommonQualityFunction } from '../common/CommonQualityFunction';

export class GoQualityVisitor
  extends AbstractParseTreeVisitor<void>
  implements GoParserVisitor<void>
{
  private codeQuality: QualityDTO;

  run(source: string): QualityDTO {
    this.codeQuality = {
      score: 100,
    };

    const lines = source.split('\n');

    this.qualityEvalFunctionName(lines);

    this.qualityEvalFunctionBody(lines);

    return this.codeQuality;
  }

  /**
   * Applying quality rules on function name
   * @param lines
   * @private
   */
  private qualityEvalFunctionName(lines: string[]): void {
    // Applying rules on function name
    lines
      .filter((line) => line.startsWith('func'))
      .map((line) => line.substring(5, line.indexOf('(')).trim())
      // If function name name is greater than 25 character => quality -1
      .map((functionName) => {
        if (functionName.length > 25) {
          this.codeQuality.score -= 1;
        }
        return functionName;
      })
      // If function name is not written is snake case => quality -3
      .map((functionName) => {
        if (!CommonQualityFunction.isSnakeCase(functionName)) {
          this.codeQuality.score -= 3;
        }
        return functionName;
      });
  }

  /**
   * Applying quality rules on function body
   * @param lines
   * @private
   */
  private qualityEvalFunctionBody(lines: string[]): void {
    let counter = 0;
    let isInFunction = false;
    lines.forEach((line) => {
      if (line.startsWith('func') && line.endsWith('{')) {
        isInFunction = true;
      } else if (isInFunction) {
        counter += 1;
      }
      if (line.trim().endsWith('}')) {
        if (counter > 30) {
          this.codeQuality.score -= 5;
        }
        isInFunction = false;
        counter = 0;
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected defaultResult(): void {}
}
