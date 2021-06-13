import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { QualityDTO } from 'src/code-quality/dto/quality.dto';
import { isUppercase } from 'class-validator';
import { CPP14Lexer } from './generated/CPP14Lexer';
import {
  CPP14Parser,
  FunctionDefinitionContext,
} from './generated/CPP14Parser';
import { CPP14ParserVisitor } from './generated/CPP14ParserVisitor';

export class CPPQualityVisitor
  extends AbstractParseTreeVisitor<void>
  implements CPP14ParserVisitor<void>
{
  private codeQuality: QualityDTO;

  run(source: string): QualityDTO {
    const inputStream = CharStreams.fromString(source);
    const lexer = new CPP14Lexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new CPP14Parser(tokenStream);

    this.codeQuality = {
      score: 100,
    };

    const context = parser.functionDefinition();
    this.visit(context);

    return this.codeQuality;
  }

  visitFunctionDefinition(context: FunctionDefinitionContext): void {
    const funcName = context.declarator().text;
    const funcBody = context.functionBody().text;

    this.functionNameQualityRule(funcName);
    this.functionBodyQualityRule(funcBody);
  }

  private functionNameQualityRule(functionName: string): void {
    // If function name is not written is snake case => quality -3
    if (!this.isSnakeCase(functionName)) {
      this.codeQuality.score -= 3;
    }

    // If function name name is greater than 25 character => quality -1
    if (functionName.length > 25) {
      this.codeQuality.score -= 1;
    }
  }

  private functionBodyQualityRule(functionBody: string): void {
    const lines = functionBody.split(';');

    // If there is more than 30 lines => quality -5
    if (lines.length > 30) {
      this.codeQuality.score -= 5;
    }

    // If there more than 80 characters in the line => quality -1
    this.codeQuality.score -= lines.filter((line) =>
      this.isLineTooLong(line),
    ).length;
  }

  private isSnakeCase(text: string): boolean {
    // Function name without ()
    const functionName = text.substring(0, text.length - 2);
    for (let i = 0; i < functionName.length; i += 1) {
      if (isUppercase(functionName[i]) && functionName[i] !== '_') {
        return false;
      }
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private isCamelCase(text: string): boolean {
    const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;
    return camelCaseRegex.test(text);
  }

  private isLineTooLong(line: string): boolean {
    return line.length > 80;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected defaultResult(): void {}
}
