import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { QualityDTO } from 'src/code-quality/dto/quality.dto';
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

    if (funcName.length > 20) {
      this.codeQuality.score -= 1;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected defaultResult(): void {}
}
