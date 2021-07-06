import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { GoParserVisitor } from './generated/GoParserVisitor';
import { QualityDTO } from '../../dto/quality.dto';
import { GoLexer } from './generated/GoLexer';
import { FunctionDeclContext, GoParser } from './generated/GoParser';

export class GoQualityVistor
  extends AbstractParseTreeVisitor<void>
  implements GoParserVisitor<void>
{
  private codeQuality: QualityDTO;

  run(source: string): QualityDTO {
    const inputStream = CharStreams.fromString(source);
    const lexer = new GoLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new GoParser(tokenStream);

    this.codeQuality = {
      score: 100,
    };

    const context = parser.functionDecl();
    this.visit(context);

    return this.codeQuality;
  }

  visitFunctionDecl(context: FunctionDeclContext): void {
    context.IDENTIFIER();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected defaultResult(): void {}
}
