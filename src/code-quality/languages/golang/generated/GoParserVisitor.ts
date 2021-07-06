import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { SourceFileContext } from './GoParser';
import { PackageClauseContext } from './GoParser';
import { ImportDeclContext } from './GoParser';
import { ImportSpecContext } from './GoParser';
import { ImportPathContext } from './GoParser';
import { DeclarationContext } from './GoParser';
import { ConstDeclContext } from './GoParser';
import { ConstSpecContext } from './GoParser';
import { IdentifierListContext } from './GoParser';
import { ExpressionListContext } from './GoParser';
import { TypeDeclContext } from './GoParser';
import { TypeSpecContext } from './GoParser';
import { FunctionDeclContext } from './GoParser';
import { MethodDeclContext } from './GoParser';
import { ReceiverContext } from './GoParser';
import { VarDeclContext } from './GoParser';
import { VarSpecContext } from './GoParser';
import { BlockContext } from './GoParser';
import { StatementListContext } from './GoParser';
import { StatementContext } from './GoParser';
import { SimpleStmtContext } from './GoParser';
import { ExpressionStmtContext } from './GoParser';
import { SendStmtContext } from './GoParser';
import { IncDecStmtContext } from './GoParser';
import { AssignmentContext } from './GoParser';
import { Assign_opContext } from './GoParser';
import { ShortVarDeclContext } from './GoParser';
import { EmptyStmtContext } from './GoParser';
import { LabeledStmtContext } from './GoParser';
import { ReturnStmtContext } from './GoParser';
import { BreakStmtContext } from './GoParser';
import { ContinueStmtContext } from './GoParser';
import { GotoStmtContext } from './GoParser';
import { FallthroughStmtContext } from './GoParser';
import { DeferStmtContext } from './GoParser';
import { IfStmtContext } from './GoParser';
import { SwitchStmtContext } from './GoParser';
import { ExprSwitchStmtContext } from './GoParser';
import { ExprCaseClauseContext } from './GoParser';
import { ExprSwitchCaseContext } from './GoParser';
import { TypeSwitchStmtContext } from './GoParser';
import { TypeSwitchGuardContext } from './GoParser';
import { TypeCaseClauseContext } from './GoParser';
import { TypeSwitchCaseContext } from './GoParser';
import { TypeListContext } from './GoParser';
import { SelectStmtContext } from './GoParser';
import { CommClauseContext } from './GoParser';
import { CommCaseContext } from './GoParser';
import { RecvStmtContext } from './GoParser';
import { ForStmtContext } from './GoParser';
import { ForClauseContext } from './GoParser';
import { RangeClauseContext } from './GoParser';
import { GoStmtContext } from './GoParser';
import { Type_Context } from './GoParser';
import { TypeNameContext } from './GoParser';
import { TypeLitContext } from './GoParser';
import { ArrayTypeContext } from './GoParser';
import { ArrayLengthContext } from './GoParser';
import { ElementTypeContext } from './GoParser';
import { PointerTypeContext } from './GoParser';
import { InterfaceTypeContext } from './GoParser';
import { SliceTypeContext } from './GoParser';
import { MapTypeContext } from './GoParser';
import { ChannelTypeContext } from './GoParser';
import { MethodSpecContext } from './GoParser';
import { FunctionTypeContext } from './GoParser';
import { SignatureContext } from './GoParser';
import { ResultContext } from './GoParser';
import { ParametersContext } from './GoParser';
import { ParameterDeclContext } from './GoParser';
import { ExpressionContext } from './GoParser';
import { PrimaryExprContext } from './GoParser';
import { UnaryExprContext } from './GoParser';
import { ConversionContext } from './GoParser';
import { OperandContext } from './GoParser';
import { LiteralContext } from './GoParser';
import { BasicLitContext } from './GoParser';
import { IntegerContext } from './GoParser';
import { OperandNameContext } from './GoParser';
import { QualifiedIdentContext } from './GoParser';
import { CompositeLitContext } from './GoParser';
import { LiteralTypeContext } from './GoParser';
import { LiteralValueContext } from './GoParser';
import { ElementListContext } from './GoParser';
import { KeyedElementContext } from './GoParser';
import { KeyContext } from './GoParser';
import { ElementContext } from './GoParser';
import { StructTypeContext } from './GoParser';
import { FieldDeclContext } from './GoParser';
import { String_Context } from './GoParser';
import { EmbeddedFieldContext } from './GoParser';
import { FunctionLitContext } from './GoParser';
import { IndexContext } from './GoParser';
import { Slice_Context } from './GoParser';
import { TypeAssertionContext } from './GoParser';
import { ArgumentsContext } from './GoParser';
import { MethodExprContext } from './GoParser';
import { ReceiverTypeContext } from './GoParser';
import { EosContext } from './GoParser';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `GoParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface GoParserVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `GoParser.sourceFile`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSourceFile?: (ctx: SourceFileContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.packageClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPackageClause?: (ctx: PackageClauseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.importDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitImportDecl?: (ctx: ImportDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.importSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitImportSpec?: (ctx: ImportSpecContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.importPath`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitImportPath?: (ctx: ImportPathContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.declaration`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDeclaration?: (ctx: DeclarationContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.constDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstDecl?: (ctx: ConstDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.constSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstSpec?: (ctx: ConstSpecContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.identifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierList?: (ctx: IdentifierListContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.expressionList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionList?: (ctx: ExpressionListContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeDecl?: (ctx: TypeDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeSpec?: (ctx: TypeSpecContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.functionDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionDecl?: (ctx: FunctionDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.methodDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodDecl?: (ctx: MethodDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.receiver`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReceiver?: (ctx: ReceiverContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.varDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVarDecl?: (ctx: VarDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.varSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVarSpec?: (ctx: VarSpecContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.block`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBlock?: (ctx: BlockContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.statementList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatementList?: (ctx: StatementListContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatement?: (ctx: StatementContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.simpleStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSimpleStmt?: (ctx: SimpleStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.expressionStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionStmt?: (ctx: ExpressionStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.sendStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSendStmt?: (ctx: SendStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.incDecStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIncDecStmt?: (ctx: IncDecStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment?: (ctx: AssignmentContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.assign_op`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssign_op?: (ctx: Assign_opContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.shortVarDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShortVarDecl?: (ctx: ShortVarDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.emptyStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEmptyStmt?: (ctx: EmptyStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.labeledStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLabeledStmt?: (ctx: LabeledStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.returnStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReturnStmt?: (ctx: ReturnStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.breakStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBreakStmt?: (ctx: BreakStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.continueStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitContinueStmt?: (ctx: ContinueStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.gotoStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGotoStmt?: (ctx: GotoStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.fallthroughStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFallthroughStmt?: (ctx: FallthroughStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.deferStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDeferStmt?: (ctx: DeferStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.ifStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIfStmt?: (ctx: IfStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.switchStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSwitchStmt?: (ctx: SwitchStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.exprSwitchStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprSwitchStmt?: (ctx: ExprSwitchStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.exprCaseClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprCaseClause?: (ctx: ExprCaseClauseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.exprSwitchCase`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprSwitchCase?: (ctx: ExprSwitchCaseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeSwitchStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeSwitchStmt?: (ctx: TypeSwitchStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeSwitchGuard`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeSwitchGuard?: (ctx: TypeSwitchGuardContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeCaseClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeCaseClause?: (ctx: TypeCaseClauseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeSwitchCase`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeSwitchCase?: (ctx: TypeSwitchCaseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeList?: (ctx: TypeListContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.selectStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSelectStmt?: (ctx: SelectStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.commClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommClause?: (ctx: CommClauseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.commCase`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommCase?: (ctx: CommCaseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.recvStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRecvStmt?: (ctx: RecvStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.forStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForStmt?: (ctx: ForStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.forClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForClause?: (ctx: ForClauseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.rangeClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRangeClause?: (ctx: RangeClauseContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.goStmt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGoStmt?: (ctx: GoStmtContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.type_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType_?: (ctx: Type_Context) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeName?: (ctx: TypeNameContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeLit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeLit?: (ctx: TypeLitContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.arrayType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArrayType?: (ctx: ArrayTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.arrayLength`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArrayLength?: (ctx: ArrayLengthContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.elementType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElementType?: (ctx: ElementTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.pointerType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPointerType?: (ctx: PointerTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.interfaceType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInterfaceType?: (ctx: InterfaceTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.sliceType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSliceType?: (ctx: SliceTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.mapType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMapType?: (ctx: MapTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.channelType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChannelType?: (ctx: ChannelTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.methodSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodSpec?: (ctx: MethodSpecContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.functionType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionType?: (ctx: FunctionTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.signature`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSignature?: (ctx: SignatureContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.result`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitResult?: (ctx: ResultContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.parameters`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameters?: (ctx: ParametersContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.parameterDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParameterDecl?: (ctx: ParameterDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.primaryExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimaryExpr?: (ctx: PrimaryExprContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.unaryExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnaryExpr?: (ctx: UnaryExprContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.conversion`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConversion?: (ctx: ConversionContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.operand`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOperand?: (ctx: OperandContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.literal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLiteral?: (ctx: LiteralContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.basicLit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBasicLit?: (ctx: BasicLitContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.integer`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInteger?: (ctx: IntegerContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.operandName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOperandName?: (ctx: OperandNameContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.qualifiedIdent`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQualifiedIdent?: (ctx: QualifiedIdentContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.compositeLit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCompositeLit?: (ctx: CompositeLitContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.literalType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLiteralType?: (ctx: LiteralTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.literalValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLiteralValue?: (ctx: LiteralValueContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.elementList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElementList?: (ctx: ElementListContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.keyedElement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitKeyedElement?: (ctx: KeyedElementContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.key`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitKey?: (ctx: KeyContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.element`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElement?: (ctx: ElementContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.structType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStructType?: (ctx: StructTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.fieldDecl`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFieldDecl?: (ctx: FieldDeclContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.string_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitString_?: (ctx: String_Context) => Result;

  /**
   * Visit a parse tree produced by `GoParser.embeddedField`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEmbeddedField?: (ctx: EmbeddedFieldContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.functionLit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionLit?: (ctx: FunctionLitContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.index`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIndex?: (ctx: IndexContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.slice_`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSlice_?: (ctx: Slice_Context) => Result;

  /**
   * Visit a parse tree produced by `GoParser.typeAssertion`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeAssertion?: (ctx: TypeAssertionContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.arguments`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArguments?: (ctx: ArgumentsContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.methodExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodExpr?: (ctx: MethodExprContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.receiverType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReceiverType?: (ctx: ReceiverTypeContext) => Result;

  /**
   * Visit a parse tree produced by `GoParser.eos`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEos?: (ctx: EosContext) => Result;
}
