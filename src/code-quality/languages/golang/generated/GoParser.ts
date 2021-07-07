import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';
import * as Utils from 'antlr4ts/misc/Utils';
import { GoParserVisitor } from './GoParserVisitor';
import { Parser } from 'antlr4ts/Parser';

export class GoParser extends Parser {
  public static readonly BREAK = 1;
  public static readonly DEFAULT = 2;
  public static readonly FUNC = 3;
  public static readonly INTERFACE = 4;
  public static readonly SELECT = 5;
  public static readonly CASE = 6;
  public static readonly DEFER = 7;
  public static readonly GO = 8;
  public static readonly MAP = 9;
  public static readonly STRUCT = 10;
  public static readonly CHAN = 11;
  public static readonly ELSE = 12;
  public static readonly GOTO = 13;
  public static readonly PACKAGE = 14;
  public static readonly SWITCH = 15;
  public static readonly CONST = 16;
  public static readonly FALLTHROUGH = 17;
  public static readonly IF = 18;
  public static readonly RANGE = 19;
  public static readonly TYPE = 20;
  public static readonly CONTINUE = 21;
  public static readonly FOR = 22;
  public static readonly IMPORT = 23;
  public static readonly RETURN = 24;
  public static readonly VAR = 25;
  public static readonly NIL_LIT = 26;
  public static readonly IDENTIFIER = 27;
  public static readonly L_PAREN = 28;
  public static readonly R_PAREN = 29;
  public static readonly L_CURLY = 30;
  public static readonly R_CURLY = 31;
  public static readonly L_BRACKET = 32;
  public static readonly R_BRACKET = 33;
  public static readonly ASSIGN = 34;
  public static readonly COMMA = 35;
  public static readonly SEMI = 36;
  public static readonly COLON = 37;
  public static readonly DOT = 38;
  public static readonly PLUS_PLUS = 39;
  public static readonly MINUS_MINUS = 40;
  public static readonly DECLARE_ASSIGN = 41;
  public static readonly ELLIPSIS = 42;
  public static readonly LOGICAL_OR = 43;
  public static readonly LOGICAL_AND = 44;
  public static readonly EQUALS = 45;
  public static readonly NOT_EQUALS = 46;
  public static readonly LESS = 47;
  public static readonly LESS_OR_EQUALS = 48;
  public static readonly GREATER = 49;
  public static readonly GREATER_OR_EQUALS = 50;
  public static readonly OR = 51;
  public static readonly DIV = 52;
  public static readonly MOD = 53;
  public static readonly LSHIFT = 54;
  public static readonly RSHIFT = 55;
  public static readonly BIT_CLEAR = 56;
  public static readonly EXCLAMATION = 57;
  public static readonly PLUS = 58;
  public static readonly MINUS = 59;
  public static readonly CARET = 60;
  public static readonly STAR = 61;
  public static readonly AMPERSAND = 62;
  public static readonly RECEIVE = 63;
  public static readonly DECIMAL_LIT = 64;
  public static readonly BINARY_LIT = 65;
  public static readonly OCTAL_LIT = 66;
  public static readonly HEX_LIT = 67;
  public static readonly FLOAT_LIT = 68;
  public static readonly DECIMAL_FLOAT_LIT = 69;
  public static readonly HEX_FLOAT_LIT = 70;
  public static readonly IMAGINARY_LIT = 71;
  public static readonly RUNE_LIT = 72;
  public static readonly BYTE_VALUE = 73;
  public static readonly OCTAL_BYTE_VALUE = 74;
  public static readonly HEX_BYTE_VALUE = 75;
  public static readonly LITTLE_U_VALUE = 76;
  public static readonly BIG_U_VALUE = 77;
  public static readonly RAW_STRING_LIT = 78;
  public static readonly INTERPRETED_STRING_LIT = 79;
  public static readonly WS = 80;
  public static readonly COMMENT = 81;
  public static readonly TERMINATOR = 82;
  public static readonly LINE_COMMENT = 83;
  public static readonly RULE_sourceFile = 0;
  public static readonly RULE_packageClause = 1;
  public static readonly RULE_importDecl = 2;
  public static readonly RULE_importSpec = 3;
  public static readonly RULE_importPath = 4;
  public static readonly RULE_declaration = 5;
  public static readonly RULE_constDecl = 6;
  public static readonly RULE_constSpec = 7;
  public static readonly RULE_identifierList = 8;
  public static readonly RULE_expressionList = 9;
  public static readonly RULE_typeDecl = 10;
  public static readonly RULE_typeSpec = 11;
  public static readonly RULE_functionDecl = 12;
  public static readonly RULE_methodDecl = 13;
  public static readonly RULE_receiver = 14;
  public static readonly RULE_varDecl = 15;
  public static readonly RULE_varSpec = 16;
  public static readonly RULE_block = 17;
  public static readonly RULE_statementList = 18;
  public static readonly RULE_statement = 19;
  public static readonly RULE_simpleStmt = 20;
  public static readonly RULE_expressionStmt = 21;
  public static readonly RULE_sendStmt = 22;
  public static readonly RULE_incDecStmt = 23;
  public static readonly RULE_assignment = 24;
  public static readonly RULE_assign_op = 25;
  public static readonly RULE_shortVarDecl = 26;
  public static readonly RULE_emptyStmt = 27;
  public static readonly RULE_labeledStmt = 28;
  public static readonly RULE_returnStmt = 29;
  public static readonly RULE_breakStmt = 30;
  public static readonly RULE_continueStmt = 31;
  public static readonly RULE_gotoStmt = 32;
  public static readonly RULE_fallthroughStmt = 33;
  public static readonly RULE_deferStmt = 34;
  public static readonly RULE_ifStmt = 35;
  public static readonly RULE_switchStmt = 36;
  public static readonly RULE_exprSwitchStmt = 37;
  public static readonly RULE_exprCaseClause = 38;
  public static readonly RULE_exprSwitchCase = 39;
  public static readonly RULE_typeSwitchStmt = 40;
  public static readonly RULE_typeSwitchGuard = 41;
  public static readonly RULE_typeCaseClause = 42;
  public static readonly RULE_typeSwitchCase = 43;
  public static readonly RULE_typeList = 44;
  public static readonly RULE_selectStmt = 45;
  public static readonly RULE_commClause = 46;
  public static readonly RULE_commCase = 47;
  public static readonly RULE_recvStmt = 48;
  public static readonly RULE_forStmt = 49;
  public static readonly RULE_forClause = 50;
  public static readonly RULE_rangeClause = 51;
  public static readonly RULE_goStmt = 52;
  public static readonly RULE_type_ = 53;
  public static readonly RULE_typeName = 54;
  public static readonly RULE_typeLit = 55;
  public static readonly RULE_arrayType = 56;
  public static readonly RULE_arrayLength = 57;
  public static readonly RULE_elementType = 58;
  public static readonly RULE_pointerType = 59;
  public static readonly RULE_interfaceType = 60;
  public static readonly RULE_sliceType = 61;
  public static readonly RULE_mapType = 62;
  public static readonly RULE_channelType = 63;
  public static readonly RULE_methodSpec = 64;
  public static readonly RULE_functionType = 65;
  public static readonly RULE_signature = 66;
  public static readonly RULE_result = 67;
  public static readonly RULE_parameters = 68;
  public static readonly RULE_parameterDecl = 69;
  public static readonly RULE_expression = 70;
  public static readonly RULE_primaryExpr = 71;
  public static readonly RULE_unaryExpr = 72;
  public static readonly RULE_conversion = 73;
  public static readonly RULE_operand = 74;
  public static readonly RULE_literal = 75;
  public static readonly RULE_basicLit = 76;
  public static readonly RULE_integer = 77;
  public static readonly RULE_operandName = 78;
  public static readonly RULE_qualifiedIdent = 79;
  public static readonly RULE_compositeLit = 80;
  public static readonly RULE_literalType = 81;
  public static readonly RULE_literalValue = 82;
  public static readonly RULE_elementList = 83;
  public static readonly RULE_keyedElement = 84;
  public static readonly RULE_key = 85;
  public static readonly RULE_element = 86;
  public static readonly RULE_structType = 87;
  public static readonly RULE_fieldDecl = 88;
  public static readonly RULE_string_ = 89;
  public static readonly RULE_embeddedField = 90;
  public static readonly RULE_functionLit = 91;
  public static readonly RULE_index = 92;
  public static readonly RULE_slice_ = 93;
  public static readonly RULE_typeAssertion = 94;
  public static readonly RULE_arguments = 95;
  public static readonly RULE_methodExpr = 96;
  public static readonly RULE_receiverType = 97;
  public static readonly RULE_eos = 98;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'sourceFile',
    'packageClause',
    'importDecl',
    'importSpec',
    'importPath',
    'declaration',
    'constDecl',
    'constSpec',
    'identifierList',
    'expressionList',
    'typeDecl',
    'typeSpec',
    'functionDecl',
    'methodDecl',
    'receiver',
    'varDecl',
    'varSpec',
    'block',
    'statementList',
    'statement',
    'simpleStmt',
    'expressionStmt',
    'sendStmt',
    'incDecStmt',
    'assignment',
    'assign_op',
    'shortVarDecl',
    'emptyStmt',
    'labeledStmt',
    'returnStmt',
    'breakStmt',
    'continueStmt',
    'gotoStmt',
    'fallthroughStmt',
    'deferStmt',
    'ifStmt',
    'switchStmt',
    'exprSwitchStmt',
    'exprCaseClause',
    'exprSwitchCase',
    'typeSwitchStmt',
    'typeSwitchGuard',
    'typeCaseClause',
    'typeSwitchCase',
    'typeList',
    'selectStmt',
    'commClause',
    'commCase',
    'recvStmt',
    'forStmt',
    'forClause',
    'rangeClause',
    'goStmt',
    'type_',
    'typeName',
    'typeLit',
    'arrayType',
    'arrayLength',
    'elementType',
    'pointerType',
    'interfaceType',
    'sliceType',
    'mapType',
    'channelType',
    'methodSpec',
    'functionType',
    'signature',
    'result',
    'parameters',
    'parameterDecl',
    'expression',
    'primaryExpr',
    'unaryExpr',
    'conversion',
    'operand',
    'literal',
    'basicLit',
    'integer',
    'operandName',
    'qualifiedIdent',
    'compositeLit',
    'literalType',
    'literalValue',
    'elementList',
    'keyedElement',
    'key',
    'element',
    'structType',
    'fieldDecl',
    'string_',
    'embeddedField',
    'functionLit',
    'index',
    'slice_',
    'typeAssertion',
    'arguments',
    'methodExpr',
    'receiverType',
    'eos',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'break'",
    "'default'",
    "'func'",
    "'interface'",
    "'select'",
    "'case'",
    "'defer'",
    "'go'",
    "'map'",
    "'struct'",
    "'chan'",
    "'else'",
    "'goto'",
    "'package'",
    "'switch'",
    "'const'",
    "'fallthrough'",
    "'if'",
    "'range'",
    "'type'",
    "'continue'",
    "'for'",
    "'import'",
    "'return'",
    "'var'",
    "'nil'",
    undefined,
    "'('",
    "')'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "'='",
    "','",
    "';'",
    "':'",
    "'.'",
    "'++'",
    "'--'",
    "':='",
    "'...'",
    "'||'",
    "'&&'",
    "'=='",
    "'!='",
    "'<'",
    "'<='",
    "'>'",
    "'>='",
    "'|'",
    "'/'",
    "'%'",
    "'<<'",
    "'>>'",
    "'&^'",
    "'!'",
    "'+'",
    "'-'",
    "'^'",
    "'*'",
    "'&'",
    "'<-'",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    'BREAK',
    'DEFAULT',
    'FUNC',
    'INTERFACE',
    'SELECT',
    'CASE',
    'DEFER',
    'GO',
    'MAP',
    'STRUCT',
    'CHAN',
    'ELSE',
    'GOTO',
    'PACKAGE',
    'SWITCH',
    'CONST',
    'FALLTHROUGH',
    'IF',
    'RANGE',
    'TYPE',
    'CONTINUE',
    'FOR',
    'IMPORT',
    'RETURN',
    'VAR',
    'NIL_LIT',
    'IDENTIFIER',
    'L_PAREN',
    'R_PAREN',
    'L_CURLY',
    'R_CURLY',
    'L_BRACKET',
    'R_BRACKET',
    'ASSIGN',
    'COMMA',
    'SEMI',
    'COLON',
    'DOT',
    'PLUS_PLUS',
    'MINUS_MINUS',
    'DECLARE_ASSIGN',
    'ELLIPSIS',
    'LOGICAL_OR',
    'LOGICAL_AND',
    'EQUALS',
    'NOT_EQUALS',
    'LESS',
    'LESS_OR_EQUALS',
    'GREATER',
    'GREATER_OR_EQUALS',
    'OR',
    'DIV',
    'MOD',
    'LSHIFT',
    'RSHIFT',
    'BIT_CLEAR',
    'EXCLAMATION',
    'PLUS',
    'MINUS',
    'CARET',
    'STAR',
    'AMPERSAND',
    'RECEIVE',
    'DECIMAL_LIT',
    'BINARY_LIT',
    'OCTAL_LIT',
    'HEX_LIT',
    'FLOAT_LIT',
    'DECIMAL_FLOAT_LIT',
    'HEX_FLOAT_LIT',
    'IMAGINARY_LIT',
    'RUNE_LIT',
    'BYTE_VALUE',
    'OCTAL_BYTE_VALUE',
    'HEX_BYTE_VALUE',
    'LITTLE_U_VALUE',
    'BIG_U_VALUE',
    'RAW_STRING_LIT',
    'INTERPRETED_STRING_LIT',
    'WS',
    'COMMENT',
    'TERMINATOR',
    'LINE_COMMENT',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    GoParser._LITERAL_NAMES,
    GoParser._SYMBOLIC_NAMES,
    [],
  );

  public get vocabulary(): Vocabulary {
    return GoParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'GoParser.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return GoParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return GoParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(GoParser._ATN, this);
  }
  // @RuleVersion(0)
  public sourceFile(): SourceFileContext {
    const _localctx: SourceFileContext = new SourceFileContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 0, GoParser.RULE_sourceFile);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 198;
        this.packageClause();
        this.state = 199;
        this.eos();
        this.state = 205;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GoParser.IMPORT) {
          {
            {
              this.state = 200;
              this.importDecl();
              this.state = 201;
              this.eos();
            }
          }
          this.state = 207;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 217;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << GoParser.FUNC) |
              (1 << GoParser.CONST) |
              (1 << GoParser.TYPE) |
              (1 << GoParser.VAR))) !==
            0
        ) {
          {
            {
              this.state = 211;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 1, this._ctx)
              ) {
                case 1:
                  {
                    this.state = 208;
                    this.functionDecl();
                  }
                  break;

                case 2:
                  {
                    this.state = 209;
                    this.methodDecl();
                  }
                  break;

                case 3:
                  {
                    this.state = 210;
                    this.declaration();
                  }
                  break;
              }
              this.state = 213;
              this.eos();
            }
          }
          this.state = 219;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 220;
        this.match(GoParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public packageClause(): PackageClauseContext {
    const _localctx: PackageClauseContext = new PackageClauseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 2, GoParser.RULE_packageClause);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 222;
        this.match(GoParser.PACKAGE);
        this.state = 223;
        _localctx._packageName = this.match(GoParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public importDecl(): ImportDeclContext {
    const _localctx: ImportDeclContext = new ImportDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 4, GoParser.RULE_importDecl);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 225;
        this.match(GoParser.IMPORT);
        this.state = 237;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case GoParser.IDENTIFIER:
          case GoParser.DOT:
          case GoParser.RAW_STRING_LIT:
          case GoParser.INTERPRETED_STRING_LIT:
            {
              this.state = 226;
              this.importSpec();
            }
            break;
          case GoParser.L_PAREN:
            {
              this.state = 227;
              this.match(GoParser.L_PAREN);
              this.state = 233;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              while (
                _la === GoParser.IDENTIFIER ||
                _la === GoParser.DOT ||
                _la === GoParser.RAW_STRING_LIT ||
                _la === GoParser.INTERPRETED_STRING_LIT
              ) {
                {
                  {
                    this.state = 228;
                    this.importSpec();
                    this.state = 229;
                    this.eos();
                  }
                }
                this.state = 235;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
              }
              this.state = 236;
              this.match(GoParser.R_PAREN);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public importSpec(): ImportSpecContext {
    const _localctx: ImportSpecContext = new ImportSpecContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 6, GoParser.RULE_importSpec);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 240;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GoParser.IDENTIFIER || _la === GoParser.DOT) {
          {
            this.state = 239;
            _localctx._alias = this._input.LT(1);
            _la = this._input.LA(1);
            if (!(_la === GoParser.IDENTIFIER || _la === GoParser.DOT)) {
              _localctx._alias = this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
        }

        this.state = 242;
        this.importPath();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public importPath(): ImportPathContext {
    const _localctx: ImportPathContext = new ImportPathContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 8, GoParser.RULE_importPath);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 244;
        this.string_();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public declaration(): DeclarationContext {
    const _localctx: DeclarationContext = new DeclarationContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 10, GoParser.RULE_declaration);
    try {
      this.state = 249;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.CONST:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 246;
            this.constDecl();
          }
          break;
        case GoParser.TYPE:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 247;
            this.typeDecl();
          }
          break;
        case GoParser.VAR:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 248;
            this.varDecl();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public constDecl(): ConstDeclContext {
    const _localctx: ConstDeclContext = new ConstDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 12, GoParser.RULE_constDecl);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 251;
        this.match(GoParser.CONST);
        this.state = 263;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case GoParser.IDENTIFIER:
            {
              this.state = 252;
              this.constSpec();
            }
            break;
          case GoParser.L_PAREN:
            {
              this.state = 253;
              this.match(GoParser.L_PAREN);
              this.state = 259;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              while (_la === GoParser.IDENTIFIER) {
                {
                  {
                    this.state = 254;
                    this.constSpec();
                    this.state = 255;
                    this.eos();
                  }
                }
                this.state = 261;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
              }
              this.state = 262;
              this.match(GoParser.R_PAREN);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public constSpec(): ConstSpecContext {
    const _localctx: ConstSpecContext = new ConstSpecContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 14, GoParser.RULE_constSpec);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 265;
        this.identifierList();
        this.state = 271;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
          case 1:
            {
              this.state = 267;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                ((_la & ~0x1f) === 0 &&
                  ((1 << _la) &
                    ((1 << GoParser.FUNC) |
                      (1 << GoParser.INTERFACE) |
                      (1 << GoParser.MAP) |
                      (1 << GoParser.STRUCT) |
                      (1 << GoParser.CHAN) |
                      (1 << GoParser.IDENTIFIER) |
                      (1 << GoParser.L_PAREN))) !==
                    0) ||
                (((_la - 32) & ~0x1f) === 0 &&
                  ((1 << (_la - 32)) &
                    ((1 << (GoParser.L_BRACKET - 32)) |
                      (1 << (GoParser.STAR - 32)) |
                      (1 << (GoParser.RECEIVE - 32)))) !==
                    0)
              ) {
                {
                  this.state = 266;
                  this.type_();
                }
              }

              this.state = 269;
              this.match(GoParser.ASSIGN);
              this.state = 270;
              this.expressionList();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public identifierList(): IdentifierListContext {
    const _localctx: IdentifierListContext = new IdentifierListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 16, GoParser.RULE_identifierList);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 273;
        this.match(GoParser.IDENTIFIER);
        this.state = 278;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 274;
                this.match(GoParser.COMMA);
                this.state = 275;
                this.match(GoParser.IDENTIFIER);
              }
            }
          }
          this.state = 280;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expressionList(): ExpressionListContext {
    const _localctx: ExpressionListContext = new ExpressionListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 18, GoParser.RULE_expressionList);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 281;
        this.expression(0);
        this.state = 286;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 282;
                this.match(GoParser.COMMA);
                this.state = 283;
                this.expression(0);
              }
            }
          }
          this.state = 288;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeDecl(): TypeDeclContext {
    const _localctx: TypeDeclContext = new TypeDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 20, GoParser.RULE_typeDecl);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 289;
        this.match(GoParser.TYPE);
        this.state = 301;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case GoParser.IDENTIFIER:
            {
              this.state = 290;
              this.typeSpec();
            }
            break;
          case GoParser.L_PAREN:
            {
              this.state = 291;
              this.match(GoParser.L_PAREN);
              this.state = 297;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              while (_la === GoParser.IDENTIFIER) {
                {
                  {
                    this.state = 292;
                    this.typeSpec();
                    this.state = 293;
                    this.eos();
                  }
                }
                this.state = 299;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
              }
              this.state = 300;
              this.match(GoParser.R_PAREN);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeSpec(): TypeSpecContext {
    const _localctx: TypeSpecContext = new TypeSpecContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 22, GoParser.RULE_typeSpec);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 303;
        this.match(GoParser.IDENTIFIER);
        this.state = 305;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GoParser.ASSIGN) {
          {
            this.state = 304;
            this.match(GoParser.ASSIGN);
          }
        }

        this.state = 307;
        this.type_();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionDecl(): FunctionDeclContext {
    const _localctx: FunctionDeclContext = new FunctionDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 24, GoParser.RULE_functionDecl);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 309;
        this.match(GoParser.FUNC);
        this.state = 310;
        this.match(GoParser.IDENTIFIER);
        {
          this.state = 311;
          this.signature();
          this.state = 313;
          this._errHandler.sync(this);
          switch (
            this.interpreter.adaptivePredict(this._input, 16, this._ctx)
          ) {
            case 1:
              {
                this.state = 312;
                this.block();
              }
              break;
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public methodDecl(): MethodDeclContext {
    const _localctx: MethodDeclContext = new MethodDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 26, GoParser.RULE_methodDecl);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 315;
        this.match(GoParser.FUNC);
        this.state = 316;
        this.receiver();
        this.state = 317;
        this.match(GoParser.IDENTIFIER);
        {
          this.state = 318;
          this.signature();
          this.state = 320;
          this._errHandler.sync(this);
          switch (
            this.interpreter.adaptivePredict(this._input, 17, this._ctx)
          ) {
            case 1:
              {
                this.state = 319;
                this.block();
              }
              break;
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public receiver(): ReceiverContext {
    const _localctx: ReceiverContext = new ReceiverContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 28, GoParser.RULE_receiver);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 322;
        this.parameters();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public varDecl(): VarDeclContext {
    const _localctx: VarDeclContext = new VarDeclContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, GoParser.RULE_varDecl);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 324;
        this.match(GoParser.VAR);
        this.state = 336;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case GoParser.IDENTIFIER:
            {
              this.state = 325;
              this.varSpec();
            }
            break;
          case GoParser.L_PAREN:
            {
              this.state = 326;
              this.match(GoParser.L_PAREN);
              this.state = 332;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              while (_la === GoParser.IDENTIFIER) {
                {
                  {
                    this.state = 327;
                    this.varSpec();
                    this.state = 328;
                    this.eos();
                  }
                }
                this.state = 334;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
              }
              this.state = 335;
              this.match(GoParser.R_PAREN);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public varSpec(): VarSpecContext {
    const _localctx: VarSpecContext = new VarSpecContext(this._ctx, this.state);
    this.enterRule(_localctx, 32, GoParser.RULE_varSpec);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 338;
        this.identifierList();
        this.state = 346;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case GoParser.FUNC:
          case GoParser.INTERFACE:
          case GoParser.MAP:
          case GoParser.STRUCT:
          case GoParser.CHAN:
          case GoParser.IDENTIFIER:
          case GoParser.L_PAREN:
          case GoParser.L_BRACKET:
          case GoParser.STAR:
          case GoParser.RECEIVE:
            {
              this.state = 339;
              this.type_();
              this.state = 342;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 20, this._ctx)
              ) {
                case 1:
                  {
                    this.state = 340;
                    this.match(GoParser.ASSIGN);
                    this.state = 341;
                    this.expressionList();
                  }
                  break;
              }
            }
            break;
          case GoParser.ASSIGN:
            {
              this.state = 344;
              this.match(GoParser.ASSIGN);
              this.state = 345;
              this.expressionList();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public block(): BlockContext {
    const _localctx: BlockContext = new BlockContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, GoParser.RULE_block);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 348;
        this.match(GoParser.L_CURLY);
        this.state = 350;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.BREAK) |
                (1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.SELECT) |
                (1 << GoParser.DEFER) |
                (1 << GoParser.GO) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.GOTO) |
                (1 << GoParser.SWITCH) |
                (1 << GoParser.CONST) |
                (1 << GoParser.FALLTHROUGH) |
                (1 << GoParser.IF) |
                (1 << GoParser.TYPE) |
                (1 << GoParser.CONTINUE) |
                (1 << GoParser.FOR) |
                (1 << GoParser.RETURN) |
                (1 << GoParser.VAR) |
                (1 << GoParser.NIL_LIT) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN) |
                (1 << GoParser.L_CURLY))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.SEMI - 32)) |
                (1 << (GoParser.EXCLAMATION - 32)) |
                (1 << (GoParser.PLUS - 32)) |
                (1 << (GoParser.MINUS - 32)) |
                (1 << (GoParser.CARET - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.AMPERSAND - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.FLOAT_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)) |
                (1 << (GoParser.RAW_STRING_LIT - 64)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 64)))) !==
              0)
        ) {
          {
            this.state = 349;
            this.statementList();
          }
        }

        this.state = 352;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public statementList(): StatementListContext {
    const _localctx: StatementListContext = new StatementListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 36, GoParser.RULE_statementList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 357;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 354;
              this.statement();
              this.state = 355;
              this.eos();
            }
          }
          this.state = 359;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.BREAK) |
                (1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.SELECT) |
                (1 << GoParser.DEFER) |
                (1 << GoParser.GO) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.GOTO) |
                (1 << GoParser.SWITCH) |
                (1 << GoParser.CONST) |
                (1 << GoParser.FALLTHROUGH) |
                (1 << GoParser.IF) |
                (1 << GoParser.TYPE) |
                (1 << GoParser.CONTINUE) |
                (1 << GoParser.FOR) |
                (1 << GoParser.RETURN) |
                (1 << GoParser.VAR) |
                (1 << GoParser.NIL_LIT) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN) |
                (1 << GoParser.L_CURLY))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.SEMI - 32)) |
                (1 << (GoParser.EXCLAMATION - 32)) |
                (1 << (GoParser.PLUS - 32)) |
                (1 << (GoParser.MINUS - 32)) |
                (1 << (GoParser.CARET - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.AMPERSAND - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.FLOAT_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)) |
                (1 << (GoParser.RAW_STRING_LIT - 64)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 64)))) !==
              0)
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public statement(): StatementContext {
    const _localctx: StatementContext = new StatementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 38, GoParser.RULE_statement);
    try {
      this.state = 376;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 24, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 361;
            this.declaration();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 362;
            this.labeledStmt();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 363;
            this.simpleStmt();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 364;
            this.goStmt();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 365;
            this.returnStmt();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 366;
            this.breakStmt();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 367;
            this.continueStmt();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 368;
            this.gotoStmt();
          }
          break;

        case 9:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 369;
            this.fallthroughStmt();
          }
          break;

        case 10:
          this.enterOuterAlt(_localctx, 10);
          {
            this.state = 370;
            this.block();
          }
          break;

        case 11:
          this.enterOuterAlt(_localctx, 11);
          {
            this.state = 371;
            this.ifStmt();
          }
          break;

        case 12:
          this.enterOuterAlt(_localctx, 12);
          {
            this.state = 372;
            this.switchStmt();
          }
          break;

        case 13:
          this.enterOuterAlt(_localctx, 13);
          {
            this.state = 373;
            this.selectStmt();
          }
          break;

        case 14:
          this.enterOuterAlt(_localctx, 14);
          {
            this.state = 374;
            this.forStmt();
          }
          break;

        case 15:
          this.enterOuterAlt(_localctx, 15);
          {
            this.state = 375;
            this.deferStmt();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public simpleStmt(): SimpleStmtContext {
    const _localctx: SimpleStmtContext = new SimpleStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 40, GoParser.RULE_simpleStmt);
    try {
      this.state = 384;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 25, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 378;
            this.sendStmt();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 379;
            this.incDecStmt();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 380;
            this.assignment();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 381;
            this.expressionStmt();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 382;
            this.shortVarDecl();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 383;
            this.emptyStmt();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expressionStmt(): ExpressionStmtContext {
    const _localctx: ExpressionStmtContext = new ExpressionStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 42, GoParser.RULE_expressionStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 386;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public sendStmt(): SendStmtContext {
    const _localctx: SendStmtContext = new SendStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 44, GoParser.RULE_sendStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 388;
        _localctx._channel = this.expression(0);
        this.state = 389;
        this.match(GoParser.RECEIVE);
        this.state = 390;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public incDecStmt(): IncDecStmtContext {
    const _localctx: IncDecStmtContext = new IncDecStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 46, GoParser.RULE_incDecStmt);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 392;
        this.expression(0);
        this.state = 393;
        _la = this._input.LA(1);
        if (!(_la === GoParser.PLUS_PLUS || _la === GoParser.MINUS_MINUS)) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assignment(): AssignmentContext {
    const _localctx: AssignmentContext = new AssignmentContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 48, GoParser.RULE_assignment);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 395;
        this.expressionList();
        this.state = 396;
        this.assign_op();
        this.state = 397;
        this.expressionList();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assign_op(): Assign_opContext {
    const _localctx: Assign_opContext = new Assign_opContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 50, GoParser.RULE_assign_op);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 400;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la - 51) & ~0x1f) === 0 &&
          ((1 << (_la - 51)) &
            ((1 << (GoParser.OR - 51)) |
              (1 << (GoParser.DIV - 51)) |
              (1 << (GoParser.MOD - 51)) |
              (1 << (GoParser.LSHIFT - 51)) |
              (1 << (GoParser.RSHIFT - 51)) |
              (1 << (GoParser.BIT_CLEAR - 51)) |
              (1 << (GoParser.PLUS - 51)) |
              (1 << (GoParser.MINUS - 51)) |
              (1 << (GoParser.CARET - 51)) |
              (1 << (GoParser.STAR - 51)) |
              (1 << (GoParser.AMPERSAND - 51)))) !==
            0
        ) {
          {
            this.state = 399;
            _la = this._input.LA(1);
            if (
              !(
                ((_la - 51) & ~0x1f) === 0 &&
                ((1 << (_la - 51)) &
                  ((1 << (GoParser.OR - 51)) |
                    (1 << (GoParser.DIV - 51)) |
                    (1 << (GoParser.MOD - 51)) |
                    (1 << (GoParser.LSHIFT - 51)) |
                    (1 << (GoParser.RSHIFT - 51)) |
                    (1 << (GoParser.BIT_CLEAR - 51)) |
                    (1 << (GoParser.PLUS - 51)) |
                    (1 << (GoParser.MINUS - 51)) |
                    (1 << (GoParser.CARET - 51)) |
                    (1 << (GoParser.STAR - 51)) |
                    (1 << (GoParser.AMPERSAND - 51)))) !==
                  0
              )
            ) {
              this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
          }
        }

        this.state = 402;
        this.match(GoParser.ASSIGN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public shortVarDecl(): ShortVarDeclContext {
    const _localctx: ShortVarDeclContext = new ShortVarDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 52, GoParser.RULE_shortVarDecl);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 404;
        this.identifierList();
        this.state = 405;
        this.match(GoParser.DECLARE_ASSIGN);
        this.state = 406;
        this.expressionList();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public emptyStmt(): EmptyStmtContext {
    const _localctx: EmptyStmtContext = new EmptyStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 54, GoParser.RULE_emptyStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 408;
        this.match(GoParser.SEMI);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public labeledStmt(): LabeledStmtContext {
    const _localctx: LabeledStmtContext = new LabeledStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 56, GoParser.RULE_labeledStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 410;
        this.match(GoParser.IDENTIFIER);
        this.state = 411;
        this.match(GoParser.COLON);
        this.state = 412;
        this.statement();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public returnStmt(): ReturnStmtContext {
    const _localctx: ReturnStmtContext = new ReturnStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 58, GoParser.RULE_returnStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 414;
        this.match(GoParser.RETURN);
        this.state = 416;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 27, this._ctx)) {
          case 1:
            {
              this.state = 415;
              this.expressionList();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public breakStmt(): BreakStmtContext {
    const _localctx: BreakStmtContext = new BreakStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 60, GoParser.RULE_breakStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 418;
        this.match(GoParser.BREAK);
        this.state = 420;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 28, this._ctx)) {
          case 1:
            {
              this.state = 419;
              this.match(GoParser.IDENTIFIER);
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public continueStmt(): ContinueStmtContext {
    const _localctx: ContinueStmtContext = new ContinueStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 62, GoParser.RULE_continueStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 422;
        this.match(GoParser.CONTINUE);
        this.state = 424;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 29, this._ctx)) {
          case 1:
            {
              this.state = 423;
              this.match(GoParser.IDENTIFIER);
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public gotoStmt(): GotoStmtContext {
    const _localctx: GotoStmtContext = new GotoStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 64, GoParser.RULE_gotoStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 426;
        this.match(GoParser.GOTO);
        this.state = 427;
        this.match(GoParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public fallthroughStmt(): FallthroughStmtContext {
    const _localctx: FallthroughStmtContext = new FallthroughStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 66, GoParser.RULE_fallthroughStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 429;
        this.match(GoParser.FALLTHROUGH);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public deferStmt(): DeferStmtContext {
    const _localctx: DeferStmtContext = new DeferStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 68, GoParser.RULE_deferStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 431;
        this.match(GoParser.DEFER);
        this.state = 432;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public ifStmt(): IfStmtContext {
    const _localctx: IfStmtContext = new IfStmtContext(this._ctx, this.state);
    this.enterRule(_localctx, 70, GoParser.RULE_ifStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 434;
        this.match(GoParser.IF);
        this.state = 438;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 30, this._ctx)) {
          case 1:
            {
              this.state = 435;
              this.simpleStmt();
              this.state = 436;
              this.match(GoParser.SEMI);
            }
            break;
        }
        this.state = 440;
        this.expression(0);
        this.state = 441;
        this.block();
        this.state = 447;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 32, this._ctx)) {
          case 1:
            {
              this.state = 442;
              this.match(GoParser.ELSE);
              this.state = 445;
              this._errHandler.sync(this);
              switch (this._input.LA(1)) {
                case GoParser.IF:
                  {
                    this.state = 443;
                    this.ifStmt();
                  }
                  break;
                case GoParser.L_CURLY:
                  {
                    this.state = 444;
                    this.block();
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public switchStmt(): SwitchStmtContext {
    const _localctx: SwitchStmtContext = new SwitchStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 72, GoParser.RULE_switchStmt);
    try {
      this.state = 451;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 33, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 449;
            this.exprSwitchStmt();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 450;
            this.typeSwitchStmt();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public exprSwitchStmt(): ExprSwitchStmtContext {
    const _localctx: ExprSwitchStmtContext = new ExprSwitchStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 74, GoParser.RULE_exprSwitchStmt);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 453;
        this.match(GoParser.SWITCH);
        this.state = 457;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 34, this._ctx)) {
          case 1:
            {
              this.state = 454;
              this.simpleStmt();
              this.state = 455;
              this.match(GoParser.SEMI);
            }
            break;
        }
        this.state = 460;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 3) & ~0x1f) === 0 &&
            ((1 << (_la - 3)) &
              ((1 << (GoParser.FUNC - 3)) |
                (1 << (GoParser.INTERFACE - 3)) |
                (1 << (GoParser.MAP - 3)) |
                (1 << (GoParser.STRUCT - 3)) |
                (1 << (GoParser.CHAN - 3)) |
                (1 << (GoParser.NIL_LIT - 3)) |
                (1 << (GoParser.IDENTIFIER - 3)) |
                (1 << (GoParser.L_PAREN - 3)) |
                (1 << (GoParser.L_BRACKET - 3)))) !==
              0) ||
          (((_la - 57) & ~0x1f) === 0 &&
            ((1 << (_la - 57)) &
              ((1 << (GoParser.EXCLAMATION - 57)) |
                (1 << (GoParser.PLUS - 57)) |
                (1 << (GoParser.MINUS - 57)) |
                (1 << (GoParser.CARET - 57)) |
                (1 << (GoParser.STAR - 57)) |
                (1 << (GoParser.AMPERSAND - 57)) |
                (1 << (GoParser.RECEIVE - 57)) |
                (1 << (GoParser.DECIMAL_LIT - 57)) |
                (1 << (GoParser.BINARY_LIT - 57)) |
                (1 << (GoParser.OCTAL_LIT - 57)) |
                (1 << (GoParser.HEX_LIT - 57)) |
                (1 << (GoParser.FLOAT_LIT - 57)) |
                (1 << (GoParser.IMAGINARY_LIT - 57)) |
                (1 << (GoParser.RUNE_LIT - 57)) |
                (1 << (GoParser.RAW_STRING_LIT - 57)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
              0)
        ) {
          {
            this.state = 459;
            this.expression(0);
          }
        }

        this.state = 462;
        this.match(GoParser.L_CURLY);
        this.state = 466;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GoParser.DEFAULT || _la === GoParser.CASE) {
          {
            {
              this.state = 463;
              this.exprCaseClause();
            }
          }
          this.state = 468;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 469;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public exprCaseClause(): ExprCaseClauseContext {
    const _localctx: ExprCaseClauseContext = new ExprCaseClauseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 76, GoParser.RULE_exprCaseClause);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 471;
        this.exprSwitchCase();
        this.state = 472;
        this.match(GoParser.COLON);
        this.state = 474;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.BREAK) |
                (1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.SELECT) |
                (1 << GoParser.DEFER) |
                (1 << GoParser.GO) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.GOTO) |
                (1 << GoParser.SWITCH) |
                (1 << GoParser.CONST) |
                (1 << GoParser.FALLTHROUGH) |
                (1 << GoParser.IF) |
                (1 << GoParser.TYPE) |
                (1 << GoParser.CONTINUE) |
                (1 << GoParser.FOR) |
                (1 << GoParser.RETURN) |
                (1 << GoParser.VAR) |
                (1 << GoParser.NIL_LIT) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN) |
                (1 << GoParser.L_CURLY))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.SEMI - 32)) |
                (1 << (GoParser.EXCLAMATION - 32)) |
                (1 << (GoParser.PLUS - 32)) |
                (1 << (GoParser.MINUS - 32)) |
                (1 << (GoParser.CARET - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.AMPERSAND - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.FLOAT_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)) |
                (1 << (GoParser.RAW_STRING_LIT - 64)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 64)))) !==
              0)
        ) {
          {
            this.state = 473;
            this.statementList();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public exprSwitchCase(): ExprSwitchCaseContext {
    const _localctx: ExprSwitchCaseContext = new ExprSwitchCaseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 78, GoParser.RULE_exprSwitchCase);
    try {
      this.state = 479;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.CASE:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 476;
            this.match(GoParser.CASE);
            this.state = 477;
            this.expressionList();
          }
          break;
        case GoParser.DEFAULT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 478;
            this.match(GoParser.DEFAULT);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeSwitchStmt(): TypeSwitchStmtContext {
    const _localctx: TypeSwitchStmtContext = new TypeSwitchStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 80, GoParser.RULE_typeSwitchStmt);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 481;
        this.match(GoParser.SWITCH);
        this.state = 485;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 39, this._ctx)) {
          case 1:
            {
              this.state = 482;
              this.simpleStmt();
              this.state = 483;
              this.match(GoParser.SEMI);
            }
            break;
        }
        this.state = 487;
        this.typeSwitchGuard();
        this.state = 488;
        this.match(GoParser.L_CURLY);
        this.state = 492;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GoParser.DEFAULT || _la === GoParser.CASE) {
          {
            {
              this.state = 489;
              this.typeCaseClause();
            }
          }
          this.state = 494;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 495;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeSwitchGuard(): TypeSwitchGuardContext {
    const _localctx: TypeSwitchGuardContext = new TypeSwitchGuardContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 82, GoParser.RULE_typeSwitchGuard);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 499;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 41, this._ctx)) {
          case 1:
            {
              this.state = 497;
              this.match(GoParser.IDENTIFIER);
              this.state = 498;
              this.match(GoParser.DECLARE_ASSIGN);
            }
            break;
        }
        this.state = 501;
        this.primaryExpr(0);
        this.state = 502;
        this.match(GoParser.DOT);
        this.state = 503;
        this.match(GoParser.L_PAREN);
        this.state = 504;
        this.match(GoParser.TYPE);
        this.state = 505;
        this.match(GoParser.R_PAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeCaseClause(): TypeCaseClauseContext {
    const _localctx: TypeCaseClauseContext = new TypeCaseClauseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 84, GoParser.RULE_typeCaseClause);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 507;
        this.typeSwitchCase();
        this.state = 508;
        this.match(GoParser.COLON);
        this.state = 510;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.BREAK) |
                (1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.SELECT) |
                (1 << GoParser.DEFER) |
                (1 << GoParser.GO) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.GOTO) |
                (1 << GoParser.SWITCH) |
                (1 << GoParser.CONST) |
                (1 << GoParser.FALLTHROUGH) |
                (1 << GoParser.IF) |
                (1 << GoParser.TYPE) |
                (1 << GoParser.CONTINUE) |
                (1 << GoParser.FOR) |
                (1 << GoParser.RETURN) |
                (1 << GoParser.VAR) |
                (1 << GoParser.NIL_LIT) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN) |
                (1 << GoParser.L_CURLY))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.SEMI - 32)) |
                (1 << (GoParser.EXCLAMATION - 32)) |
                (1 << (GoParser.PLUS - 32)) |
                (1 << (GoParser.MINUS - 32)) |
                (1 << (GoParser.CARET - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.AMPERSAND - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.FLOAT_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)) |
                (1 << (GoParser.RAW_STRING_LIT - 64)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 64)))) !==
              0)
        ) {
          {
            this.state = 509;
            this.statementList();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeSwitchCase(): TypeSwitchCaseContext {
    const _localctx: TypeSwitchCaseContext = new TypeSwitchCaseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 86, GoParser.RULE_typeSwitchCase);
    try {
      this.state = 515;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.CASE:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 512;
            this.match(GoParser.CASE);
            this.state = 513;
            this.typeList();
          }
          break;
        case GoParser.DEFAULT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 514;
            this.match(GoParser.DEFAULT);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeList(): TypeListContext {
    const _localctx: TypeListContext = new TypeListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 88, GoParser.RULE_typeList);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 519;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case GoParser.FUNC:
          case GoParser.INTERFACE:
          case GoParser.MAP:
          case GoParser.STRUCT:
          case GoParser.CHAN:
          case GoParser.IDENTIFIER:
          case GoParser.L_PAREN:
          case GoParser.L_BRACKET:
          case GoParser.STAR:
          case GoParser.RECEIVE:
            {
              this.state = 517;
              this.type_();
            }
            break;
          case GoParser.NIL_LIT:
            {
              this.state = 518;
              this.match(GoParser.NIL_LIT);
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this.state = 528;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GoParser.COMMA) {
          {
            {
              this.state = 521;
              this.match(GoParser.COMMA);
              this.state = 524;
              this._errHandler.sync(this);
              switch (this._input.LA(1)) {
                case GoParser.FUNC:
                case GoParser.INTERFACE:
                case GoParser.MAP:
                case GoParser.STRUCT:
                case GoParser.CHAN:
                case GoParser.IDENTIFIER:
                case GoParser.L_PAREN:
                case GoParser.L_BRACKET:
                case GoParser.STAR:
                case GoParser.RECEIVE:
                  {
                    this.state = 522;
                    this.type_();
                  }
                  break;
                case GoParser.NIL_LIT:
                  {
                    this.state = 523;
                    this.match(GoParser.NIL_LIT);
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
            }
          }
          this.state = 530;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public selectStmt(): SelectStmtContext {
    const _localctx: SelectStmtContext = new SelectStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 90, GoParser.RULE_selectStmt);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 531;
        this.match(GoParser.SELECT);
        this.state = 532;
        this.match(GoParser.L_CURLY);
        this.state = 536;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while (_la === GoParser.DEFAULT || _la === GoParser.CASE) {
          {
            {
              this.state = 533;
              this.commClause();
            }
          }
          this.state = 538;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        }
        this.state = 539;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public commClause(): CommClauseContext {
    const _localctx: CommClauseContext = new CommClauseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 92, GoParser.RULE_commClause);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 541;
        this.commCase();
        this.state = 542;
        this.match(GoParser.COLON);
        this.state = 544;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.BREAK) |
                (1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.SELECT) |
                (1 << GoParser.DEFER) |
                (1 << GoParser.GO) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.GOTO) |
                (1 << GoParser.SWITCH) |
                (1 << GoParser.CONST) |
                (1 << GoParser.FALLTHROUGH) |
                (1 << GoParser.IF) |
                (1 << GoParser.TYPE) |
                (1 << GoParser.CONTINUE) |
                (1 << GoParser.FOR) |
                (1 << GoParser.RETURN) |
                (1 << GoParser.VAR) |
                (1 << GoParser.NIL_LIT) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN) |
                (1 << GoParser.L_CURLY))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.SEMI - 32)) |
                (1 << (GoParser.EXCLAMATION - 32)) |
                (1 << (GoParser.PLUS - 32)) |
                (1 << (GoParser.MINUS - 32)) |
                (1 << (GoParser.CARET - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.AMPERSAND - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.FLOAT_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)) |
                (1 << (GoParser.RAW_STRING_LIT - 64)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 64)))) !==
              0)
        ) {
          {
            this.state = 543;
            this.statementList();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public commCase(): CommCaseContext {
    const _localctx: CommCaseContext = new CommCaseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 94, GoParser.RULE_commCase);
    try {
      this.state = 552;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.CASE:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 546;
            this.match(GoParser.CASE);
            this.state = 549;
            this._errHandler.sync(this);
            switch (
              this.interpreter.adaptivePredict(this._input, 49, this._ctx)
            ) {
              case 1:
                {
                  this.state = 547;
                  this.sendStmt();
                }
                break;

              case 2:
                {
                  this.state = 548;
                  this.recvStmt();
                }
                break;
            }
          }
          break;
        case GoParser.DEFAULT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 551;
            this.match(GoParser.DEFAULT);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public recvStmt(): RecvStmtContext {
    const _localctx: RecvStmtContext = new RecvStmtContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 96, GoParser.RULE_recvStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 560;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 51, this._ctx)) {
          case 1:
            {
              this.state = 554;
              this.expressionList();
              this.state = 555;
              this.match(GoParser.ASSIGN);
            }
            break;

          case 2:
            {
              this.state = 557;
              this.identifierList();
              this.state = 558;
              this.match(GoParser.DECLARE_ASSIGN);
            }
            break;
        }
        this.state = 562;
        _localctx._recvExpr = this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public forStmt(): ForStmtContext {
    const _localctx: ForStmtContext = new ForStmtContext(this._ctx, this.state);
    this.enterRule(_localctx, 98, GoParser.RULE_forStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 564;
        this.match(GoParser.FOR);
        this.state = 568;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 52, this._ctx)) {
          case 1:
            {
              this.state = 565;
              this.expression(0);
            }
            break;

          case 2:
            {
              this.state = 566;
              this.forClause();
            }
            break;

          case 3:
            {
              this.state = 567;
              this.rangeClause();
            }
            break;
        }
        this.state = 570;
        this.block();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public forClause(): ForClauseContext {
    const _localctx: ForClauseContext = new ForClauseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 100, GoParser.RULE_forClause);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 573;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 53, this._ctx)) {
          case 1:
            {
              this.state = 572;
              _localctx._initStmt = this.simpleStmt();
            }
            break;
        }
        this.state = 575;
        this.match(GoParser.SEMI);
        this.state = 577;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 3) & ~0x1f) === 0 &&
            ((1 << (_la - 3)) &
              ((1 << (GoParser.FUNC - 3)) |
                (1 << (GoParser.INTERFACE - 3)) |
                (1 << (GoParser.MAP - 3)) |
                (1 << (GoParser.STRUCT - 3)) |
                (1 << (GoParser.CHAN - 3)) |
                (1 << (GoParser.NIL_LIT - 3)) |
                (1 << (GoParser.IDENTIFIER - 3)) |
                (1 << (GoParser.L_PAREN - 3)) |
                (1 << (GoParser.L_BRACKET - 3)))) !==
              0) ||
          (((_la - 57) & ~0x1f) === 0 &&
            ((1 << (_la - 57)) &
              ((1 << (GoParser.EXCLAMATION - 57)) |
                (1 << (GoParser.PLUS - 57)) |
                (1 << (GoParser.MINUS - 57)) |
                (1 << (GoParser.CARET - 57)) |
                (1 << (GoParser.STAR - 57)) |
                (1 << (GoParser.AMPERSAND - 57)) |
                (1 << (GoParser.RECEIVE - 57)) |
                (1 << (GoParser.DECIMAL_LIT - 57)) |
                (1 << (GoParser.BINARY_LIT - 57)) |
                (1 << (GoParser.OCTAL_LIT - 57)) |
                (1 << (GoParser.HEX_LIT - 57)) |
                (1 << (GoParser.FLOAT_LIT - 57)) |
                (1 << (GoParser.IMAGINARY_LIT - 57)) |
                (1 << (GoParser.RUNE_LIT - 57)) |
                (1 << (GoParser.RAW_STRING_LIT - 57)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
              0)
        ) {
          {
            this.state = 576;
            this.expression(0);
          }
        }

        this.state = 579;
        this.match(GoParser.SEMI);
        this.state = 581;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.NIL_LIT) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.SEMI - 32)) |
                (1 << (GoParser.EXCLAMATION - 32)) |
                (1 << (GoParser.PLUS - 32)) |
                (1 << (GoParser.MINUS - 32)) |
                (1 << (GoParser.CARET - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.AMPERSAND - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0) ||
          (((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.FLOAT_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)) |
                (1 << (GoParser.RAW_STRING_LIT - 64)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 64)))) !==
              0)
        ) {
          {
            this.state = 580;
            _localctx._postStmt = this.simpleStmt();
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public rangeClause(): RangeClauseContext {
    const _localctx: RangeClauseContext = new RangeClauseContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 102, GoParser.RULE_rangeClause);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 589;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 56, this._ctx)) {
          case 1:
            {
              this.state = 583;
              this.expressionList();
              this.state = 584;
              this.match(GoParser.ASSIGN);
            }
            break;

          case 2:
            {
              this.state = 586;
              this.identifierList();
              this.state = 587;
              this.match(GoParser.DECLARE_ASSIGN);
            }
            break;
        }
        this.state = 591;
        this.match(GoParser.RANGE);
        this.state = 592;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public goStmt(): GoStmtContext {
    const _localctx: GoStmtContext = new GoStmtContext(this._ctx, this.state);
    this.enterRule(_localctx, 104, GoParser.RULE_goStmt);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 594;
        this.match(GoParser.GO);
        this.state = 595;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public type_(): Type_Context {
    const _localctx: Type_Context = new Type_Context(this._ctx, this.state);
    this.enterRule(_localctx, 106, GoParser.RULE_type_);
    try {
      this.state = 603;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 597;
            this.typeName();
          }
          break;
        case GoParser.FUNC:
        case GoParser.INTERFACE:
        case GoParser.MAP:
        case GoParser.STRUCT:
        case GoParser.CHAN:
        case GoParser.L_BRACKET:
        case GoParser.STAR:
        case GoParser.RECEIVE:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 598;
            this.typeLit();
          }
          break;
        case GoParser.L_PAREN:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 599;
            this.match(GoParser.L_PAREN);
            this.state = 600;
            this.type_();
            this.state = 601;
            this.match(GoParser.R_PAREN);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeName(): TypeNameContext {
    const _localctx: TypeNameContext = new TypeNameContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 108, GoParser.RULE_typeName);
    try {
      this.state = 607;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 58, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 605;
            this.qualifiedIdent();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 606;
            this.match(GoParser.IDENTIFIER);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeLit(): TypeLitContext {
    const _localctx: TypeLitContext = new TypeLitContext(this._ctx, this.state);
    this.enterRule(_localctx, 110, GoParser.RULE_typeLit);
    try {
      this.state = 617;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 59, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 609;
            this.arrayType();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 610;
            this.structType();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 611;
            this.pointerType();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 612;
            this.functionType();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 613;
            this.interfaceType();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 614;
            this.sliceType();
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 615;
            this.mapType();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 616;
            this.channelType();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public arrayType(): ArrayTypeContext {
    const _localctx: ArrayTypeContext = new ArrayTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 112, GoParser.RULE_arrayType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 619;
        this.match(GoParser.L_BRACKET);
        this.state = 620;
        this.arrayLength();
        this.state = 621;
        this.match(GoParser.R_BRACKET);
        this.state = 622;
        this.elementType();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public arrayLength(): ArrayLengthContext {
    const _localctx: ArrayLengthContext = new ArrayLengthContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 114, GoParser.RULE_arrayLength);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 624;
        this.expression(0);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public elementType(): ElementTypeContext {
    const _localctx: ElementTypeContext = new ElementTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 116, GoParser.RULE_elementType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 626;
        this.type_();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public pointerType(): PointerTypeContext {
    const _localctx: PointerTypeContext = new PointerTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 118, GoParser.RULE_pointerType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 628;
        this.match(GoParser.STAR);
        this.state = 629;
        this.type_();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public interfaceType(): InterfaceTypeContext {
    const _localctx: InterfaceTypeContext = new InterfaceTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 120, GoParser.RULE_interfaceType);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 631;
        this.match(GoParser.INTERFACE);
        this.state = 632;
        this.match(GoParser.L_CURLY);
        this.state = 641;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 61, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 635;
                this._errHandler.sync(this);
                switch (
                  this.interpreter.adaptivePredict(this._input, 60, this._ctx)
                ) {
                  case 1:
                    {
                      this.state = 633;
                      this.methodSpec();
                    }
                    break;

                  case 2:
                    {
                      this.state = 634;
                      this.typeName();
                    }
                    break;
                }
                this.state = 637;
                this.eos();
              }
            }
          }
          this.state = 643;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 61, this._ctx);
        }
        this.state = 644;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public sliceType(): SliceTypeContext {
    const _localctx: SliceTypeContext = new SliceTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 122, GoParser.RULE_sliceType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 646;
        this.match(GoParser.L_BRACKET);
        this.state = 647;
        this.match(GoParser.R_BRACKET);
        this.state = 648;
        this.elementType();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public mapType(): MapTypeContext {
    const _localctx: MapTypeContext = new MapTypeContext(this._ctx, this.state);
    this.enterRule(_localctx, 124, GoParser.RULE_mapType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 650;
        this.match(GoParser.MAP);
        this.state = 651;
        this.match(GoParser.L_BRACKET);
        this.state = 652;
        this.type_();
        this.state = 653;
        this.match(GoParser.R_BRACKET);
        this.state = 654;
        this.elementType();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public channelType(): ChannelTypeContext {
    const _localctx: ChannelTypeContext = new ChannelTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 126, GoParser.RULE_channelType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 661;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 62, this._ctx)) {
          case 1:
            {
              this.state = 656;
              this.match(GoParser.CHAN);
            }
            break;

          case 2:
            {
              this.state = 657;
              this.match(GoParser.CHAN);
              this.state = 658;
              this.match(GoParser.RECEIVE);
            }
            break;

          case 3:
            {
              this.state = 659;
              this.match(GoParser.RECEIVE);
              this.state = 660;
              this.match(GoParser.CHAN);
            }
            break;
        }
        this.state = 663;
        this.elementType();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public methodSpec(): MethodSpecContext {
    const _localctx: MethodSpecContext = new MethodSpecContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 128, GoParser.RULE_methodSpec);
    try {
      this.state = 672;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 63, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 665;
            this.state = 666;
            this.match(GoParser.IDENTIFIER);
            this.state = 667;
            this.parameters();
            this.state = 668;
            this.result();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 670;
            this.match(GoParser.IDENTIFIER);
            this.state = 671;
            this.parameters();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionType(): FunctionTypeContext {
    const _localctx: FunctionTypeContext = new FunctionTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 130, GoParser.RULE_functionType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 674;
        this.match(GoParser.FUNC);
        this.state = 675;
        this.signature();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public signature(): SignatureContext {
    const _localctx: SignatureContext = new SignatureContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 132, GoParser.RULE_signature);
    try {
      this.state = 682;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 64, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 677;
            this.state = 678;
            this.parameters();
            this.state = 679;
            this.result();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 681;
            this.parameters();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public result(): ResultContext {
    const _localctx: ResultContext = new ResultContext(this._ctx, this.state);
    this.enterRule(_localctx, 134, GoParser.RULE_result);
    try {
      this.state = 686;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 65, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 684;
            this.parameters();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 685;
            this.type_();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameters(): ParametersContext {
    const _localctx: ParametersContext = new ParametersContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 136, GoParser.RULE_parameters);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 688;
        this.match(GoParser.L_PAREN);
        this.state = 700;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << GoParser.FUNC) |
                (1 << GoParser.INTERFACE) |
                (1 << GoParser.MAP) |
                (1 << GoParser.STRUCT) |
                (1 << GoParser.CHAN) |
                (1 << GoParser.IDENTIFIER) |
                (1 << GoParser.L_PAREN))) !==
              0) ||
          (((_la - 32) & ~0x1f) === 0 &&
            ((1 << (_la - 32)) &
              ((1 << (GoParser.L_BRACKET - 32)) |
                (1 << (GoParser.ELLIPSIS - 32)) |
                (1 << (GoParser.STAR - 32)) |
                (1 << (GoParser.RECEIVE - 32)))) !==
              0)
        ) {
          {
            this.state = 689;
            this.parameterDecl();
            this.state = 694;
            this._errHandler.sync(this);
            _alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 690;
                    this.match(GoParser.COMMA);
                    this.state = 691;
                    this.parameterDecl();
                  }
                }
              }
              this.state = 696;
              this._errHandler.sync(this);
              _alt = this.interpreter.adaptivePredict(
                this._input,
                66,
                this._ctx,
              );
            }
            this.state = 698;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GoParser.COMMA) {
              {
                this.state = 697;
                this.match(GoParser.COMMA);
              }
            }
          }
        }

        this.state = 702;
        this.match(GoParser.R_PAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public parameterDecl(): ParameterDeclContext {
    const _localctx: ParameterDeclContext = new ParameterDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 138, GoParser.RULE_parameterDecl);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 705;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 69, this._ctx)) {
          case 1:
            {
              this.state = 704;
              this.identifierList();
            }
            break;
        }
        this.state = 708;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GoParser.ELLIPSIS) {
          {
            this.state = 707;
            this.match(GoParser.ELLIPSIS);
          }
        }

        this.state = 710;
        this.type_();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public expression(): ExpressionContext;
  public expression(_p: number): ExpressionContext;
  // @RuleVersion(0)
  public expression(_p?: number): ExpressionContext {
    if (_p === undefined) {
      _p = 0;
    }

    const _parentctx: ParserRuleContext = this._ctx;
    const _parentState: number = this.state;
    let _localctx: ExpressionContext = new ExpressionContext(
      this._ctx,
      _parentState,
    );
    const _startState = 140;
    this.enterRecursionRule(_localctx, 140, GoParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 715;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 71, this._ctx)) {
          case 1:
            {
              this.state = 713;
              this.primaryExpr(0);
            }
            break;

          case 2:
            {
              this.state = 714;
              this.unaryExpr();
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 734;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 73, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            {
              this.state = 732;
              this._errHandler.sync(this);
              switch (
                this.interpreter.adaptivePredict(this._input, 72, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      GoParser.RULE_expression,
                    );
                    this.state = 717;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 5)',
                      );
                    }
                    this.state = 718;
                    _localctx._mul_op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 52) & ~0x1f) === 0 &&
                        ((1 << (_la - 52)) &
                          ((1 << (GoParser.DIV - 52)) |
                            (1 << (GoParser.MOD - 52)) |
                            (1 << (GoParser.LSHIFT - 52)) |
                            (1 << (GoParser.RSHIFT - 52)) |
                            (1 << (GoParser.BIT_CLEAR - 52)) |
                            (1 << (GoParser.STAR - 52)) |
                            (1 << (GoParser.AMPERSAND - 52)))) !==
                          0
                      )
                    ) {
                      _localctx._mul_op = this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 719;
                    this.expression(6);
                  }
                  break;

                case 2:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      GoParser.RULE_expression,
                    );
                    this.state = 720;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 4)',
                      );
                    }
                    this.state = 721;
                    _localctx._add_op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 51) & ~0x1f) === 0 &&
                        ((1 << (_la - 51)) &
                          ((1 << (GoParser.OR - 51)) |
                            (1 << (GoParser.PLUS - 51)) |
                            (1 << (GoParser.MINUS - 51)) |
                            (1 << (GoParser.CARET - 51)))) !==
                          0
                      )
                    ) {
                      _localctx._add_op = this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 722;
                    this.expression(5);
                  }
                  break;

                case 3:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      GoParser.RULE_expression,
                    );
                    this.state = 723;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 3)',
                      );
                    }
                    this.state = 724;
                    _localctx._rel_op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if (
                      !(
                        ((_la - 45) & ~0x1f) === 0 &&
                        ((1 << (_la - 45)) &
                          ((1 << (GoParser.EQUALS - 45)) |
                            (1 << (GoParser.NOT_EQUALS - 45)) |
                            (1 << (GoParser.LESS - 45)) |
                            (1 << (GoParser.LESS_OR_EQUALS - 45)) |
                            (1 << (GoParser.GREATER - 45)) |
                            (1 << (GoParser.GREATER_OR_EQUALS - 45)))) !==
                          0
                      )
                    ) {
                      _localctx._rel_op = this._errHandler.recoverInline(this);
                    } else {
                      if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                      }

                      this._errHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 725;
                    this.expression(4);
                  }
                  break;

                case 4:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      GoParser.RULE_expression,
                    );
                    this.state = 726;
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 2)',
                      );
                    }
                    this.state = 727;
                    this.match(GoParser.LOGICAL_AND);
                    this.state = 728;
                    this.expression(3);
                  }
                  break;

                case 5:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      GoParser.RULE_expression,
                    );
                    this.state = 729;
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 1)',
                      );
                    }
                    this.state = 730;
                    this.match(GoParser.LOGICAL_OR);
                    this.state = 731;
                    this.expression(2);
                  }
                  break;
              }
            }
          }
          this.state = 736;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 73, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }

  public primaryExpr(): PrimaryExprContext;
  public primaryExpr(_p: number): PrimaryExprContext;
  // @RuleVersion(0)
  public primaryExpr(_p?: number): PrimaryExprContext {
    if (_p === undefined) {
      _p = 0;
    }

    const _parentctx: ParserRuleContext = this._ctx;
    const _parentState: number = this.state;
    let _localctx: PrimaryExprContext = new PrimaryExprContext(
      this._ctx,
      _parentState,
    );
    const _startState = 142;
    this.enterRecursionRule(_localctx, 142, GoParser.RULE_primaryExpr, _p);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 741;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 74, this._ctx)) {
          case 1:
            {
              this.state = 738;
              this.operand();
            }
            break;

          case 2:
            {
              this.state = 739;
              this.conversion();
            }
            break;

          case 3:
            {
              this.state = 740;
              this.methodExpr();
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 754;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 76, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            {
              {
                _localctx = new PrimaryExprContext(_parentctx, _parentState);
                this.pushNewRecursionContext(
                  _localctx,
                  _startState,
                  GoParser.RULE_primaryExpr,
                );
                this.state = 743;
                if (!this.precpred(this._ctx, 1)) {
                  throw this.createFailedPredicateException(
                    'this.precpred(this._ctx, 1)',
                  );
                }
                this.state = 750;
                this._errHandler.sync(this);
                switch (
                  this.interpreter.adaptivePredict(this._input, 75, this._ctx)
                ) {
                  case 1:
                    {
                      {
                        this.state = 744;
                        this.match(GoParser.DOT);
                        this.state = 745;
                        this.match(GoParser.IDENTIFIER);
                      }
                    }
                    break;

                  case 2:
                    {
                      this.state = 746;
                      this.index();
                    }
                    break;

                  case 3:
                    {
                      this.state = 747;
                      this.slice_();
                    }
                    break;

                  case 4:
                    {
                      this.state = 748;
                      this.typeAssertion();
                    }
                    break;

                  case 5:
                    {
                      this.state = 749;
                      this.arguments();
                    }
                    break;
                }
              }
            }
          }
          this.state = 756;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 76, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public unaryExpr(): UnaryExprContext {
    const _localctx: UnaryExprContext = new UnaryExprContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 144, GoParser.RULE_unaryExpr);
    let _la: number;
    try {
      this.state = 760;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 77, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 757;
            this.primaryExpr(0);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 758;
            _localctx._unary_op = this._input.LT(1);
            _la = this._input.LA(1);
            if (
              !(
                ((_la - 57) & ~0x1f) === 0 &&
                ((1 << (_la - 57)) &
                  ((1 << (GoParser.EXCLAMATION - 57)) |
                    (1 << (GoParser.PLUS - 57)) |
                    (1 << (GoParser.MINUS - 57)) |
                    (1 << (GoParser.CARET - 57)) |
                    (1 << (GoParser.STAR - 57)) |
                    (1 << (GoParser.AMPERSAND - 57)) |
                    (1 << (GoParser.RECEIVE - 57)))) !==
                  0
              )
            ) {
              _localctx._unary_op = this._errHandler.recoverInline(this);
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true;
              }

              this._errHandler.reportMatch(this);
              this.consume();
            }
            this.state = 759;
            this.expression(0);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public conversion(): ConversionContext {
    const _localctx: ConversionContext = new ConversionContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 146, GoParser.RULE_conversion);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 762;
        this.type_();
        this.state = 763;
        this.match(GoParser.L_PAREN);
        this.state = 764;
        this.expression(0);
        this.state = 766;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GoParser.COMMA) {
          {
            this.state = 765;
            this.match(GoParser.COMMA);
          }
        }

        this.state = 768;
        this.match(GoParser.R_PAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public operand(): OperandContext {
    const _localctx: OperandContext = new OperandContext(this._ctx, this.state);
    this.enterRule(_localctx, 148, GoParser.RULE_operand);
    try {
      this.state = 776;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 79, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 770;
            this.literal();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 771;
            this.operandName();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 772;
            this.match(GoParser.L_PAREN);
            this.state = 773;
            this.expression(0);
            this.state = 774;
            this.match(GoParser.R_PAREN);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public literal(): LiteralContext {
    const _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
    this.enterRule(_localctx, 150, GoParser.RULE_literal);
    try {
      this.state = 781;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.NIL_LIT:
        case GoParser.DECIMAL_LIT:
        case GoParser.BINARY_LIT:
        case GoParser.OCTAL_LIT:
        case GoParser.HEX_LIT:
        case GoParser.FLOAT_LIT:
        case GoParser.IMAGINARY_LIT:
        case GoParser.RUNE_LIT:
        case GoParser.RAW_STRING_LIT:
        case GoParser.INTERPRETED_STRING_LIT:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 778;
            this.basicLit();
          }
          break;
        case GoParser.MAP:
        case GoParser.STRUCT:
        case GoParser.IDENTIFIER:
        case GoParser.L_BRACKET:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 779;
            this.compositeLit();
          }
          break;
        case GoParser.FUNC:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 780;
            this.functionLit();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public basicLit(): BasicLitContext {
    const _localctx: BasicLitContext = new BasicLitContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 152, GoParser.RULE_basicLit);
    try {
      this.state = 789;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 81, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 783;
            this.match(GoParser.NIL_LIT);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 784;
            this.integer();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 785;
            this.string_();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 786;
            this.match(GoParser.FLOAT_LIT);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 787;
            this.match(GoParser.IMAGINARY_LIT);
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 788;
            this.match(GoParser.RUNE_LIT);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public integer(): IntegerContext {
    const _localctx: IntegerContext = new IntegerContext(this._ctx, this.state);
    this.enterRule(_localctx, 154, GoParser.RULE_integer);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 791;
        _la = this._input.LA(1);
        if (
          !(
            ((_la - 64) & ~0x1f) === 0 &&
            ((1 << (_la - 64)) &
              ((1 << (GoParser.DECIMAL_LIT - 64)) |
                (1 << (GoParser.BINARY_LIT - 64)) |
                (1 << (GoParser.OCTAL_LIT - 64)) |
                (1 << (GoParser.HEX_LIT - 64)) |
                (1 << (GoParser.IMAGINARY_LIT - 64)) |
                (1 << (GoParser.RUNE_LIT - 64)))) !==
              0
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public operandName(): OperandNameContext {
    const _localctx: OperandNameContext = new OperandNameContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 156, GoParser.RULE_operandName);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 793;
        this.match(GoParser.IDENTIFIER);
        this.state = 796;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 82, this._ctx)) {
          case 1:
            {
              this.state = 794;
              this.match(GoParser.DOT);
              this.state = 795;
              this.match(GoParser.IDENTIFIER);
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public qualifiedIdent(): QualifiedIdentContext {
    const _localctx: QualifiedIdentContext = new QualifiedIdentContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 158, GoParser.RULE_qualifiedIdent);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 798;
        this.match(GoParser.IDENTIFIER);
        this.state = 799;
        this.match(GoParser.DOT);
        this.state = 800;
        this.match(GoParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public compositeLit(): CompositeLitContext {
    const _localctx: CompositeLitContext = new CompositeLitContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 160, GoParser.RULE_compositeLit);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 802;
        this.literalType();
        this.state = 803;
        this.literalValue();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public literalType(): LiteralTypeContext {
    const _localctx: LiteralTypeContext = new LiteralTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 162, GoParser.RULE_literalType);
    try {
      this.state = 814;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 83, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 805;
            this.structType();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 806;
            this.arrayType();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 807;
            this.match(GoParser.L_BRACKET);
            this.state = 808;
            this.match(GoParser.ELLIPSIS);
            this.state = 809;
            this.match(GoParser.R_BRACKET);
            this.state = 810;
            this.elementType();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 811;
            this.sliceType();
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 812;
            this.mapType();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 813;
            this.typeName();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public literalValue(): LiteralValueContext {
    const _localctx: LiteralValueContext = new LiteralValueContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 164, GoParser.RULE_literalValue);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 816;
        this.match(GoParser.L_CURLY);
        this.state = 821;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 3) & ~0x1f) === 0 &&
            ((1 << (_la - 3)) &
              ((1 << (GoParser.FUNC - 3)) |
                (1 << (GoParser.INTERFACE - 3)) |
                (1 << (GoParser.MAP - 3)) |
                (1 << (GoParser.STRUCT - 3)) |
                (1 << (GoParser.CHAN - 3)) |
                (1 << (GoParser.NIL_LIT - 3)) |
                (1 << (GoParser.IDENTIFIER - 3)) |
                (1 << (GoParser.L_PAREN - 3)) |
                (1 << (GoParser.L_CURLY - 3)) |
                (1 << (GoParser.L_BRACKET - 3)))) !==
              0) ||
          (((_la - 57) & ~0x1f) === 0 &&
            ((1 << (_la - 57)) &
              ((1 << (GoParser.EXCLAMATION - 57)) |
                (1 << (GoParser.PLUS - 57)) |
                (1 << (GoParser.MINUS - 57)) |
                (1 << (GoParser.CARET - 57)) |
                (1 << (GoParser.STAR - 57)) |
                (1 << (GoParser.AMPERSAND - 57)) |
                (1 << (GoParser.RECEIVE - 57)) |
                (1 << (GoParser.DECIMAL_LIT - 57)) |
                (1 << (GoParser.BINARY_LIT - 57)) |
                (1 << (GoParser.OCTAL_LIT - 57)) |
                (1 << (GoParser.HEX_LIT - 57)) |
                (1 << (GoParser.FLOAT_LIT - 57)) |
                (1 << (GoParser.IMAGINARY_LIT - 57)) |
                (1 << (GoParser.RUNE_LIT - 57)) |
                (1 << (GoParser.RAW_STRING_LIT - 57)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
              0)
        ) {
          {
            this.state = 817;
            this.elementList();
            this.state = 819;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GoParser.COMMA) {
              {
                this.state = 818;
                this.match(GoParser.COMMA);
              }
            }
          }
        }

        this.state = 823;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public elementList(): ElementListContext {
    const _localctx: ElementListContext = new ElementListContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 166, GoParser.RULE_elementList);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 825;
        this.keyedElement();
        this.state = 830;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 86, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 826;
                this.match(GoParser.COMMA);
                this.state = 827;
                this.keyedElement();
              }
            }
          }
          this.state = 832;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 86, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public keyedElement(): KeyedElementContext {
    const _localctx: KeyedElementContext = new KeyedElementContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 168, GoParser.RULE_keyedElement);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 836;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 87, this._ctx)) {
          case 1:
            {
              this.state = 833;
              this.key();
              this.state = 834;
              this.match(GoParser.COLON);
            }
            break;
        }
        this.state = 838;
        this.element();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public key(): KeyContext {
    const _localctx: KeyContext = new KeyContext(this._ctx, this.state);
    this.enterRule(_localctx, 170, GoParser.RULE_key);
    try {
      this.state = 843;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 88, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 840;
            this.match(GoParser.IDENTIFIER);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 841;
            this.expression(0);
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 842;
            this.literalValue();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public element(): ElementContext {
    const _localctx: ElementContext = new ElementContext(this._ctx, this.state);
    this.enterRule(_localctx, 172, GoParser.RULE_element);
    try {
      this.state = 847;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case GoParser.FUNC:
        case GoParser.INTERFACE:
        case GoParser.MAP:
        case GoParser.STRUCT:
        case GoParser.CHAN:
        case GoParser.NIL_LIT:
        case GoParser.IDENTIFIER:
        case GoParser.L_PAREN:
        case GoParser.L_BRACKET:
        case GoParser.EXCLAMATION:
        case GoParser.PLUS:
        case GoParser.MINUS:
        case GoParser.CARET:
        case GoParser.STAR:
        case GoParser.AMPERSAND:
        case GoParser.RECEIVE:
        case GoParser.DECIMAL_LIT:
        case GoParser.BINARY_LIT:
        case GoParser.OCTAL_LIT:
        case GoParser.HEX_LIT:
        case GoParser.FLOAT_LIT:
        case GoParser.IMAGINARY_LIT:
        case GoParser.RUNE_LIT:
        case GoParser.RAW_STRING_LIT:
        case GoParser.INTERPRETED_STRING_LIT:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 845;
            this.expression(0);
          }
          break;
        case GoParser.L_CURLY:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 846;
            this.literalValue();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public structType(): StructTypeContext {
    const _localctx: StructTypeContext = new StructTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 174, GoParser.RULE_structType);
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 849;
        this.match(GoParser.STRUCT);
        this.state = 850;
        this.match(GoParser.L_CURLY);
        this.state = 856;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 90, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            {
              {
                this.state = 851;
                this.fieldDecl();
                this.state = 852;
                this.eos();
              }
            }
          }
          this.state = 858;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 90, this._ctx);
        }
        this.state = 859;
        this.match(GoParser.R_CURLY);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public fieldDecl(): FieldDeclContext {
    const _localctx: FieldDeclContext = new FieldDeclContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 176, GoParser.RULE_fieldDecl);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 866;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 91, this._ctx)) {
          case 1:
            {
              this.state = 861;
              this.state = 862;
              this.identifierList();
              this.state = 863;
              this.type_();
            }
            break;

          case 2:
            {
              this.state = 865;
              this.embeddedField();
            }
            break;
        }
        this.state = 869;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 92, this._ctx)) {
          case 1:
            {
              this.state = 868;
              _localctx._tag = this.string_();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public string_(): String_Context {
    const _localctx: String_Context = new String_Context(this._ctx, this.state);
    this.enterRule(_localctx, 178, GoParser.RULE_string_);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 871;
        _la = this._input.LA(1);
        if (
          !(
            _la === GoParser.RAW_STRING_LIT ||
            _la === GoParser.INTERPRETED_STRING_LIT
          )
        ) {
          this._errHandler.recoverInline(this);
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true;
          }

          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public embeddedField(): EmbeddedFieldContext {
    const _localctx: EmbeddedFieldContext = new EmbeddedFieldContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 180, GoParser.RULE_embeddedField);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 874;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === GoParser.STAR) {
          {
            this.state = 873;
            this.match(GoParser.STAR);
          }
        }

        this.state = 876;
        this.typeName();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public functionLit(): FunctionLitContext {
    const _localctx: FunctionLitContext = new FunctionLitContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 182, GoParser.RULE_functionLit);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 878;
        this.match(GoParser.FUNC);
        this.state = 879;
        this.signature();
        this.state = 880;
        this.block();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public index(): IndexContext {
    const _localctx: IndexContext = new IndexContext(this._ctx, this.state);
    this.enterRule(_localctx, 184, GoParser.RULE_index);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 882;
        this.match(GoParser.L_BRACKET);
        this.state = 883;
        this.expression(0);
        this.state = 884;
        this.match(GoParser.R_BRACKET);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public slice_(): Slice_Context {
    const _localctx: Slice_Context = new Slice_Context(this._ctx, this.state);
    this.enterRule(_localctx, 186, GoParser.RULE_slice_);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 886;
        this.match(GoParser.L_BRACKET);
        this.state = 902;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 97, this._ctx)) {
          case 1:
            {
              this.state = 888;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                (((_la - 3) & ~0x1f) === 0 &&
                  ((1 << (_la - 3)) &
                    ((1 << (GoParser.FUNC - 3)) |
                      (1 << (GoParser.INTERFACE - 3)) |
                      (1 << (GoParser.MAP - 3)) |
                      (1 << (GoParser.STRUCT - 3)) |
                      (1 << (GoParser.CHAN - 3)) |
                      (1 << (GoParser.NIL_LIT - 3)) |
                      (1 << (GoParser.IDENTIFIER - 3)) |
                      (1 << (GoParser.L_PAREN - 3)) |
                      (1 << (GoParser.L_BRACKET - 3)))) !==
                    0) ||
                (((_la - 57) & ~0x1f) === 0 &&
                  ((1 << (_la - 57)) &
                    ((1 << (GoParser.EXCLAMATION - 57)) |
                      (1 << (GoParser.PLUS - 57)) |
                      (1 << (GoParser.MINUS - 57)) |
                      (1 << (GoParser.CARET - 57)) |
                      (1 << (GoParser.STAR - 57)) |
                      (1 << (GoParser.AMPERSAND - 57)) |
                      (1 << (GoParser.RECEIVE - 57)) |
                      (1 << (GoParser.DECIMAL_LIT - 57)) |
                      (1 << (GoParser.BINARY_LIT - 57)) |
                      (1 << (GoParser.OCTAL_LIT - 57)) |
                      (1 << (GoParser.HEX_LIT - 57)) |
                      (1 << (GoParser.FLOAT_LIT - 57)) |
                      (1 << (GoParser.IMAGINARY_LIT - 57)) |
                      (1 << (GoParser.RUNE_LIT - 57)) |
                      (1 << (GoParser.RAW_STRING_LIT - 57)) |
                      (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
                    0)
              ) {
                {
                  this.state = 887;
                  this.expression(0);
                }
              }

              this.state = 890;
              this.match(GoParser.COLON);
              this.state = 892;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                (((_la - 3) & ~0x1f) === 0 &&
                  ((1 << (_la - 3)) &
                    ((1 << (GoParser.FUNC - 3)) |
                      (1 << (GoParser.INTERFACE - 3)) |
                      (1 << (GoParser.MAP - 3)) |
                      (1 << (GoParser.STRUCT - 3)) |
                      (1 << (GoParser.CHAN - 3)) |
                      (1 << (GoParser.NIL_LIT - 3)) |
                      (1 << (GoParser.IDENTIFIER - 3)) |
                      (1 << (GoParser.L_PAREN - 3)) |
                      (1 << (GoParser.L_BRACKET - 3)))) !==
                    0) ||
                (((_la - 57) & ~0x1f) === 0 &&
                  ((1 << (_la - 57)) &
                    ((1 << (GoParser.EXCLAMATION - 57)) |
                      (1 << (GoParser.PLUS - 57)) |
                      (1 << (GoParser.MINUS - 57)) |
                      (1 << (GoParser.CARET - 57)) |
                      (1 << (GoParser.STAR - 57)) |
                      (1 << (GoParser.AMPERSAND - 57)) |
                      (1 << (GoParser.RECEIVE - 57)) |
                      (1 << (GoParser.DECIMAL_LIT - 57)) |
                      (1 << (GoParser.BINARY_LIT - 57)) |
                      (1 << (GoParser.OCTAL_LIT - 57)) |
                      (1 << (GoParser.HEX_LIT - 57)) |
                      (1 << (GoParser.FLOAT_LIT - 57)) |
                      (1 << (GoParser.IMAGINARY_LIT - 57)) |
                      (1 << (GoParser.RUNE_LIT - 57)) |
                      (1 << (GoParser.RAW_STRING_LIT - 57)) |
                      (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
                    0)
              ) {
                {
                  this.state = 891;
                  this.expression(0);
                }
              }
            }
            break;

          case 2:
            {
              this.state = 895;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (
                (((_la - 3) & ~0x1f) === 0 &&
                  ((1 << (_la - 3)) &
                    ((1 << (GoParser.FUNC - 3)) |
                      (1 << (GoParser.INTERFACE - 3)) |
                      (1 << (GoParser.MAP - 3)) |
                      (1 << (GoParser.STRUCT - 3)) |
                      (1 << (GoParser.CHAN - 3)) |
                      (1 << (GoParser.NIL_LIT - 3)) |
                      (1 << (GoParser.IDENTIFIER - 3)) |
                      (1 << (GoParser.L_PAREN - 3)) |
                      (1 << (GoParser.L_BRACKET - 3)))) !==
                    0) ||
                (((_la - 57) & ~0x1f) === 0 &&
                  ((1 << (_la - 57)) &
                    ((1 << (GoParser.EXCLAMATION - 57)) |
                      (1 << (GoParser.PLUS - 57)) |
                      (1 << (GoParser.MINUS - 57)) |
                      (1 << (GoParser.CARET - 57)) |
                      (1 << (GoParser.STAR - 57)) |
                      (1 << (GoParser.AMPERSAND - 57)) |
                      (1 << (GoParser.RECEIVE - 57)) |
                      (1 << (GoParser.DECIMAL_LIT - 57)) |
                      (1 << (GoParser.BINARY_LIT - 57)) |
                      (1 << (GoParser.OCTAL_LIT - 57)) |
                      (1 << (GoParser.HEX_LIT - 57)) |
                      (1 << (GoParser.FLOAT_LIT - 57)) |
                      (1 << (GoParser.IMAGINARY_LIT - 57)) |
                      (1 << (GoParser.RUNE_LIT - 57)) |
                      (1 << (GoParser.RAW_STRING_LIT - 57)) |
                      (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
                    0)
              ) {
                {
                  this.state = 894;
                  this.expression(0);
                }
              }

              this.state = 897;
              this.match(GoParser.COLON);
              this.state = 898;
              this.expression(0);
              this.state = 899;
              this.match(GoParser.COLON);
              this.state = 900;
              this.expression(0);
            }
            break;
        }
        this.state = 904;
        this.match(GoParser.R_BRACKET);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public typeAssertion(): TypeAssertionContext {
    const _localctx: TypeAssertionContext = new TypeAssertionContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 188, GoParser.RULE_typeAssertion);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 906;
        this.match(GoParser.DOT);
        this.state = 907;
        this.match(GoParser.L_PAREN);
        this.state = 908;
        this.type_();
        this.state = 909;
        this.match(GoParser.R_PAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public arguments(): ArgumentsContext {
    const _localctx: ArgumentsContext = new ArgumentsContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 190, GoParser.RULE_arguments);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 911;
        this.match(GoParser.L_PAREN);
        this.state = 926;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (((_la - 3) & ~0x1f) === 0 &&
            ((1 << (_la - 3)) &
              ((1 << (GoParser.FUNC - 3)) |
                (1 << (GoParser.INTERFACE - 3)) |
                (1 << (GoParser.MAP - 3)) |
                (1 << (GoParser.STRUCT - 3)) |
                (1 << (GoParser.CHAN - 3)) |
                (1 << (GoParser.NIL_LIT - 3)) |
                (1 << (GoParser.IDENTIFIER - 3)) |
                (1 << (GoParser.L_PAREN - 3)) |
                (1 << (GoParser.L_BRACKET - 3)))) !==
              0) ||
          (((_la - 57) & ~0x1f) === 0 &&
            ((1 << (_la - 57)) &
              ((1 << (GoParser.EXCLAMATION - 57)) |
                (1 << (GoParser.PLUS - 57)) |
                (1 << (GoParser.MINUS - 57)) |
                (1 << (GoParser.CARET - 57)) |
                (1 << (GoParser.STAR - 57)) |
                (1 << (GoParser.AMPERSAND - 57)) |
                (1 << (GoParser.RECEIVE - 57)) |
                (1 << (GoParser.DECIMAL_LIT - 57)) |
                (1 << (GoParser.BINARY_LIT - 57)) |
                (1 << (GoParser.OCTAL_LIT - 57)) |
                (1 << (GoParser.HEX_LIT - 57)) |
                (1 << (GoParser.FLOAT_LIT - 57)) |
                (1 << (GoParser.IMAGINARY_LIT - 57)) |
                (1 << (GoParser.RUNE_LIT - 57)) |
                (1 << (GoParser.RAW_STRING_LIT - 57)) |
                (1 << (GoParser.INTERPRETED_STRING_LIT - 57)))) !==
              0)
        ) {
          {
            this.state = 918;
            this._errHandler.sync(this);
            switch (
              this.interpreter.adaptivePredict(this._input, 99, this._ctx)
            ) {
              case 1:
                {
                  this.state = 912;
                  this.expressionList();
                }
                break;

              case 2:
                {
                  this.state = 913;
                  this.type_();
                  this.state = 916;
                  this._errHandler.sync(this);
                  switch (
                    this.interpreter.adaptivePredict(this._input, 98, this._ctx)
                  ) {
                    case 1:
                      {
                        this.state = 914;
                        this.match(GoParser.COMMA);
                        this.state = 915;
                        this.expressionList();
                      }
                      break;
                  }
                }
                break;
            }
            this.state = 921;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GoParser.ELLIPSIS) {
              {
                this.state = 920;
                this.match(GoParser.ELLIPSIS);
              }
            }

            this.state = 924;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === GoParser.COMMA) {
              {
                this.state = 923;
                this.match(GoParser.COMMA);
              }
            }
          }
        }

        this.state = 928;
        this.match(GoParser.R_PAREN);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public methodExpr(): MethodExprContext {
    const _localctx: MethodExprContext = new MethodExprContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 192, GoParser.RULE_methodExpr);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 930;
        this.receiverType();
        this.state = 931;
        this.match(GoParser.DOT);
        this.state = 932;
        this.match(GoParser.IDENTIFIER);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public receiverType(): ReceiverTypeContext {
    const _localctx: ReceiverTypeContext = new ReceiverTypeContext(
      this._ctx,
      this.state,
    );
    this.enterRule(_localctx, 194, GoParser.RULE_receiverType);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 934;
        this.type_();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public eos(): EosContext {
    const _localctx: EosContext = new EosContext(this._ctx, this.state);
    this.enterRule(_localctx, 196, GoParser.RULE_eos);
    try {
      this.state = 940;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 103, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 936;
            this.match(GoParser.SEMI);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 937;
            this.match(GoParser.EOF);
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 938;
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 939;
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public sempred(
    _localctx: RuleContext,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 70:
        return this.expression_sempred(
          _localctx as ExpressionContext,
          predIndex,
        );

      case 71:
        return this.primaryExpr_sempred(
          _localctx as PrimaryExprContext,
          predIndex,
        );
    }
    return true;
  }

  private expression_sempred(
    _localctx: ExpressionContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 2:
        return this.precpred(this._ctx, 5);

      case 3:
        return this.precpred(this._ctx, 4);

      case 4:
        return this.precpred(this._ctx, 3);

      case 5:
        return this.precpred(this._ctx, 2);

      case 6:
        return this.precpred(this._ctx, 1);
    }
    return true;
  }
  private primaryExpr_sempred(
    _localctx: PrimaryExprContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 7:
        return this.precpred(this._ctx, 1);
    }
    return true;
  }

  private static readonly _serializedATNSegment0: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03U\u03B1\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04' +
    '\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04' +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    '\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044' +
    '\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04' +
    '=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04' +
    'F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04' +
    'O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04' +
    'X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t' +
    '`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x03\x02\x03\x02\x03\x02\x03\x02\x03' +
    '\x02\x07\x02\xCE\n\x02\f\x02\x0E\x02\xD1\v\x02\x03\x02\x03\x02\x03\x02' +
    '\x05\x02\xD6\n\x02\x03\x02\x03\x02\x07\x02\xDA\n\x02\f\x02\x0E\x02\xDD' +
    '\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04' +
    '\x03\x04\x03\x04\x03\x04\x07\x04\xEA\n\x04\f\x04\x0E\x04\xED\v\x04\x03' +
    '\x04\x05\x04\xF0\n\x04\x03\x05\x05\x05\xF3\n\x05\x03\x05\x03\x05\x03\x06' +
    '\x03\x06\x03\x07\x03\x07\x03\x07\x05\x07\xFC\n\x07\x03\b\x03\b\x03\b\x03' +
    '\b\x03\b\x03\b\x07\b\u0104\n\b\f\b\x0E\b\u0107\v\b\x03\b\x05\b\u010A\n' +
    '\b\x03\t\x03\t\x05\t\u010E\n\t\x03\t\x03\t\x05\t\u0112\n\t\x03\n\x03\n' +
    '\x03\n\x07\n\u0117\n\n\f\n\x0E\n\u011A\v\n\x03\v\x03\v\x03\v\x07\v\u011F' +
    '\n\v\f\v\x0E\v\u0122\v\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f\u012A' +
    '\n\f\f\f\x0E\f\u012D\v\f\x03\f\x05\f\u0130\n\f\x03\r\x03\r\x05\r\u0134' +
    '\n\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u013C\n\x0E\x03' +
    '\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\u0143\n\x0F\x03\x10\x03\x10' +
    '\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x07\x11\u014D\n\x11\f' +
    '\x11\x0E\x11\u0150\v\x11\x03\x11\x05\x11\u0153\n\x11\x03\x12\x03\x12\x03' +
    '\x12\x03\x12\x05\x12\u0159\n\x12\x03\x12\x03\x12\x05\x12\u015D\n\x12\x03' +
    '\x13\x03\x13\x05\x13\u0161\n\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14' +
    '\x06\x14\u0168\n\x14\r\x14\x0E\x14\u0169\x03\x15\x03\x15\x03\x15\x03\x15' +
    '\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15' +
    '\x03\x15\x03\x15\x05\x15\u017B\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03' +
    '\x16\x03\x16\x05\x16\u0183\n\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18' +
    '\x03\x18\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1B' +
    '\x05\x1B\u0193\n\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03' +
    '\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x05\x1F\u01A3' +
    '\n\x1F\x03 \x03 \x05 \u01A7\n \x03!\x03!\x05!\u01AB\n!\x03"\x03"\x03' +
    '"\x03#\x03#\x03$\x03$\x03$\x03%\x03%\x03%\x03%\x05%\u01B9\n%\x03%\x03' +
    '%\x03%\x03%\x03%\x05%\u01C0\n%\x05%\u01C2\n%\x03&\x03&\x05&\u01C6\n&\x03' +
    "'\x03'\x03'\x03'\x05'\u01CC\n'\x03'\x05'\u01CF\n'\x03'\x03'" +
    "\x07'\u01D3\n'\f'\x0E'\u01D6\v'\x03'\x03'\x03(\x03(\x03(\x05(\u01DD" +
    '\n(\x03)\x03)\x03)\x05)\u01E2\n)\x03*\x03*\x03*\x03*\x05*\u01E8\n*\x03' +
    '*\x03*\x03*\x07*\u01ED\n*\f*\x0E*\u01F0\v*\x03*\x03*\x03+\x03+\x05+\u01F6' +
    '\n+\x03+\x03+\x03+\x03+\x03+\x03+\x03,\x03,\x03,\x05,\u0201\n,\x03-\x03' +
    '-\x03-\x05-\u0206\n-\x03.\x03.\x05.\u020A\n.\x03.\x03.\x03.\x05.\u020F' +
    '\n.\x07.\u0211\n.\f.\x0E.\u0214\v.\x03/\x03/\x03/\x07/\u0219\n/\f/\x0E' +
    '/\u021C\v/\x03/\x03/\x030\x030\x030\x050\u0223\n0\x031\x031\x031\x051' +
    '\u0228\n1\x031\x051\u022B\n1\x032\x032\x032\x032\x032\x032\x052\u0233' +
    '\n2\x032\x032\x033\x033\x033\x033\x053\u023B\n3\x033\x033\x034\x054\u0240' +
    '\n4\x034\x034\x054\u0244\n4\x034\x034\x054\u0248\n4\x035\x035\x035\x03' +
    '5\x035\x035\x055\u0250\n5\x035\x035\x035\x036\x036\x036\x037\x037\x03' +
    '7\x037\x037\x037\x057\u025E\n7\x038\x038\x058\u0262\n8\x039\x039\x039' +
    '\x039\x039\x039\x039\x039\x059\u026C\n9\x03:\x03:\x03:\x03:\x03:\x03;' +
    '\x03;\x03<\x03<\x03=\x03=\x03=\x03>\x03>\x03>\x03>\x05>\u027E\n>\x03>' +
    '\x03>\x07>\u0282\n>\f>\x0E>\u0285\v>\x03>\x03>\x03?\x03?\x03?\x03?\x03' +
    '@\x03@\x03@\x03@\x03@\x03@\x03A\x03A\x03A\x03A\x03A\x05A\u0298\nA\x03' +
    'A\x03A\x03B\x03B\x03B\x03B\x03B\x03B\x03B\x05B\u02A3\nB\x03C\x03C\x03' +
    'C\x03D\x03D\x03D\x03D\x03D\x05D\u02AD\nD\x03E\x03E\x05E\u02B1\nE\x03F' +
    '\x03F\x03F\x03F\x07F\u02B7\nF\fF\x0EF\u02BA\vF\x03F\x05F\u02BD\nF\x05' +
    'F\u02BF\nF\x03F\x03F\x03G\x05G\u02C4\nG\x03G\x05G\u02C7\nG\x03G\x03G\x03' +
    'H\x03H\x03H\x05H\u02CE\nH\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03' +
    'H\x03H\x03H\x03H\x03H\x03H\x03H\x07H\u02DF\nH\fH\x0EH\u02E2\vH\x03I\x03' +
    'I\x03I\x03I\x05I\u02E8\nI\x03I\x03I\x03I\x03I\x03I\x03I\x03I\x05I\u02F1' +
    '\nI\x07I\u02F3\nI\fI\x0EI\u02F6\vI\x03J\x03J\x03J\x05J\u02FB\nJ\x03K\x03' +
    'K\x03K\x03K\x05K\u0301\nK\x03K\x03K\x03L\x03L\x03L\x03L\x03L\x03L\x05' +
    'L\u030B\nL\x03M\x03M\x03M\x05M\u0310\nM\x03N\x03N\x03N\x03N\x03N\x03N' +
    '\x05N\u0318\nN\x03O\x03O\x03P\x03P\x03P\x05P\u031F\nP\x03Q\x03Q\x03Q\x03' +
    'Q\x03R\x03R\x03R\x03S\x03S\x03S\x03S\x03S\x03S\x03S\x03S\x03S\x05S\u0331' +
    '\nS\x03T\x03T\x03T\x05T\u0336\nT\x05T\u0338\nT\x03T\x03T\x03U\x03U\x03' +
    'U\x07U\u033F\nU\fU\x0EU\u0342\vU\x03V\x03V\x03V\x05V\u0347\nV\x03V\x03' +
    'V\x03W\x03W\x03W\x05W\u034E\nW\x03X\x03X\x05X\u0352\nX\x03Y\x03Y\x03Y' +
    '\x03Y\x03Y\x07Y\u0359\nY\fY\x0EY\u035C\vY\x03Y\x03Y\x03Z\x03Z\x03Z\x03' +
    'Z\x03Z\x05Z\u0365\nZ\x03Z\x05Z\u0368\nZ\x03[\x03[\x03\\\x05\\\u036D\n' +
    '\\\x03\\\x03\\\x03]\x03]\x03]\x03]\x03^\x03^\x03^\x03^\x03_\x03_\x05_' +
    '\u037B\n_\x03_\x03_\x05_\u037F\n_\x03_\x05_\u0382\n_\x03_\x03_\x03_\x03' +
    '_\x03_\x05_\u0389\n_\x03_\x03_\x03`\x03`\x03`\x03`\x03`\x03a\x03a\x03' +
    'a\x03a\x03a\x05a\u0397\na\x05a\u0399\na\x03a\x05a\u039C\na\x03a\x05a\u039F' +
    '\na\x05a\u03A1\na\x03a\x03a\x03b\x03b\x03b\x03b\x03c\x03c\x03d\x03d\x03' +
    'd\x03d\x05d\u03AF\nd\x03d\x02\x02\x04\x8E\x90e\x02\x02\x04\x02\x06\x02' +
    '\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A' +
    '\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02' +
    '4\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02' +
    'P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02' +
    'l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84' +
    '\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96' +
    '\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8' +
    '\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA' +
    '\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\x02\v\x04\x02\x1D' +
    '\x1D((\x03\x02)*\x04\x025:<@\x04\x026:?@\x04\x0255<>\x03\x02/4\x03\x02' +
    ';A\x04\x02BEIJ\x03\x02PQ\x02\u03E8\x02\xC8\x03\x02\x02\x02\x04\xE0\x03' +
    '\x02\x02\x02\x06\xE3\x03\x02\x02\x02\b\xF2\x03\x02\x02\x02\n\xF6\x03\x02' +
    '\x02\x02\f\xFB\x03\x02\x02\x02\x0E\xFD\x03\x02\x02\x02\x10\u010B\x03\x02' +
    '\x02\x02\x12\u0113\x03\x02\x02\x02\x14\u011B\x03\x02\x02\x02\x16\u0123' +
    '\x03\x02\x02\x02\x18\u0131\x03\x02\x02\x02\x1A\u0137\x03\x02\x02\x02\x1C' +
    '\u013D\x03\x02\x02\x02\x1E\u0144\x03\x02\x02\x02 \u0146\x03\x02\x02\x02' +
    '"\u0154\x03\x02\x02\x02$\u015E\x03\x02\x02\x02&\u0167\x03\x02\x02\x02' +
    '(\u017A\x03\x02\x02\x02*\u0182\x03\x02\x02\x02,\u0184\x03\x02\x02\x02' +
    '.\u0186\x03\x02\x02\x020\u018A\x03\x02\x02\x022\u018D\x03\x02\x02\x02' +
    '4\u0192\x03\x02\x02\x026\u0196\x03\x02\x02\x028\u019A\x03\x02\x02\x02' +
    ':\u019C\x03\x02\x02\x02<\u01A0\x03\x02\x02\x02>\u01A4\x03\x02\x02\x02' +
    '@\u01A8\x03\x02\x02\x02B\u01AC\x03\x02\x02\x02D\u01AF\x03\x02\x02\x02' +
    'F\u01B1\x03\x02\x02\x02H\u01B4\x03\x02\x02\x02J\u01C5\x03\x02\x02\x02' +
    'L\u01C7\x03\x02\x02\x02N\u01D9\x03\x02\x02\x02P\u01E1\x03\x02\x02\x02' +
    'R\u01E3\x03\x02\x02\x02T\u01F5\x03\x02\x02\x02V\u01FD\x03\x02\x02\x02' +
    'X\u0205\x03\x02\x02\x02Z\u0209\x03\x02\x02\x02\\\u0215\x03\x02\x02\x02' +
    '^\u021F\x03\x02\x02\x02`\u022A\x03\x02\x02\x02b\u0232\x03\x02\x02\x02' +
    'd\u0236\x03\x02\x02\x02f\u023F\x03\x02\x02\x02h\u024F\x03\x02\x02\x02' +
    'j\u0254\x03\x02\x02\x02l\u025D\x03\x02\x02\x02n\u0261\x03\x02\x02\x02' +
    'p\u026B\x03\x02\x02\x02r\u026D\x03\x02\x02\x02t\u0272\x03\x02\x02\x02' +
    'v\u0274\x03\x02\x02\x02x\u0276\x03\x02\x02\x02z\u0279\x03\x02\x02\x02' +
    '|\u0288\x03\x02\x02\x02~\u028C\x03\x02\x02\x02\x80\u0297\x03\x02\x02\x02' +
    '\x82\u02A2\x03\x02\x02\x02\x84\u02A4\x03\x02\x02\x02\x86\u02AC\x03\x02' +
    '\x02\x02\x88\u02B0\x03\x02\x02\x02\x8A\u02B2\x03\x02\x02\x02\x8C\u02C3' +
    '\x03\x02\x02\x02\x8E\u02CD\x03\x02\x02\x02\x90\u02E7\x03\x02\x02\x02\x92' +
    '\u02FA\x03\x02\x02\x02\x94\u02FC\x03\x02\x02\x02\x96\u030A\x03\x02\x02' +
    '\x02\x98\u030F\x03\x02\x02\x02\x9A\u0317\x03\x02\x02\x02\x9C\u0319\x03' +
    '\x02\x02\x02\x9E\u031B\x03\x02\x02\x02\xA0\u0320\x03\x02\x02\x02\xA2\u0324' +
    '\x03\x02\x02\x02\xA4\u0330\x03\x02\x02\x02\xA6\u0332\x03\x02\x02\x02\xA8' +
    '\u033B\x03\x02\x02\x02\xAA\u0346\x03\x02\x02\x02\xAC\u034D\x03\x02\x02' +
    '\x02\xAE\u0351\x03\x02\x02\x02\xB0\u0353\x03\x02\x02\x02\xB2\u0364\x03' +
    '\x02\x02\x02\xB4\u0369\x03\x02\x02\x02\xB6\u036C\x03\x02\x02\x02\xB8\u0370' +
    '\x03\x02\x02\x02\xBA\u0374\x03\x02\x02\x02\xBC\u0378\x03\x02\x02\x02\xBE' +
    '\u038C\x03\x02\x02\x02\xC0\u0391\x03\x02\x02\x02\xC2\u03A4\x03\x02\x02' +
    '\x02\xC4\u03A8\x03\x02\x02\x02\xC6\u03AE\x03\x02\x02\x02\xC8\xC9\x05\x04' +
    '\x03\x02\xC9\xCF\x05\xC6d\x02\xCA\xCB\x05\x06\x04\x02\xCB\xCC\x05\xC6' +
    'd\x02\xCC\xCE\x03\x02\x02\x02\xCD\xCA\x03\x02\x02\x02\xCE\xD1\x03\x02' +
    '\x02\x02\xCF\xCD\x03\x02\x02\x02\xCF\xD0\x03\x02\x02\x02\xD0\xDB\x03\x02' +
    '\x02\x02\xD1\xCF\x03\x02\x02\x02\xD2\xD6\x05\x1A\x0E\x02\xD3\xD6\x05\x1C' +
    '\x0F\x02\xD4\xD6\x05\f\x07\x02\xD5\xD2\x03\x02\x02\x02\xD5\xD3\x03\x02' +
    '\x02\x02\xD5\xD4\x03\x02\x02\x02\xD6\xD7\x03\x02\x02\x02\xD7\xD8\x05\xC6' +
    'd\x02\xD8\xDA\x03\x02\x02\x02\xD9\xD5\x03\x02\x02\x02\xDA\xDD\x03\x02' +
    '\x02\x02\xDB\xD9\x03\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC\xDE\x03\x02' +
    '\x02\x02\xDD\xDB\x03\x02\x02\x02\xDE\xDF\x07\x02\x02\x03\xDF\x03\x03\x02' +
    '\x02\x02\xE0\xE1\x07\x10\x02\x02\xE1\xE2\x07\x1D\x02\x02\xE2\x05\x03\x02' +
    '\x02\x02\xE3\xEF\x07\x19\x02\x02\xE4\xF0\x05\b\x05\x02\xE5\xEB\x07\x1E' +
    '\x02\x02\xE6\xE7\x05\b\x05\x02\xE7\xE8\x05\xC6d\x02\xE8\xEA\x03\x02\x02' +
    '\x02\xE9\xE6\x03\x02\x02\x02\xEA\xED\x03\x02\x02\x02\xEB\xE9\x03\x02\x02' +
    '\x02\xEB\xEC\x03\x02\x02\x02\xEC\xEE\x03\x02\x02\x02\xED\xEB\x03\x02\x02' +
    '\x02\xEE\xF0\x07\x1F\x02\x02\xEF\xE4\x03\x02\x02\x02\xEF\xE5\x03\x02\x02' +
    '\x02\xF0\x07\x03\x02\x02\x02\xF1\xF3\t\x02\x02\x02\xF2\xF1\x03\x02\x02' +
    '\x02\xF2\xF3\x03\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4\xF5\x05\n\x06' +
    '\x02\xF5\t\x03\x02\x02\x02\xF6\xF7\x05\xB4[\x02\xF7\v\x03\x02\x02\x02' +
    '\xF8\xFC\x05\x0E\b\x02\xF9\xFC\x05\x16\f\x02\xFA\xFC\x05 \x11\x02\xFB' +
    '\xF8\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02\xFB\xFA\x03\x02\x02\x02\xFC' +
    '\r\x03\x02\x02\x02\xFD\u0109\x07\x12\x02\x02\xFE\u010A\x05\x10\t\x02\xFF' +
    '\u0105\x07\x1E\x02\x02\u0100\u0101\x05\x10\t\x02\u0101\u0102\x05\xC6d' +
    '\x02\u0102\u0104\x03\x02\x02\x02\u0103\u0100\x03\x02\x02\x02\u0104\u0107' +
    '\x03\x02\x02\x02\u0105\u0103\x03\x02\x02\x02\u0105\u0106\x03\x02\x02\x02' +
    '\u0106\u0108\x03\x02\x02\x02\u0107\u0105\x03\x02\x02\x02\u0108\u010A\x07' +
    '\x1F\x02\x02\u0109\xFE\x03\x02\x02\x02\u0109\xFF\x03\x02\x02\x02\u010A' +
    '\x0F\x03\x02\x02\x02\u010B\u0111\x05\x12\n\x02\u010C\u010E\x05l7\x02\u010D' +
    '\u010C\x03\x02\x02\x02\u010D\u010E\x03\x02\x02\x02\u010E\u010F\x03\x02' +
    '\x02\x02\u010F\u0110\x07$\x02\x02\u0110\u0112\x05\x14\v\x02\u0111\u010D' +
    '\x03\x02\x02\x02\u0111\u0112\x03\x02\x02\x02\u0112\x11\x03\x02\x02\x02' +
    '\u0113\u0118\x07\x1D\x02\x02\u0114\u0115\x07%\x02\x02\u0115\u0117\x07' +
    '\x1D\x02\x02\u0116\u0114\x03\x02\x02\x02\u0117\u011A\x03\x02\x02\x02\u0118' +
    '\u0116\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119\x13\x03\x02\x02' +
    '\x02\u011A\u0118\x03\x02\x02\x02\u011B\u0120\x05\x8EH\x02\u011C\u011D' +
    '\x07%\x02\x02\u011D\u011F\x05\x8EH\x02\u011E\u011C\x03\x02\x02\x02\u011F' +
    '\u0122\x03\x02\x02\x02\u0120\u011E\x03\x02\x02\x02\u0120\u0121\x03\x02' +
    '\x02\x02\u0121\x15\x03\x02\x02\x02\u0122\u0120\x03\x02\x02\x02\u0123\u012F' +
    '\x07\x16\x02\x02\u0124\u0130\x05\x18\r\x02\u0125\u012B\x07\x1E\x02\x02' +
    '\u0126\u0127\x05\x18\r\x02\u0127\u0128\x05\xC6d\x02\u0128\u012A\x03\x02' +
    '\x02\x02\u0129\u0126\x03\x02\x02\x02\u012A\u012D\x03\x02\x02\x02\u012B' +
    '\u0129\x03\x02\x02\x02\u012B\u012C\x03\x02\x02\x02\u012C\u012E\x03\x02' +
    '\x02\x02\u012D\u012B\x03\x02\x02\x02\u012E\u0130\x07\x1F\x02\x02\u012F' +
    '\u0124\x03\x02\x02\x02\u012F\u0125\x03\x02\x02\x02\u0130\x17\x03\x02\x02' +
    '\x02\u0131\u0133\x07\x1D\x02\x02\u0132\u0134\x07$\x02\x02\u0133\u0132' +
    '\x03\x02\x02\x02\u0133\u0134\x03\x02\x02\x02\u0134\u0135\x03\x02\x02\x02' +
    '\u0135\u0136\x05l7\x02\u0136\x19\x03\x02\x02\x02\u0137\u0138\x07\x05\x02' +
    '\x02\u0138\u0139\x07\x1D\x02\x02\u0139\u013B\x05\x86D\x02\u013A\u013C' +
    '\x05$\x13\x02\u013B\u013A\x03\x02\x02\x02\u013B\u013C\x03\x02\x02\x02' +
    '\u013C\x1B\x03\x02\x02\x02\u013D\u013E\x07\x05\x02\x02\u013E\u013F\x05' +
    '\x1E\x10\x02\u013F\u0140\x07\x1D\x02\x02\u0140\u0142\x05\x86D\x02\u0141' +
    '\u0143\x05$\x13\x02\u0142\u0141\x03\x02\x02\x02\u0142\u0143\x03\x02\x02' +
    '\x02\u0143\x1D\x03\x02\x02\x02\u0144\u0145\x05\x8AF\x02\u0145\x1F\x03' +
    '\x02\x02\x02\u0146\u0152\x07\x1B\x02\x02\u0147\u0153\x05"\x12\x02\u0148' +
    '\u014E\x07\x1E\x02\x02\u0149\u014A\x05"\x12\x02\u014A\u014B\x05\xC6d' +
    '\x02\u014B\u014D\x03\x02\x02\x02\u014C\u0149\x03\x02\x02\x02\u014D\u0150' +
    '\x03\x02\x02\x02\u014E\u014C\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02' +
    '\u014F\u0151\x03\x02\x02\x02\u0150\u014E\x03\x02\x02\x02\u0151\u0153\x07' +
    '\x1F\x02\x02\u0152\u0147\x03\x02\x02\x02\u0152\u0148\x03\x02\x02\x02\u0153' +
    '!\x03\x02\x02\x02\u0154\u015C\x05\x12\n\x02\u0155\u0158\x05l7\x02\u0156' +
    '\u0157\x07$\x02\x02\u0157\u0159\x05\x14\v\x02\u0158\u0156\x03\x02\x02' +
    '\x02\u0158\u0159\x03\x02\x02\x02\u0159\u015D\x03\x02\x02\x02\u015A\u015B' +
    '\x07$\x02\x02\u015B\u015D\x05\x14\v\x02\u015C\u0155\x03\x02\x02\x02\u015C' +
    '\u015A\x03\x02\x02\x02\u015D#\x03\x02\x02\x02\u015E\u0160\x07 \x02\x02' +
    '\u015F\u0161\x05&\x14\x02\u0160\u015F\x03\x02\x02\x02\u0160\u0161\x03' +
    '\x02\x02\x02\u0161\u0162\x03\x02\x02\x02\u0162\u0163\x07!\x02\x02\u0163' +
    '%\x03\x02\x02\x02\u0164\u0165\x05(\x15\x02\u0165\u0166\x05\xC6d\x02\u0166' +
    '\u0168\x03\x02\x02\x02\u0167\u0164\x03\x02\x02\x02\u0168\u0169\x03\x02' +
    '\x02\x02\u0169\u0167\x03\x02\x02\x02\u0169\u016A\x03\x02\x02\x02\u016A' +
    "'\x03\x02\x02\x02\u016B\u017B\x05\f\x07\x02\u016C\u017B\x05:\x1E\x02" +
    '\u016D\u017B\x05*\x16\x02\u016E\u017B\x05j6\x02\u016F\u017B\x05<\x1F\x02' +
    '\u0170\u017B\x05> \x02\u0171\u017B\x05@!\x02\u0172\u017B\x05B"\x02\u0173' +
    '\u017B\x05D#\x02\u0174\u017B\x05$\x13\x02\u0175\u017B\x05H%\x02\u0176' +
    '\u017B\x05J&\x02\u0177\u017B\x05\\/\x02\u0178\u017B\x05d3\x02\u0179\u017B' +
    '\x05F$\x02\u017A\u016B\x03\x02\x02\x02\u017A\u016C\x03\x02\x02\x02\u017A' +
    '\u016D\x03\x02\x02\x02\u017A\u016E\x03\x02\x02\x02\u017A\u016F\x03\x02' +
    '\x02\x02\u017A\u0170\x03\x02\x02\x02\u017A\u0171\x03\x02\x02\x02\u017A' +
    '\u0172\x03\x02\x02\x02\u017A\u0173\x03\x02\x02\x02\u017A\u0174\x03\x02' +
    '\x02\x02\u017A\u0175\x03\x02\x02\x02\u017A\u0176\x03\x02\x02\x02\u017A' +
    '\u0177\x03\x02\x02\x02\u017A\u0178\x03\x02\x02\x02\u017A\u0179\x03\x02' +
    '\x02\x02\u017B)\x03\x02\x02\x02\u017C\u0183\x05.\x18\x02\u017D\u0183\x05' +
    '0\x19\x02\u017E\u0183\x052\x1A\x02\u017F\u0183\x05,\x17\x02\u0180\u0183' +
    '\x056\x1C\x02\u0181\u0183\x058\x1D\x02\u0182\u017C\x03\x02\x02\x02\u0182' +
    '\u017D\x03\x02\x02\x02\u0182\u017E\x03\x02\x02\x02\u0182\u017F\x03\x02' +
    '\x02\x02\u0182\u0180\x03\x02\x02\x02\u0182\u0181\x03\x02\x02\x02\u0183' +
    '+\x03\x02\x02\x02\u0184\u0185\x05\x8EH\x02\u0185-\x03\x02\x02\x02\u0186' +
    '\u0187\x05\x8EH\x02\u0187\u0188\x07A\x02\x02\u0188\u0189\x05\x8EH\x02' +
    '\u0189/\x03\x02\x02\x02\u018A\u018B\x05\x8EH\x02\u018B\u018C\t\x03\x02' +
    '\x02\u018C1\x03\x02\x02\x02\u018D\u018E\x05\x14\v\x02\u018E\u018F\x05' +
    '4\x1B\x02\u018F\u0190\x05\x14\v\x02\u01903\x03\x02\x02\x02\u0191\u0193' +
    '\t\x04\x02\x02\u0192\u0191\x03\x02\x02\x02\u0192\u0193\x03\x02\x02\x02' +
    '\u0193\u0194\x03\x02\x02\x02\u0194\u0195\x07$\x02\x02\u01955\x03\x02\x02' +
    '\x02\u0196\u0197\x05\x12\n\x02\u0197\u0198\x07+\x02\x02\u0198\u0199\x05' +
    '\x14\v\x02\u01997\x03\x02\x02\x02\u019A\u019B\x07&\x02\x02\u019B9\x03' +
    "\x02\x02\x02\u019C\u019D\x07\x1D\x02\x02\u019D\u019E\x07'\x02\x02\u019E" +
    '\u019F\x05(\x15\x02\u019F;\x03\x02\x02\x02\u01A0\u01A2\x07\x1A\x02\x02' +
    '\u01A1\u01A3\x05\x14\v\x02\u01A2\u01A1\x03\x02\x02\x02\u01A2\u01A3\x03' +
    '\x02\x02\x02\u01A3=\x03\x02\x02\x02\u01A4\u01A6\x07\x03\x02\x02\u01A5' +
    '\u01A7\x07\x1D\x02\x02\u01A6\u01A5\x03\x02\x02\x02\u01A6\u01A7\x03\x02' +
    '\x02\x02\u01A7?\x03\x02\x02\x02\u01A8\u01AA\x07\x17\x02\x02\u01A9\u01AB' +
    '\x07\x1D\x02\x02\u01AA\u01A9\x03\x02\x02\x02\u01AA\u01AB\x03\x02\x02\x02' +
    '\u01ABA\x03\x02\x02\x02\u01AC\u01AD\x07\x0F\x02\x02\u01AD\u01AE\x07\x1D' +
    '\x02\x02\u01AEC\x03\x02\x02\x02\u01AF\u01B0\x07\x13\x02\x02\u01B0E\x03' +
    '\x02\x02\x02\u01B1\u01B2\x07\t\x02\x02\u01B2\u01B3\x05\x8EH\x02\u01B3' +
    'G\x03\x02\x02\x02\u01B4\u01B8\x07\x14\x02\x02\u01B5\u01B6\x05*\x16\x02' +
    '\u01B6\u01B7\x07&\x02\x02\u01B7\u01B9\x03\x02\x02\x02\u01B8\u01B5\x03' +
    '\x02\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BA\x03\x02\x02\x02\u01BA' +
    '\u01BB\x05\x8EH\x02\u01BB\u01C1\x05$\x13\x02\u01BC\u01BF\x07\x0E\x02\x02' +
    '\u01BD\u01C0\x05H%\x02\u01BE\u01C0\x05$\x13\x02\u01BF\u01BD\x03\x02\x02' +
    '\x02\u01BF\u01BE\x03\x02\x02\x02\u01C0\u01C2\x03\x02\x02\x02\u01C1\u01BC' +
    '\x03\x02\x02\x02\u01C1\u01C2\x03\x02\x02\x02\u01C2I\x03\x02\x02\x02\u01C3' +
    "\u01C6\x05L'\x02\u01C4\u01C6\x05R*\x02\u01C5\u01C3\x03\x02\x02\x02\u01C5" +
    '\u01C4\x03\x02\x02\x02\u01C6K\x03\x02\x02\x02\u01C7\u01CB\x07\x11\x02' +
    '\x02\u01C8\u01C9\x05*\x16\x02\u01C9\u01CA\x07&\x02\x02\u01CA\u01CC\x03' +
    '\x02\x02\x02\u01CB\u01C8\x03\x02\x02\x02\u01CB\u01CC\x03\x02\x02\x02\u01CC' +
    '\u01CE\x03\x02\x02\x02\u01CD\u01CF\x05\x8EH\x02\u01CE\u01CD\x03\x02\x02' +
    '\x02\u01CE\u01CF\x03\x02\x02\x02\u01CF\u01D0\x03\x02\x02\x02\u01D0\u01D4' +
    '\x07 \x02\x02\u01D1\u01D3\x05N(\x02\u01D2\u01D1\x03\x02\x02\x02\u01D3' +
    '\u01D6\x03\x02\x02\x02\u01D4\u01D2\x03\x02\x02\x02\u01D4\u01D5\x03\x02' +
    '\x02\x02\u01D5\u01D7\x03\x02\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D7' +
    '\u01D8\x07!\x02\x02\u01D8M\x03\x02\x02\x02\u01D9\u01DA\x05P)\x02\u01DA' +
    "\u01DC\x07'\x02\x02\u01DB\u01DD\x05&\x14\x02\u01DC\u01DB\x03\x02\x02" +
    '\x02\u01DC\u01DD\x03\x02\x02\x02\u01DDO\x03\x02\x02\x02\u01DE\u01DF\x07' +
    '\b\x02\x02\u01DF\u01E2\x05\x14\v\x02\u01E0\u01E2\x07\x04\x02\x02\u01E1' +
    '\u01DE\x03\x02\x02\x02\u01E1\u01E0\x03\x02\x02\x02\u01E2Q\x03\x02\x02' +
    '\x02\u01E3\u01E7\x07\x11\x02\x02\u01E4\u01E5\x05*\x16\x02\u01E5\u01E6' +
    '\x07&\x02\x02\u01E6\u01E8\x03\x02\x02\x02\u01E7\u01E4\x03\x02\x02\x02' +
    '\u01E7\u01E8\x03\x02\x02\x02\u01E8\u01E9\x03\x02\x02\x02\u01E9\u01EA\x05' +
    'T+\x02\u01EA\u01EE\x07 \x02\x02\u01EB\u01ED\x05V,\x02\u01EC\u01EB\x03' +
    '\x02\x02\x02\u01ED\u01F0\x03\x02\x02\x02\u01EE\u01EC\x03\x02\x02\x02\u01EE' +
    '\u01EF\x03\x02\x02\x02\u01EF\u01F1';
  private static readonly _serializedATNSegment1: string =
    '\x03\x02\x02\x02\u01F0\u01EE\x03\x02\x02\x02\u01F1\u01F2\x07!\x02\x02' +
    '\u01F2S\x03\x02\x02\x02\u01F3\u01F4\x07\x1D\x02\x02\u01F4\u01F6\x07+\x02' +
    '\x02\u01F5\u01F3\x03\x02\x02\x02\u01F5\u01F6\x03\x02\x02\x02\u01F6\u01F7' +
    '\x03\x02\x02\x02\u01F7\u01F8\x05\x90I\x02\u01F8\u01F9\x07(\x02\x02\u01F9' +
    '\u01FA\x07\x1E\x02\x02\u01FA\u01FB\x07\x16\x02\x02\u01FB\u01FC\x07\x1F' +
    '\x02\x02\u01FCU\x03\x02\x02\x02\u01FD\u01FE\x05X-\x02\u01FE\u0200\x07' +
    "'\x02\x02\u01FF\u0201\x05&\x14\x02\u0200\u01FF\x03\x02\x02\x02\u0200" +
    '\u0201\x03\x02\x02\x02\u0201W\x03\x02\x02\x02\u0202\u0203\x07\b\x02\x02' +
    '\u0203\u0206\x05Z.\x02\u0204\u0206\x07\x04\x02\x02\u0205\u0202\x03\x02' +
    '\x02\x02\u0205\u0204\x03\x02\x02\x02\u0206Y\x03\x02\x02\x02\u0207\u020A' +
    '\x05l7\x02\u0208\u020A\x07\x1C\x02\x02\u0209\u0207\x03\x02\x02\x02\u0209' +
    '\u0208\x03\x02\x02\x02\u020A\u0212\x03\x02\x02\x02\u020B\u020E\x07%\x02' +
    '\x02\u020C\u020F\x05l7\x02\u020D\u020F\x07\x1C\x02\x02\u020E\u020C\x03' +
    '\x02\x02\x02\u020E\u020D\x03\x02\x02\x02\u020F\u0211\x03\x02\x02\x02\u0210' +
    '\u020B\x03\x02\x02\x02\u0211\u0214\x03\x02\x02\x02\u0212\u0210\x03\x02' +
    '\x02\x02\u0212\u0213\x03\x02\x02\x02\u0213[\x03\x02\x02\x02\u0214\u0212' +
    '\x03\x02\x02\x02\u0215\u0216\x07\x07\x02\x02\u0216\u021A\x07 \x02\x02' +
    '\u0217\u0219\x05^0\x02\u0218\u0217\x03\x02\x02\x02\u0219\u021C\x03\x02' +
    '\x02\x02\u021A\u0218\x03\x02\x02\x02\u021A\u021B\x03\x02\x02\x02\u021B' +
    '\u021D\x03\x02\x02\x02\u021C\u021A\x03\x02\x02\x02\u021D\u021E\x07!\x02' +
    "\x02\u021E]\x03\x02\x02\x02\u021F\u0220\x05`1\x02\u0220\u0222\x07'\x02" +
    '\x02\u0221\u0223\x05&\x14\x02\u0222\u0221\x03\x02\x02\x02\u0222\u0223' +
    '\x03\x02\x02\x02\u0223_\x03\x02\x02\x02\u0224\u0227\x07\b\x02\x02\u0225' +
    '\u0228\x05.\x18\x02\u0226\u0228\x05b2\x02\u0227\u0225\x03\x02\x02\x02' +
    '\u0227\u0226\x03\x02\x02\x02\u0228\u022B\x03\x02\x02\x02\u0229\u022B\x07' +
    '\x04\x02\x02\u022A\u0224\x03\x02\x02\x02\u022A\u0229\x03\x02\x02\x02\u022B' +
    'a\x03\x02\x02\x02\u022C\u022D\x05\x14\v\x02\u022D\u022E\x07$\x02\x02\u022E' +
    '\u0233\x03\x02\x02\x02\u022F\u0230\x05\x12\n\x02\u0230\u0231\x07+\x02' +
    '\x02\u0231\u0233\x03\x02\x02\x02\u0232\u022C\x03\x02\x02\x02\u0232\u022F' +
    '\x03\x02\x02\x02\u0232\u0233\x03\x02\x02\x02\u0233\u0234\x03\x02\x02\x02' +
    '\u0234\u0235\x05\x8EH\x02\u0235c\x03\x02\x02\x02\u0236\u023A\x07\x18\x02' +
    '\x02\u0237\u023B\x05\x8EH\x02\u0238\u023B\x05f4\x02\u0239\u023B\x05h5' +
    '\x02\u023A\u0237\x03\x02\x02\x02\u023A\u0238\x03\x02\x02\x02\u023A\u0239' +
    '\x03\x02\x02\x02\u023A\u023B\x03\x02\x02\x02\u023B\u023C\x03\x02\x02\x02' +
    '\u023C\u023D\x05$\x13\x02\u023De\x03\x02\x02\x02\u023E\u0240\x05*\x16' +
    '\x02\u023F\u023E\x03\x02\x02\x02\u023F\u0240\x03\x02\x02\x02\u0240\u0241' +
    '\x03\x02\x02\x02\u0241\u0243\x07&\x02\x02\u0242\u0244\x05\x8EH\x02\u0243' +
    '\u0242\x03\x02\x02\x02\u0243\u0244\x03\x02\x02\x02\u0244\u0245\x03\x02' +
    '\x02\x02\u0245\u0247\x07&\x02\x02\u0246\u0248\x05*\x16\x02\u0247\u0246' +
    '\x03\x02\x02\x02\u0247\u0248\x03\x02\x02\x02\u0248g\x03\x02\x02\x02\u0249' +
    '\u024A\x05\x14\v\x02\u024A\u024B\x07$\x02\x02\u024B\u0250\x03\x02\x02' +
    '\x02\u024C\u024D\x05\x12\n\x02\u024D\u024E\x07+\x02\x02\u024E\u0250\x03' +
    '\x02\x02\x02\u024F\u0249\x03\x02\x02\x02\u024F\u024C\x03\x02\x02\x02\u024F' +
    '\u0250\x03\x02\x02\x02\u0250\u0251\x03\x02\x02\x02\u0251\u0252\x07\x15' +
    '\x02\x02\u0252\u0253\x05\x8EH\x02\u0253i\x03\x02\x02\x02\u0254\u0255\x07' +
    '\n\x02\x02\u0255\u0256\x05\x8EH\x02\u0256k\x03\x02\x02\x02\u0257\u025E' +
    '\x05n8\x02\u0258\u025E\x05p9\x02\u0259\u025A\x07\x1E\x02\x02\u025A\u025B' +
    '\x05l7\x02\u025B\u025C\x07\x1F\x02\x02\u025C\u025E\x03\x02\x02\x02\u025D' +
    '\u0257\x03\x02\x02\x02\u025D\u0258\x03\x02\x02\x02\u025D\u0259\x03\x02' +
    '\x02\x02\u025Em\x03\x02\x02\x02\u025F\u0262\x05\xA0Q\x02\u0260\u0262\x07' +
    '\x1D\x02\x02\u0261\u025F\x03\x02\x02\x02\u0261\u0260\x03\x02\x02\x02\u0262' +
    'o\x03\x02\x02\x02\u0263\u026C\x05r:\x02\u0264\u026C\x05\xB0Y\x02\u0265' +
    '\u026C\x05x=\x02\u0266\u026C\x05\x84C\x02\u0267\u026C\x05z>\x02\u0268' +
    '\u026C\x05|?\x02\u0269\u026C\x05~@\x02\u026A\u026C\x05\x80A\x02\u026B' +
    '\u0263\x03\x02\x02\x02\u026B\u0264\x03\x02\x02\x02\u026B\u0265\x03\x02' +
    '\x02\x02\u026B\u0266\x03\x02\x02\x02\u026B\u0267\x03\x02\x02\x02\u026B' +
    '\u0268\x03\x02\x02\x02\u026B\u0269\x03\x02\x02\x02\u026B\u026A\x03\x02' +
    '\x02\x02\u026Cq\x03\x02\x02\x02\u026D\u026E\x07"\x02\x02\u026E\u026F' +
    '\x05t;\x02\u026F\u0270\x07#\x02\x02\u0270\u0271\x05v<\x02\u0271s\x03\x02' +
    '\x02\x02\u0272\u0273\x05\x8EH\x02\u0273u\x03\x02\x02\x02\u0274\u0275\x05' +
    'l7\x02\u0275w\x03\x02\x02\x02\u0276\u0277\x07?\x02\x02\u0277\u0278\x05' +
    'l7\x02\u0278y\x03\x02\x02\x02\u0279\u027A\x07\x06\x02\x02\u027A\u0283' +
    '\x07 \x02\x02\u027B\u027E\x05\x82B\x02\u027C\u027E\x05n8\x02\u027D\u027B' +
    '\x03\x02\x02\x02\u027D\u027C\x03\x02\x02\x02\u027E\u027F\x03\x02\x02\x02' +
    '\u027F\u0280\x05\xC6d\x02\u0280\u0282\x03\x02\x02\x02\u0281\u027D\x03' +
    '\x02\x02\x02\u0282\u0285\x03\x02\x02\x02\u0283\u0281\x03\x02\x02\x02\u0283' +
    '\u0284\x03\x02\x02\x02\u0284\u0286\x03\x02\x02\x02\u0285\u0283\x03\x02' +
    '\x02\x02\u0286\u0287\x07!\x02\x02\u0287{\x03\x02\x02\x02\u0288\u0289\x07' +
    '"\x02\x02\u0289\u028A\x07#\x02\x02\u028A\u028B\x05v<\x02\u028B}\x03\x02' +
    '\x02\x02\u028C\u028D\x07\v\x02\x02\u028D\u028E\x07"\x02\x02\u028E\u028F' +
    '\x05l7\x02\u028F\u0290\x07#\x02\x02\u0290\u0291\x05v<\x02\u0291\x7F\x03' +
    '\x02\x02\x02\u0292\u0298\x07\r\x02\x02\u0293\u0294\x07\r\x02\x02\u0294' +
    '\u0298\x07A\x02\x02\u0295\u0296\x07A\x02\x02\u0296\u0298\x07\r\x02\x02' +
    '\u0297\u0292\x03\x02\x02\x02\u0297\u0293\x03\x02\x02\x02\u0297\u0295\x03' +
    '\x02\x02\x02\u0298\u0299\x03\x02\x02\x02\u0299\u029A\x05v<\x02\u029A\x81' +
    '\x03\x02\x02\x02\u029B\u029C\x06B\x02\x02\u029C\u029D\x07\x1D\x02\x02' +
    '\u029D\u029E\x05\x8AF\x02\u029E\u029F\x05\x88E\x02\u029F\u02A3\x03\x02' +
    '\x02\x02\u02A0\u02A1\x07\x1D\x02\x02\u02A1\u02A3\x05\x8AF\x02\u02A2\u029B' +
    '\x03\x02\x02\x02\u02A2\u02A0\x03\x02\x02\x02\u02A3\x83\x03\x02\x02\x02' +
    '\u02A4\u02A5\x07\x05\x02\x02\u02A5\u02A6\x05\x86D\x02\u02A6\x85\x03\x02' +
    '\x02\x02\u02A7\u02A8\x06D\x03\x02\u02A8\u02A9\x05\x8AF\x02\u02A9\u02AA' +
    '\x05\x88E\x02\u02AA\u02AD\x03\x02\x02\x02\u02AB\u02AD\x05\x8AF\x02\u02AC' +
    '\u02A7\x03\x02\x02\x02\u02AC\u02AB\x03\x02\x02\x02\u02AD\x87\x03\x02\x02' +
    '\x02\u02AE\u02B1\x05\x8AF\x02\u02AF\u02B1\x05l7\x02\u02B0\u02AE\x03\x02' +
    '\x02\x02\u02B0\u02AF\x03\x02\x02\x02\u02B1\x89\x03\x02\x02\x02\u02B2\u02BE' +
    '\x07\x1E\x02\x02\u02B3\u02B8\x05\x8CG\x02\u02B4\u02B5\x07%\x02\x02\u02B5' +
    '\u02B7\x05\x8CG\x02\u02B6\u02B4\x03\x02\x02\x02\u02B7\u02BA\x03\x02\x02' +
    '\x02\u02B8\u02B6\x03\x02\x02\x02\u02B8\u02B9\x03\x02\x02\x02\u02B9\u02BC' +
    '\x03\x02\x02\x02\u02BA\u02B8\x03\x02\x02\x02\u02BB\u02BD\x07%\x02\x02' +
    '\u02BC\u02BB\x03\x02\x02\x02\u02BC\u02BD\x03\x02\x02\x02\u02BD\u02BF\x03' +
    '\x02\x02\x02\u02BE\u02B3\x03\x02\x02\x02\u02BE\u02BF\x03\x02\x02\x02\u02BF' +
    '\u02C0\x03\x02\x02\x02\u02C0\u02C1\x07\x1F\x02\x02\u02C1\x8B\x03\x02\x02' +
    '\x02\u02C2\u02C4\x05\x12\n\x02\u02C3\u02C2\x03\x02\x02\x02\u02C3\u02C4' +
    '\x03\x02\x02\x02\u02C4\u02C6\x03\x02\x02\x02\u02C5\u02C7\x07,\x02\x02' +
    '\u02C6\u02C5\x03\x02\x02\x02\u02C6\u02C7\x03\x02\x02\x02\u02C7\u02C8\x03' +
    '\x02\x02\x02\u02C8\u02C9\x05l7\x02\u02C9\x8D\x03\x02\x02\x02\u02CA\u02CB' +
    '\bH\x01\x02\u02CB\u02CE\x05\x90I\x02\u02CC\u02CE\x05\x92J\x02\u02CD\u02CA' +
    '\x03\x02\x02\x02\u02CD\u02CC\x03\x02\x02\x02\u02CE\u02E0\x03\x02\x02\x02' +
    '\u02CF\u02D0\f\x07\x02\x02\u02D0\u02D1\t\x05\x02\x02\u02D1\u02DF\x05\x8E' +
    'H\b\u02D2\u02D3\f\x06\x02\x02\u02D3\u02D4\t\x06\x02\x02\u02D4\u02DF\x05' +
    '\x8EH\x07\u02D5\u02D6\f\x05\x02\x02\u02D6\u02D7\t\x07\x02\x02\u02D7\u02DF' +
    '\x05\x8EH\x06\u02D8\u02D9\f\x04\x02\x02\u02D9\u02DA\x07.\x02\x02\u02DA' +
    '\u02DF\x05\x8EH\x05\u02DB\u02DC\f\x03\x02\x02\u02DC\u02DD\x07-\x02\x02' +
    '\u02DD\u02DF\x05\x8EH\x04\u02DE\u02CF\x03\x02\x02\x02\u02DE\u02D2\x03' +
    '\x02\x02\x02\u02DE\u02D5\x03\x02\x02\x02\u02DE\u02D8\x03\x02\x02\x02\u02DE' +
    '\u02DB\x03\x02\x02\x02\u02DF\u02E2\x03\x02\x02\x02\u02E0\u02DE\x03\x02' +
    '\x02\x02\u02E0\u02E1\x03\x02\x02\x02\u02E1\x8F\x03\x02\x02\x02\u02E2\u02E0' +
    '\x03\x02\x02\x02\u02E3\u02E4\bI\x01\x02\u02E4\u02E8\x05\x96L\x02\u02E5' +
    '\u02E8\x05\x94K\x02\u02E6\u02E8\x05\xC2b\x02\u02E7\u02E3\x03\x02\x02\x02' +
    '\u02E7\u02E5\x03\x02\x02\x02\u02E7\u02E6\x03\x02\x02\x02\u02E8\u02F4\x03' +
    '\x02\x02\x02\u02E9\u02F0\f\x03\x02\x02\u02EA\u02EB\x07(\x02\x02\u02EB' +
    '\u02F1\x07\x1D\x02\x02\u02EC\u02F1\x05\xBA^\x02\u02ED\u02F1\x05\xBC_\x02' +
    '\u02EE\u02F1\x05\xBE`\x02\u02EF\u02F1\x05\xC0a\x02\u02F0\u02EA\x03\x02' +
    '\x02\x02\u02F0\u02EC\x03\x02\x02\x02\u02F0\u02ED\x03\x02\x02\x02\u02F0' +
    '\u02EE\x03\x02\x02\x02\u02F0\u02EF\x03\x02\x02\x02\u02F1\u02F3\x03\x02' +
    '\x02\x02\u02F2\u02E9\x03\x02\x02\x02\u02F3\u02F6\x03\x02\x02\x02\u02F4' +
    '\u02F2\x03\x02\x02\x02\u02F4\u02F5\x03\x02\x02\x02\u02F5\x91\x03\x02\x02' +
    '\x02\u02F6\u02F4\x03\x02\x02\x02\u02F7\u02FB\x05\x90I\x02\u02F8\u02F9' +
    '\t\b\x02\x02\u02F9\u02FB\x05\x8EH\x02\u02FA\u02F7\x03\x02\x02\x02\u02FA' +
    '\u02F8\x03\x02\x02\x02\u02FB\x93\x03\x02\x02\x02\u02FC\u02FD\x05l7\x02' +
    '\u02FD\u02FE\x07\x1E\x02\x02\u02FE\u0300\x05\x8EH\x02\u02FF\u0301\x07' +
    '%\x02\x02\u0300\u02FF\x03\x02\x02\x02\u0300\u0301\x03\x02\x02\x02\u0301' +
    '\u0302\x03\x02\x02\x02\u0302\u0303\x07\x1F\x02\x02\u0303\x95\x03\x02\x02' +
    '\x02\u0304\u030B\x05\x98M\x02\u0305\u030B\x05\x9EP\x02\u0306\u0307\x07' +
    '\x1E\x02\x02\u0307\u0308\x05\x8EH\x02\u0308\u0309\x07\x1F\x02\x02\u0309' +
    '\u030B\x03\x02\x02\x02\u030A\u0304\x03\x02\x02\x02\u030A\u0305\x03\x02' +
    '\x02\x02\u030A\u0306\x03\x02\x02\x02\u030B\x97\x03\x02\x02\x02\u030C\u0310' +
    '\x05\x9AN\x02\u030D\u0310\x05\xA2R\x02\u030E\u0310\x05\xB8]\x02\u030F' +
    '\u030C\x03\x02\x02\x02\u030F\u030D\x03\x02\x02\x02\u030F\u030E\x03\x02' +
    '\x02\x02\u0310\x99\x03\x02\x02\x02\u0311\u0318\x07\x1C\x02\x02\u0312\u0318' +
    '\x05\x9CO\x02\u0313\u0318\x05\xB4[\x02\u0314\u0318\x07F\x02\x02\u0315' +
    '\u0318\x07I\x02\x02\u0316\u0318\x07J\x02\x02\u0317\u0311\x03\x02\x02\x02' +
    '\u0317\u0312\x03\x02\x02\x02\u0317\u0313\x03\x02\x02\x02\u0317\u0314\x03' +
    '\x02\x02\x02\u0317\u0315\x03\x02\x02\x02\u0317\u0316\x03\x02\x02\x02\u0318' +
    '\x9B\x03\x02\x02\x02\u0319\u031A\t\t\x02\x02\u031A\x9D\x03\x02\x02\x02' +
    '\u031B\u031E\x07\x1D\x02\x02\u031C\u031D\x07(\x02\x02\u031D\u031F\x07' +
    '\x1D\x02\x02\u031E\u031C\x03\x02\x02\x02\u031E\u031F\x03\x02\x02\x02\u031F' +
    '\x9F\x03\x02\x02\x02\u0320\u0321\x07\x1D\x02\x02\u0321\u0322\x07(\x02' +
    '\x02\u0322\u0323\x07\x1D\x02\x02\u0323\xA1\x03\x02\x02\x02\u0324\u0325' +
    '\x05\xA4S\x02\u0325\u0326\x05\xA6T\x02\u0326\xA3\x03\x02\x02\x02\u0327' +
    '\u0331\x05\xB0Y\x02\u0328\u0331\x05r:\x02\u0329\u032A\x07"\x02\x02\u032A' +
    '\u032B\x07,\x02\x02\u032B\u032C\x07#\x02\x02\u032C\u0331\x05v<\x02\u032D' +
    '\u0331\x05|?\x02\u032E\u0331\x05~@\x02\u032F\u0331\x05n8\x02\u0330\u0327' +
    '\x03\x02\x02\x02\u0330\u0328\x03\x02\x02\x02\u0330\u0329\x03\x02\x02\x02' +
    '\u0330\u032D\x03\x02\x02\x02\u0330\u032E\x03\x02\x02\x02\u0330\u032F\x03' +
    '\x02\x02\x02\u0331\xA5\x03\x02\x02\x02\u0332\u0337\x07 \x02\x02\u0333' +
    '\u0335\x05\xA8U\x02\u0334\u0336\x07%\x02\x02\u0335\u0334\x03\x02\x02\x02' +
    '\u0335\u0336\x03\x02\x02\x02\u0336\u0338\x03\x02\x02\x02\u0337\u0333\x03' +
    '\x02\x02\x02\u0337\u0338\x03\x02\x02\x02\u0338\u0339\x03\x02\x02\x02\u0339' +
    '\u033A\x07!\x02\x02\u033A\xA7\x03\x02\x02\x02\u033B\u0340\x05\xAAV\x02' +
    '\u033C\u033D\x07%\x02\x02\u033D\u033F\x05\xAAV\x02\u033E\u033C\x03\x02' +
    '\x02\x02\u033F\u0342\x03\x02\x02\x02\u0340\u033E\x03\x02\x02\x02\u0340' +
    '\u0341\x03\x02\x02\x02\u0341\xA9\x03\x02\x02\x02\u0342\u0340\x03\x02\x02' +
    "\x02\u0343\u0344\x05\xACW\x02\u0344\u0345\x07'\x02\x02\u0345\u0347\x03" +
    '\x02\x02\x02\u0346\u0343\x03\x02\x02\x02\u0346\u0347\x03\x02\x02\x02\u0347' +
    '\u0348\x03\x02\x02\x02\u0348\u0349\x05\xAEX\x02\u0349\xAB\x03\x02\x02' +
    '\x02\u034A\u034E\x07\x1D\x02\x02\u034B\u034E\x05\x8EH\x02\u034C\u034E' +
    '\x05\xA6T\x02\u034D\u034A\x03\x02\x02\x02\u034D\u034B\x03\x02\x02\x02' +
    '\u034D\u034C\x03\x02\x02\x02\u034E\xAD\x03\x02\x02\x02\u034F\u0352\x05' +
    '\x8EH\x02\u0350\u0352\x05\xA6T\x02\u0351\u034F\x03\x02\x02\x02\u0351\u0350' +
    '\x03\x02\x02\x02\u0352\xAF\x03\x02\x02\x02\u0353\u0354\x07\f\x02\x02\u0354' +
    '\u035A\x07 \x02\x02\u0355\u0356\x05\xB2Z\x02\u0356\u0357\x05\xC6d\x02' +
    '\u0357\u0359\x03\x02\x02\x02\u0358\u0355\x03\x02\x02\x02\u0359\u035C\x03' +
    '\x02\x02\x02\u035A\u0358\x03\x02\x02\x02\u035A\u035B\x03\x02\x02\x02\u035B' +
    '\u035D\x03\x02\x02\x02\u035C\u035A\x03\x02\x02\x02\u035D\u035E\x07!\x02' +
    '\x02\u035E\xB1\x03\x02\x02\x02\u035F\u0360\x06Z\n\x02\u0360\u0361\x05' +
    '\x12\n\x02\u0361\u0362\x05l7\x02\u0362\u0365\x03\x02\x02\x02\u0363\u0365' +
    '\x05\xB6\\\x02\u0364\u035F\x03\x02\x02\x02\u0364\u0363\x03\x02\x02\x02' +
    '\u0365\u0367\x03\x02\x02\x02\u0366\u0368\x05\xB4[\x02\u0367\u0366\x03' +
    '\x02\x02\x02\u0367\u0368\x03\x02\x02\x02\u0368\xB3\x03\x02\x02\x02\u0369' +
    '\u036A\t\n\x02\x02\u036A\xB5\x03\x02\x02\x02\u036B\u036D\x07?\x02\x02' +
    '\u036C\u036B\x03\x02\x02\x02\u036C\u036D\x03\x02\x02\x02\u036D\u036E\x03' +
    '\x02\x02\x02\u036E\u036F\x05n8\x02\u036F\xB7\x03\x02\x02\x02\u0370\u0371' +
    '\x07\x05\x02\x02\u0371\u0372\x05\x86D\x02\u0372\u0373\x05$\x13\x02\u0373' +
    '\xB9\x03\x02\x02\x02\u0374\u0375\x07"\x02\x02\u0375\u0376\x05\x8EH\x02' +
    '\u0376\u0377\x07#\x02\x02\u0377\xBB\x03\x02\x02\x02\u0378\u0388\x07"' +
    '\x02\x02\u0379\u037B\x05\x8EH\x02\u037A\u0379\x03\x02\x02\x02\u037A\u037B' +
    "\x03\x02\x02\x02\u037B\u037C\x03\x02\x02\x02\u037C\u037E\x07'\x02\x02" +
    '\u037D\u037F\x05\x8EH\x02\u037E\u037D\x03\x02\x02\x02\u037E\u037F\x03' +
    '\x02\x02\x02\u037F\u0389\x03\x02\x02\x02\u0380\u0382\x05\x8EH\x02\u0381' +
    '\u0380\x03\x02\x02\x02\u0381\u0382\x03\x02\x02\x02\u0382\u0383\x03\x02' +
    "\x02\x02\u0383\u0384\x07'\x02\x02\u0384\u0385\x05\x8EH\x02\u0385\u0386" +
    "\x07'\x02\x02\u0386\u0387\x05\x8EH\x02\u0387\u0389\x03\x02\x02\x02\u0388" +
    '\u037A\x03\x02\x02\x02\u0388\u0381\x03\x02\x02\x02\u0389\u038A\x03\x02' +
    '\x02\x02\u038A\u038B\x07#\x02\x02\u038B\xBD\x03\x02\x02\x02\u038C\u038D' +
    '\x07(\x02\x02\u038D\u038E\x07\x1E\x02\x02\u038E\u038F\x05l7\x02\u038F' +
    '\u0390\x07\x1F\x02\x02\u0390\xBF\x03\x02\x02\x02\u0391\u03A0\x07\x1E\x02' +
    '\x02\u0392\u0399\x05\x14\v\x02\u0393\u0396\x05l7\x02\u0394\u0395\x07%' +
    '\x02\x02\u0395\u0397\x05\x14\v\x02\u0396\u0394\x03\x02\x02\x02\u0396\u0397' +
    '\x03\x02\x02\x02\u0397\u0399\x03\x02\x02\x02\u0398\u0392\x03\x02\x02\x02' +
    '\u0398\u0393\x03\x02\x02\x02\u0399\u039B\x03\x02\x02\x02\u039A\u039C\x07' +
    ',\x02\x02\u039B\u039A\x03\x02\x02\x02\u039B\u039C\x03\x02\x02\x02\u039C' +
    '\u039E\x03\x02\x02\x02\u039D\u039F\x07%\x02\x02\u039E\u039D\x03\x02\x02' +
    '\x02\u039E\u039F\x03\x02\x02\x02\u039F\u03A1\x03\x02\x02\x02\u03A0\u0398' +
    '\x03\x02\x02\x02\u03A0\u03A1\x03\x02\x02\x02\u03A1\u03A2\x03\x02\x02\x02' +
    '\u03A2\u03A3\x07\x1F\x02\x02\u03A3\xC1\x03\x02\x02\x02\u03A4\u03A5\x05' +
    '\xC4c\x02\u03A5\u03A6\x07(\x02\x02\u03A6\u03A7\x07\x1D\x02\x02\u03A7\xC3' +
    '\x03\x02\x02\x02\u03A8\u03A9\x05l7\x02\u03A9\xC5\x03\x02\x02\x02\u03AA' +
    '\u03AF\x07&\x02\x02\u03AB\u03AF\x07\x02\x02\x03\u03AC\u03AF\x06d\v\x02' +
    '\u03AD\u03AF\x06d\f\x02\u03AE\u03AA\x03\x02\x02\x02\u03AE\u03AB\x03\x02' +
    '\x02\x02\u03AE\u03AC\x03\x02\x02\x02\u03AE\u03AD\x03\x02\x02\x02\u03AF' +
    '\xC7\x03\x02\x02\x02j\xCF\xD5\xDB\xEB\xEF\xF2\xFB\u0105\u0109\u010D\u0111' +
    '\u0118\u0120\u012B\u012F\u0133\u013B\u0142\u014E\u0152\u0158\u015C\u0160' +
    '\u0169\u017A\u0182\u0192\u01A2\u01A6\u01AA\u01B8\u01BF\u01C1\u01C5\u01CB' +
    '\u01CE\u01D4\u01DC\u01E1\u01E7\u01EE\u01F5\u0200\u0205\u0209\u020E\u0212' +
    '\u021A\u0222\u0227\u022A\u0232\u023A\u023F\u0243\u0247\u024F\u025D\u0261' +
    '\u026B\u027D\u0283\u0297\u02A2\u02AC\u02B0\u02B8\u02BC\u02BE\u02C3\u02C6' +
    '\u02CD\u02DE\u02E0\u02E7\u02F0\u02F4\u02FA\u0300\u030A\u030F\u0317\u031E' +
    '\u0330\u0335\u0337\u0340\u0346\u034D\u0351\u035A\u0364\u0367\u036C\u037A' +
    '\u037E\u0381\u0388\u0396\u0398\u039B\u039E\u03A0\u03AE';
  public static readonly _serializedATN: string = Utils.join(
    [GoParser._serializedATNSegment0, GoParser._serializedATNSegment1],
    '',
  );
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!GoParser.__ATN) {
      GoParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(GoParser._serializedATN),
      );
    }

    return GoParser.__ATN;
  }
}

export class SourceFileContext extends ParserRuleContext {
  public packageClause(): PackageClauseContext {
    return this.getRuleContext(0, PackageClauseContext);
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  public EOF(): TerminalNode {
    return this.getToken(GoParser.EOF, 0);
  }
  public importDecl(): ImportDeclContext[];
  public importDecl(i: number): ImportDeclContext;
  public importDecl(i?: number): ImportDeclContext | ImportDeclContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ImportDeclContext);
    } else {
      return this.getRuleContext(i, ImportDeclContext);
    }
  }
  public functionDecl(): FunctionDeclContext[];
  public functionDecl(i: number): FunctionDeclContext;
  public functionDecl(i?: number): FunctionDeclContext | FunctionDeclContext[] {
    if (i === undefined) {
      return this.getRuleContexts(FunctionDeclContext);
    } else {
      return this.getRuleContext(i, FunctionDeclContext);
    }
  }
  public methodDecl(): MethodDeclContext[];
  public methodDecl(i: number): MethodDeclContext;
  public methodDecl(i?: number): MethodDeclContext | MethodDeclContext[] {
    if (i === undefined) {
      return this.getRuleContexts(MethodDeclContext);
    } else {
      return this.getRuleContext(i, MethodDeclContext);
    }
  }
  public declaration(): DeclarationContext[];
  public declaration(i: number): DeclarationContext;
  public declaration(i?: number): DeclarationContext | DeclarationContext[] {
    if (i === undefined) {
      return this.getRuleContexts(DeclarationContext);
    } else {
      return this.getRuleContext(i, DeclarationContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_sourceFile;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSourceFile) {
      return visitor.visitSourceFile(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PackageClauseContext extends ParserRuleContext {
  public _packageName!: Token;
  public PACKAGE(): TerminalNode {
    return this.getToken(GoParser.PACKAGE, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_packageClause;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitPackageClause) {
      return visitor.visitPackageClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ImportDeclContext extends ParserRuleContext {
  public IMPORT(): TerminalNode {
    return this.getToken(GoParser.IMPORT, 0);
  }
  public importSpec(): ImportSpecContext[];
  public importSpec(i: number): ImportSpecContext;
  public importSpec(i?: number): ImportSpecContext | ImportSpecContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ImportSpecContext);
    } else {
      return this.getRuleContext(i, ImportSpecContext);
    }
  }
  public L_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_PAREN, 0);
  }
  public R_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_PAREN, 0);
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_importDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitImportDecl) {
      return visitor.visitImportDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ImportSpecContext extends ParserRuleContext {
  public _alias!: Token;
  public importPath(): ImportPathContext {
    return this.getRuleContext(0, ImportPathContext);
  }
  public DOT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DOT, 0);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_importSpec;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitImportSpec) {
      return visitor.visitImportSpec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ImportPathContext extends ParserRuleContext {
  public string_(): String_Context {
    return this.getRuleContext(0, String_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_importPath;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitImportPath) {
      return visitor.visitImportPath(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeclarationContext extends ParserRuleContext {
  public constDecl(): ConstDeclContext | undefined {
    return this.tryGetRuleContext(0, ConstDeclContext);
  }
  public typeDecl(): TypeDeclContext | undefined {
    return this.tryGetRuleContext(0, TypeDeclContext);
  }
  public varDecl(): VarDeclContext | undefined {
    return this.tryGetRuleContext(0, VarDeclContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_declaration;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitDeclaration) {
      return visitor.visitDeclaration(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConstDeclContext extends ParserRuleContext {
  public CONST(): TerminalNode {
    return this.getToken(GoParser.CONST, 0);
  }
  public constSpec(): ConstSpecContext[];
  public constSpec(i: number): ConstSpecContext;
  public constSpec(i?: number): ConstSpecContext | ConstSpecContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ConstSpecContext);
    } else {
      return this.getRuleContext(i, ConstSpecContext);
    }
  }
  public L_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_PAREN, 0);
  }
  public R_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_PAREN, 0);
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_constDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitConstDecl) {
      return visitor.visitConstDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConstSpecContext extends ParserRuleContext {
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext);
  }
  public ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ASSIGN, 0);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  public type_(): Type_Context | undefined {
    return this.tryGetRuleContext(0, Type_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_constSpec;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitConstSpec) {
      return visitor.visitConstSpec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IdentifierListContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode[];
  public IDENTIFIER(i: number): TerminalNode;
  public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.IDENTIFIER);
    } else {
      return this.getToken(GoParser.IDENTIFIER, i);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COMMA);
    } else {
      return this.getToken(GoParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_identifierList;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitIdentifierList) {
      return visitor.visitIdentifierList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionListContext extends ParserRuleContext {
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COMMA);
    } else {
      return this.getToken(GoParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_expressionList;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExpressionList) {
      return visitor.visitExpressionList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeDeclContext extends ParserRuleContext {
  public TYPE(): TerminalNode {
    return this.getToken(GoParser.TYPE, 0);
  }
  public typeSpec(): TypeSpecContext[];
  public typeSpec(i: number): TypeSpecContext;
  public typeSpec(i?: number): TypeSpecContext | TypeSpecContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TypeSpecContext);
    } else {
      return this.getRuleContext(i, TypeSpecContext);
    }
  }
  public L_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_PAREN, 0);
  }
  public R_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_PAREN, 0);
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeDecl) {
      return visitor.visitTypeDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeSpecContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  public ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ASSIGN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeSpec;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeSpec) {
      return visitor.visitTypeSpec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionDeclContext extends ParserRuleContext {
  public FUNC(): TerminalNode {
    return this.getToken(GoParser.FUNC, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  public signature(): SignatureContext | undefined {
    return this.tryGetRuleContext(0, SignatureContext);
  }
  public block(): BlockContext | undefined {
    return this.tryGetRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_functionDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFunctionDecl) {
      return visitor.visitFunctionDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MethodDeclContext extends ParserRuleContext {
  public FUNC(): TerminalNode {
    return this.getToken(GoParser.FUNC, 0);
  }
  public receiver(): ReceiverContext {
    return this.getRuleContext(0, ReceiverContext);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  public signature(): SignatureContext | undefined {
    return this.tryGetRuleContext(0, SignatureContext);
  }
  public block(): BlockContext | undefined {
    return this.tryGetRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_methodDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitMethodDecl) {
      return visitor.visitMethodDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ReceiverContext extends ParserRuleContext {
  public parameters(): ParametersContext {
    return this.getRuleContext(0, ParametersContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_receiver;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitReceiver) {
      return visitor.visitReceiver(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class VarDeclContext extends ParserRuleContext {
  public VAR(): TerminalNode {
    return this.getToken(GoParser.VAR, 0);
  }
  public varSpec(): VarSpecContext[];
  public varSpec(i: number): VarSpecContext;
  public varSpec(i?: number): VarSpecContext | VarSpecContext[] {
    if (i === undefined) {
      return this.getRuleContexts(VarSpecContext);
    } else {
      return this.getRuleContext(i, VarSpecContext);
    }
  }
  public L_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_PAREN, 0);
  }
  public R_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_PAREN, 0);
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_varDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitVarDecl) {
      return visitor.visitVarDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class VarSpecContext extends ParserRuleContext {
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext);
  }
  public type_(): Type_Context | undefined {
    return this.tryGetRuleContext(0, Type_Context);
  }
  public ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ASSIGN, 0);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_varSpec;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitVarSpec) {
      return visitor.visitVarSpec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BlockContext extends ParserRuleContext {
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public statementList(): StatementListContext | undefined {
    return this.tryGetRuleContext(0, StatementListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_block;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitBlock) {
      return visitor.visitBlock(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StatementListContext extends ParserRuleContext {
  public statement(): StatementContext[];
  public statement(i: number): StatementContext;
  public statement(i?: number): StatementContext | StatementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(StatementContext);
    } else {
      return this.getRuleContext(i, StatementContext);
    }
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_statementList;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitStatementList) {
      return visitor.visitStatementList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StatementContext extends ParserRuleContext {
  public declaration(): DeclarationContext | undefined {
    return this.tryGetRuleContext(0, DeclarationContext);
  }
  public labeledStmt(): LabeledStmtContext | undefined {
    return this.tryGetRuleContext(0, LabeledStmtContext);
  }
  public simpleStmt(): SimpleStmtContext | undefined {
    return this.tryGetRuleContext(0, SimpleStmtContext);
  }
  public goStmt(): GoStmtContext | undefined {
    return this.tryGetRuleContext(0, GoStmtContext);
  }
  public returnStmt(): ReturnStmtContext | undefined {
    return this.tryGetRuleContext(0, ReturnStmtContext);
  }
  public breakStmt(): BreakStmtContext | undefined {
    return this.tryGetRuleContext(0, BreakStmtContext);
  }
  public continueStmt(): ContinueStmtContext | undefined {
    return this.tryGetRuleContext(0, ContinueStmtContext);
  }
  public gotoStmt(): GotoStmtContext | undefined {
    return this.tryGetRuleContext(0, GotoStmtContext);
  }
  public fallthroughStmt(): FallthroughStmtContext | undefined {
    return this.tryGetRuleContext(0, FallthroughStmtContext);
  }
  public block(): BlockContext | undefined {
    return this.tryGetRuleContext(0, BlockContext);
  }
  public ifStmt(): IfStmtContext | undefined {
    return this.tryGetRuleContext(0, IfStmtContext);
  }
  public switchStmt(): SwitchStmtContext | undefined {
    return this.tryGetRuleContext(0, SwitchStmtContext);
  }
  public selectStmt(): SelectStmtContext | undefined {
    return this.tryGetRuleContext(0, SelectStmtContext);
  }
  public forStmt(): ForStmtContext | undefined {
    return this.tryGetRuleContext(0, ForStmtContext);
  }
  public deferStmt(): DeferStmtContext | undefined {
    return this.tryGetRuleContext(0, DeferStmtContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_statement;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitStatement) {
      return visitor.visitStatement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SimpleStmtContext extends ParserRuleContext {
  public sendStmt(): SendStmtContext | undefined {
    return this.tryGetRuleContext(0, SendStmtContext);
  }
  public incDecStmt(): IncDecStmtContext | undefined {
    return this.tryGetRuleContext(0, IncDecStmtContext);
  }
  public assignment(): AssignmentContext | undefined {
    return this.tryGetRuleContext(0, AssignmentContext);
  }
  public expressionStmt(): ExpressionStmtContext | undefined {
    return this.tryGetRuleContext(0, ExpressionStmtContext);
  }
  public shortVarDecl(): ShortVarDeclContext | undefined {
    return this.tryGetRuleContext(0, ShortVarDeclContext);
  }
  public emptyStmt(): EmptyStmtContext | undefined {
    return this.tryGetRuleContext(0, EmptyStmtContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_simpleStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSimpleStmt) {
      return visitor.visitSimpleStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionStmtContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_expressionStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExpressionStmt) {
      return visitor.visitExpressionStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SendStmtContext extends ParserRuleContext {
  public _channel!: ExpressionContext;
  public RECEIVE(): TerminalNode {
    return this.getToken(GoParser.RECEIVE, 0);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_sendStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSendStmt) {
      return visitor.visitSendStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IncDecStmtContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public PLUS_PLUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.PLUS_PLUS, 0);
  }
  public MINUS_MINUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.MINUS_MINUS, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_incDecStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitIncDecStmt) {
      return visitor.visitIncDecStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class AssignmentContext extends ParserRuleContext {
  public expressionList(): ExpressionListContext[];
  public expressionList(i: number): ExpressionListContext;
  public expressionList(
    i?: number,
  ): ExpressionListContext | ExpressionListContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionListContext);
    } else {
      return this.getRuleContext(i, ExpressionListContext);
    }
  }
  public assign_op(): Assign_opContext {
    return this.getRuleContext(0, Assign_opContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_assignment;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitAssignment) {
      return visitor.visitAssignment(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Assign_opContext extends ParserRuleContext {
  public ASSIGN(): TerminalNode {
    return this.getToken(GoParser.ASSIGN, 0);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.MINUS, 0);
  }
  public OR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.OR, 0);
  }
  public CARET(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CARET, 0);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.STAR, 0);
  }
  public DIV(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DIV, 0);
  }
  public MOD(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.MOD, 0);
  }
  public LSHIFT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.LSHIFT, 0);
  }
  public RSHIFT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RSHIFT, 0);
  }
  public AMPERSAND(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.AMPERSAND, 0);
  }
  public BIT_CLEAR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.BIT_CLEAR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_assign_op;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitAssign_op) {
      return visitor.visitAssign_op(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ShortVarDeclContext extends ParserRuleContext {
  public identifierList(): IdentifierListContext {
    return this.getRuleContext(0, IdentifierListContext);
  }
  public DECLARE_ASSIGN(): TerminalNode {
    return this.getToken(GoParser.DECLARE_ASSIGN, 0);
  }
  public expressionList(): ExpressionListContext {
    return this.getRuleContext(0, ExpressionListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_shortVarDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitShortVarDecl) {
      return visitor.visitShortVarDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EmptyStmtContext extends ParserRuleContext {
  public SEMI(): TerminalNode {
    return this.getToken(GoParser.SEMI, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_emptyStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitEmptyStmt) {
      return visitor.visitEmptyStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LabeledStmtContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  public COLON(): TerminalNode {
    return this.getToken(GoParser.COLON, 0);
  }
  public statement(): StatementContext {
    return this.getRuleContext(0, StatementContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_labeledStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitLabeledStmt) {
      return visitor.visitLabeledStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ReturnStmtContext extends ParserRuleContext {
  public RETURN(): TerminalNode {
    return this.getToken(GoParser.RETURN, 0);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_returnStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitReturnStmt) {
      return visitor.visitReturnStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BreakStmtContext extends ParserRuleContext {
  public BREAK(): TerminalNode {
    return this.getToken(GoParser.BREAK, 0);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_breakStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitBreakStmt) {
      return visitor.visitBreakStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ContinueStmtContext extends ParserRuleContext {
  public CONTINUE(): TerminalNode {
    return this.getToken(GoParser.CONTINUE, 0);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_continueStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitContinueStmt) {
      return visitor.visitContinueStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class GotoStmtContext extends ParserRuleContext {
  public GOTO(): TerminalNode {
    return this.getToken(GoParser.GOTO, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_gotoStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitGotoStmt) {
      return visitor.visitGotoStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FallthroughStmtContext extends ParserRuleContext {
  public FALLTHROUGH(): TerminalNode {
    return this.getToken(GoParser.FALLTHROUGH, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_fallthroughStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFallthroughStmt) {
      return visitor.visitFallthroughStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DeferStmtContext extends ParserRuleContext {
  public DEFER(): TerminalNode {
    return this.getToken(GoParser.DEFER, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_deferStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitDeferStmt) {
      return visitor.visitDeferStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IfStmtContext extends ParserRuleContext {
  public IF(): TerminalNode {
    return this.getToken(GoParser.IF, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public block(): BlockContext[];
  public block(i: number): BlockContext;
  public block(i?: number): BlockContext | BlockContext[] {
    if (i === undefined) {
      return this.getRuleContexts(BlockContext);
    } else {
      return this.getRuleContext(i, BlockContext);
    }
  }
  public simpleStmt(): SimpleStmtContext | undefined {
    return this.tryGetRuleContext(0, SimpleStmtContext);
  }
  public SEMI(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.SEMI, 0);
  }
  public ELSE(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ELSE, 0);
  }
  public ifStmt(): IfStmtContext | undefined {
    return this.tryGetRuleContext(0, IfStmtContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_ifStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitIfStmt) {
      return visitor.visitIfStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SwitchStmtContext extends ParserRuleContext {
  public exprSwitchStmt(): ExprSwitchStmtContext | undefined {
    return this.tryGetRuleContext(0, ExprSwitchStmtContext);
  }
  public typeSwitchStmt(): TypeSwitchStmtContext | undefined {
    return this.tryGetRuleContext(0, TypeSwitchStmtContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_switchStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSwitchStmt) {
      return visitor.visitSwitchStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExprSwitchStmtContext extends ParserRuleContext {
  public SWITCH(): TerminalNode {
    return this.getToken(GoParser.SWITCH, 0);
  }
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public simpleStmt(): SimpleStmtContext | undefined {
    return this.tryGetRuleContext(0, SimpleStmtContext);
  }
  public SEMI(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.SEMI, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public exprCaseClause(): ExprCaseClauseContext[];
  public exprCaseClause(i: number): ExprCaseClauseContext;
  public exprCaseClause(
    i?: number,
  ): ExprCaseClauseContext | ExprCaseClauseContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExprCaseClauseContext);
    } else {
      return this.getRuleContext(i, ExprCaseClauseContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_exprSwitchStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExprSwitchStmt) {
      return visitor.visitExprSwitchStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExprCaseClauseContext extends ParserRuleContext {
  public exprSwitchCase(): ExprSwitchCaseContext {
    return this.getRuleContext(0, ExprSwitchCaseContext);
  }
  public COLON(): TerminalNode {
    return this.getToken(GoParser.COLON, 0);
  }
  public statementList(): StatementListContext | undefined {
    return this.tryGetRuleContext(0, StatementListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_exprCaseClause;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExprCaseClause) {
      return visitor.visitExprCaseClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExprSwitchCaseContext extends ParserRuleContext {
  public CASE(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CASE, 0);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  public DEFAULT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DEFAULT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_exprSwitchCase;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExprSwitchCase) {
      return visitor.visitExprSwitchCase(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeSwitchStmtContext extends ParserRuleContext {
  public SWITCH(): TerminalNode {
    return this.getToken(GoParser.SWITCH, 0);
  }
  public typeSwitchGuard(): TypeSwitchGuardContext {
    return this.getRuleContext(0, TypeSwitchGuardContext);
  }
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public simpleStmt(): SimpleStmtContext | undefined {
    return this.tryGetRuleContext(0, SimpleStmtContext);
  }
  public SEMI(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.SEMI, 0);
  }
  public typeCaseClause(): TypeCaseClauseContext[];
  public typeCaseClause(i: number): TypeCaseClauseContext;
  public typeCaseClause(
    i?: number,
  ): TypeCaseClauseContext | TypeCaseClauseContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TypeCaseClauseContext);
    } else {
      return this.getRuleContext(i, TypeCaseClauseContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeSwitchStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeSwitchStmt) {
      return visitor.visitTypeSwitchStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeSwitchGuardContext extends ParserRuleContext {
  public primaryExpr(): PrimaryExprContext {
    return this.getRuleContext(0, PrimaryExprContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0);
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0);
  }
  public TYPE(): TerminalNode {
    return this.getToken(GoParser.TYPE, 0);
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  public DECLARE_ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DECLARE_ASSIGN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeSwitchGuard;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeSwitchGuard) {
      return visitor.visitTypeSwitchGuard(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeCaseClauseContext extends ParserRuleContext {
  public typeSwitchCase(): TypeSwitchCaseContext {
    return this.getRuleContext(0, TypeSwitchCaseContext);
  }
  public COLON(): TerminalNode {
    return this.getToken(GoParser.COLON, 0);
  }
  public statementList(): StatementListContext | undefined {
    return this.tryGetRuleContext(0, StatementListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeCaseClause;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeCaseClause) {
      return visitor.visitTypeCaseClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeSwitchCaseContext extends ParserRuleContext {
  public CASE(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CASE, 0);
  }
  public typeList(): TypeListContext | undefined {
    return this.tryGetRuleContext(0, TypeListContext);
  }
  public DEFAULT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DEFAULT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeSwitchCase;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeSwitchCase) {
      return visitor.visitTypeSwitchCase(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeListContext extends ParserRuleContext {
  public type_(): Type_Context[];
  public type_(i: number): Type_Context;
  public type_(i?: number): Type_Context | Type_Context[] {
    if (i === undefined) {
      return this.getRuleContexts(Type_Context);
    } else {
      return this.getRuleContext(i, Type_Context);
    }
  }
  public NIL_LIT(): TerminalNode[];
  public NIL_LIT(i: number): TerminalNode;
  public NIL_LIT(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.NIL_LIT);
    } else {
      return this.getToken(GoParser.NIL_LIT, i);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COMMA);
    } else {
      return this.getToken(GoParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeList;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeList) {
      return visitor.visitTypeList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SelectStmtContext extends ParserRuleContext {
  public SELECT(): TerminalNode {
    return this.getToken(GoParser.SELECT, 0);
  }
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public commClause(): CommClauseContext[];
  public commClause(i: number): CommClauseContext;
  public commClause(i?: number): CommClauseContext | CommClauseContext[] {
    if (i === undefined) {
      return this.getRuleContexts(CommClauseContext);
    } else {
      return this.getRuleContext(i, CommClauseContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_selectStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSelectStmt) {
      return visitor.visitSelectStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CommClauseContext extends ParserRuleContext {
  public commCase(): CommCaseContext {
    return this.getRuleContext(0, CommCaseContext);
  }
  public COLON(): TerminalNode {
    return this.getToken(GoParser.COLON, 0);
  }
  public statementList(): StatementListContext | undefined {
    return this.tryGetRuleContext(0, StatementListContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_commClause;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitCommClause) {
      return visitor.visitCommClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CommCaseContext extends ParserRuleContext {
  public CASE(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CASE, 0);
  }
  public sendStmt(): SendStmtContext | undefined {
    return this.tryGetRuleContext(0, SendStmtContext);
  }
  public recvStmt(): RecvStmtContext | undefined {
    return this.tryGetRuleContext(0, RecvStmtContext);
  }
  public DEFAULT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DEFAULT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_commCase;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitCommCase) {
      return visitor.visitCommCase(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class RecvStmtContext extends ParserRuleContext {
  public _recvExpr!: ExpressionContext;
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  public ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ASSIGN, 0);
  }
  public identifierList(): IdentifierListContext | undefined {
    return this.tryGetRuleContext(0, IdentifierListContext);
  }
  public DECLARE_ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DECLARE_ASSIGN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_recvStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitRecvStmt) {
      return visitor.visitRecvStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ForStmtContext extends ParserRuleContext {
  public FOR(): TerminalNode {
    return this.getToken(GoParser.FOR, 0);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public forClause(): ForClauseContext | undefined {
    return this.tryGetRuleContext(0, ForClauseContext);
  }
  public rangeClause(): RangeClauseContext | undefined {
    return this.tryGetRuleContext(0, RangeClauseContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_forStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitForStmt) {
      return visitor.visitForStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ForClauseContext extends ParserRuleContext {
  public _initStmt!: SimpleStmtContext;
  public _postStmt!: SimpleStmtContext;
  public SEMI(): TerminalNode[];
  public SEMI(i: number): TerminalNode;
  public SEMI(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.SEMI);
    } else {
      return this.getToken(GoParser.SEMI, i);
    }
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public simpleStmt(): SimpleStmtContext[];
  public simpleStmt(i: number): SimpleStmtContext;
  public simpleStmt(i?: number): SimpleStmtContext | SimpleStmtContext[] {
    if (i === undefined) {
      return this.getRuleContexts(SimpleStmtContext);
    } else {
      return this.getRuleContext(i, SimpleStmtContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_forClause;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitForClause) {
      return visitor.visitForClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class RangeClauseContext extends ParserRuleContext {
  public RANGE(): TerminalNode {
    return this.getToken(GoParser.RANGE, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  public ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ASSIGN, 0);
  }
  public identifierList(): IdentifierListContext | undefined {
    return this.tryGetRuleContext(0, IdentifierListContext);
  }
  public DECLARE_ASSIGN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DECLARE_ASSIGN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_rangeClause;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitRangeClause) {
      return visitor.visitRangeClause(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class GoStmtContext extends ParserRuleContext {
  public GO(): TerminalNode {
    return this.getToken(GoParser.GO, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_goStmt;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitGoStmt) {
      return visitor.visitGoStmt(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Type_Context extends ParserRuleContext {
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  public typeLit(): TypeLitContext | undefined {
    return this.tryGetRuleContext(0, TypeLitContext);
  }
  public L_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_PAREN, 0);
  }
  public type_(): Type_Context | undefined {
    return this.tryGetRuleContext(0, Type_Context);
  }
  public R_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_PAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_type_;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitType_) {
      return visitor.visitType_(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeNameContext extends ParserRuleContext {
  public qualifiedIdent(): QualifiedIdentContext | undefined {
    return this.tryGetRuleContext(0, QualifiedIdentContext);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeName;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeName) {
      return visitor.visitTypeName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeLitContext extends ParserRuleContext {
  public arrayType(): ArrayTypeContext | undefined {
    return this.tryGetRuleContext(0, ArrayTypeContext);
  }
  public structType(): StructTypeContext | undefined {
    return this.tryGetRuleContext(0, StructTypeContext);
  }
  public pointerType(): PointerTypeContext | undefined {
    return this.tryGetRuleContext(0, PointerTypeContext);
  }
  public functionType(): FunctionTypeContext | undefined {
    return this.tryGetRuleContext(0, FunctionTypeContext);
  }
  public interfaceType(): InterfaceTypeContext | undefined {
    return this.tryGetRuleContext(0, InterfaceTypeContext);
  }
  public sliceType(): SliceTypeContext | undefined {
    return this.tryGetRuleContext(0, SliceTypeContext);
  }
  public mapType(): MapTypeContext | undefined {
    return this.tryGetRuleContext(0, MapTypeContext);
  }
  public channelType(): ChannelTypeContext | undefined {
    return this.tryGetRuleContext(0, ChannelTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeLit;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeLit) {
      return visitor.visitTypeLit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ArrayTypeContext extends ParserRuleContext {
  public L_BRACKET(): TerminalNode {
    return this.getToken(GoParser.L_BRACKET, 0);
  }
  public arrayLength(): ArrayLengthContext {
    return this.getRuleContext(0, ArrayLengthContext);
  }
  public R_BRACKET(): TerminalNode {
    return this.getToken(GoParser.R_BRACKET, 0);
  }
  public elementType(): ElementTypeContext {
    return this.getRuleContext(0, ElementTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_arrayType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitArrayType) {
      return visitor.visitArrayType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ArrayLengthContext extends ParserRuleContext {
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_arrayLength;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitArrayLength) {
      return visitor.visitArrayLength(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ElementTypeContext extends ParserRuleContext {
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_elementType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitElementType) {
      return visitor.visitElementType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PointerTypeContext extends ParserRuleContext {
  public STAR(): TerminalNode {
    return this.getToken(GoParser.STAR, 0);
  }
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_pointerType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitPointerType) {
      return visitor.visitPointerType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class InterfaceTypeContext extends ParserRuleContext {
  public INTERFACE(): TerminalNode {
    return this.getToken(GoParser.INTERFACE, 0);
  }
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  public methodSpec(): MethodSpecContext[];
  public methodSpec(i: number): MethodSpecContext;
  public methodSpec(i?: number): MethodSpecContext | MethodSpecContext[] {
    if (i === undefined) {
      return this.getRuleContexts(MethodSpecContext);
    } else {
      return this.getRuleContext(i, MethodSpecContext);
    }
  }
  public typeName(): TypeNameContext[];
  public typeName(i: number): TypeNameContext;
  public typeName(i?: number): TypeNameContext | TypeNameContext[] {
    if (i === undefined) {
      return this.getRuleContexts(TypeNameContext);
    } else {
      return this.getRuleContext(i, TypeNameContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_interfaceType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitInterfaceType) {
      return visitor.visitInterfaceType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SliceTypeContext extends ParserRuleContext {
  public L_BRACKET(): TerminalNode {
    return this.getToken(GoParser.L_BRACKET, 0);
  }
  public R_BRACKET(): TerminalNode {
    return this.getToken(GoParser.R_BRACKET, 0);
  }
  public elementType(): ElementTypeContext {
    return this.getRuleContext(0, ElementTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_sliceType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSliceType) {
      return visitor.visitSliceType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MapTypeContext extends ParserRuleContext {
  public MAP(): TerminalNode {
    return this.getToken(GoParser.MAP, 0);
  }
  public L_BRACKET(): TerminalNode {
    return this.getToken(GoParser.L_BRACKET, 0);
  }
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  public R_BRACKET(): TerminalNode {
    return this.getToken(GoParser.R_BRACKET, 0);
  }
  public elementType(): ElementTypeContext {
    return this.getRuleContext(0, ElementTypeContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_mapType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitMapType) {
      return visitor.visitMapType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ChannelTypeContext extends ParserRuleContext {
  public elementType(): ElementTypeContext {
    return this.getRuleContext(0, ElementTypeContext);
  }
  public CHAN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CHAN, 0);
  }
  public RECEIVE(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RECEIVE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_channelType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitChannelType) {
      return visitor.visitChannelType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MethodSpecContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  public parameters(): ParametersContext {
    return this.getRuleContext(0, ParametersContext);
  }
  public result(): ResultContext | undefined {
    return this.tryGetRuleContext(0, ResultContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_methodSpec;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitMethodSpec) {
      return visitor.visitMethodSpec(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionTypeContext extends ParserRuleContext {
  public FUNC(): TerminalNode {
    return this.getToken(GoParser.FUNC, 0);
  }
  public signature(): SignatureContext {
    return this.getRuleContext(0, SignatureContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_functionType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFunctionType) {
      return visitor.visitFunctionType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SignatureContext extends ParserRuleContext {
  public parameters(): ParametersContext {
    return this.getRuleContext(0, ParametersContext);
  }
  public result(): ResultContext | undefined {
    return this.tryGetRuleContext(0, ResultContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_signature;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSignature) {
      return visitor.visitSignature(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ResultContext extends ParserRuleContext {
  public parameters(): ParametersContext | undefined {
    return this.tryGetRuleContext(0, ParametersContext);
  }
  public type_(): Type_Context | undefined {
    return this.tryGetRuleContext(0, Type_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_result;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitResult) {
      return visitor.visitResult(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParametersContext extends ParserRuleContext {
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0);
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0);
  }
  public parameterDecl(): ParameterDeclContext[];
  public parameterDecl(i: number): ParameterDeclContext;
  public parameterDecl(
    i?: number,
  ): ParameterDeclContext | ParameterDeclContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ParameterDeclContext);
    } else {
      return this.getRuleContext(i, ParameterDeclContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COMMA);
    } else {
      return this.getToken(GoParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_parameters;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitParameters) {
      return visitor.visitParameters(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ParameterDeclContext extends ParserRuleContext {
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  public identifierList(): IdentifierListContext | undefined {
    return this.tryGetRuleContext(0, IdentifierListContext);
  }
  public ELLIPSIS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ELLIPSIS, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_parameterDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitParameterDecl) {
      return visitor.visitParameterDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  public _mul_op!: Token;
  public _add_op!: Token;
  public _rel_op!: Token;
  public primaryExpr(): PrimaryExprContext | undefined {
    return this.tryGetRuleContext(0, PrimaryExprContext);
  }
  public unaryExpr(): UnaryExprContext | undefined {
    return this.tryGetRuleContext(0, UnaryExprContext);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.STAR, 0);
  }
  public DIV(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DIV, 0);
  }
  public MOD(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.MOD, 0);
  }
  public LSHIFT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.LSHIFT, 0);
  }
  public RSHIFT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RSHIFT, 0);
  }
  public AMPERSAND(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.AMPERSAND, 0);
  }
  public BIT_CLEAR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.BIT_CLEAR, 0);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.MINUS, 0);
  }
  public OR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.OR, 0);
  }
  public CARET(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CARET, 0);
  }
  public EQUALS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.EQUALS, 0);
  }
  public NOT_EQUALS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.NOT_EQUALS, 0);
  }
  public LESS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.LESS, 0);
  }
  public LESS_OR_EQUALS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.LESS_OR_EQUALS, 0);
  }
  public GREATER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.GREATER, 0);
  }
  public GREATER_OR_EQUALS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.GREATER_OR_EQUALS, 0);
  }
  public LOGICAL_AND(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.LOGICAL_AND, 0);
  }
  public LOGICAL_OR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.LOGICAL_OR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_expression;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitExpression) {
      return visitor.visitExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class PrimaryExprContext extends ParserRuleContext {
  public operand(): OperandContext | undefined {
    return this.tryGetRuleContext(0, OperandContext);
  }
  public conversion(): ConversionContext | undefined {
    return this.tryGetRuleContext(0, ConversionContext);
  }
  public methodExpr(): MethodExprContext | undefined {
    return this.tryGetRuleContext(0, MethodExprContext);
  }
  public primaryExpr(): PrimaryExprContext | undefined {
    return this.tryGetRuleContext(0, PrimaryExprContext);
  }
  public index(): IndexContext | undefined {
    return this.tryGetRuleContext(0, IndexContext);
  }
  public slice_(): Slice_Context | undefined {
    return this.tryGetRuleContext(0, Slice_Context);
  }
  public typeAssertion(): TypeAssertionContext | undefined {
    return this.tryGetRuleContext(0, TypeAssertionContext);
  }
  public arguments(): ArgumentsContext | undefined {
    return this.tryGetRuleContext(0, ArgumentsContext);
  }
  public DOT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DOT, 0);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_primaryExpr;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitPrimaryExpr) {
      return visitor.visitPrimaryExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class UnaryExprContext extends ParserRuleContext {
  public _unary_op!: Token;
  public primaryExpr(): PrimaryExprContext | undefined {
    return this.tryGetRuleContext(0, PrimaryExprContext);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.PLUS, 0);
  }
  public MINUS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.MINUS, 0);
  }
  public EXCLAMATION(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.EXCLAMATION, 0);
  }
  public CARET(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.CARET, 0);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.STAR, 0);
  }
  public AMPERSAND(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.AMPERSAND, 0);
  }
  public RECEIVE(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RECEIVE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_unaryExpr;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitUnaryExpr) {
      return visitor.visitUnaryExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ConversionContext extends ParserRuleContext {
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0);
  }
  public COMMA(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.COMMA, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_conversion;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitConversion) {
      return visitor.visitConversion(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class OperandContext extends ParserRuleContext {
  public literal(): LiteralContext | undefined {
    return this.tryGetRuleContext(0, LiteralContext);
  }
  public operandName(): OperandNameContext | undefined {
    return this.tryGetRuleContext(0, OperandNameContext);
  }
  public L_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_PAREN, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public R_PAREN(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_PAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_operand;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitOperand) {
      return visitor.visitOperand(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LiteralContext extends ParserRuleContext {
  public basicLit(): BasicLitContext | undefined {
    return this.tryGetRuleContext(0, BasicLitContext);
  }
  public compositeLit(): CompositeLitContext | undefined {
    return this.tryGetRuleContext(0, CompositeLitContext);
  }
  public functionLit(): FunctionLitContext | undefined {
    return this.tryGetRuleContext(0, FunctionLitContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_literal;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitLiteral) {
      return visitor.visitLiteral(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class BasicLitContext extends ParserRuleContext {
  public NIL_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.NIL_LIT, 0);
  }
  public integer(): IntegerContext | undefined {
    return this.tryGetRuleContext(0, IntegerContext);
  }
  public string_(): String_Context | undefined {
    return this.tryGetRuleContext(0, String_Context);
  }
  public FLOAT_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.FLOAT_LIT, 0);
  }
  public IMAGINARY_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IMAGINARY_LIT, 0);
  }
  public RUNE_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RUNE_LIT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_basicLit;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitBasicLit) {
      return visitor.visitBasicLit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IntegerContext extends ParserRuleContext {
  public DECIMAL_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DECIMAL_LIT, 0);
  }
  public BINARY_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.BINARY_LIT, 0);
  }
  public OCTAL_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.OCTAL_LIT, 0);
  }
  public HEX_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.HEX_LIT, 0);
  }
  public IMAGINARY_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IMAGINARY_LIT, 0);
  }
  public RUNE_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RUNE_LIT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_integer;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitInteger) {
      return visitor.visitInteger(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class OperandNameContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode[];
  public IDENTIFIER(i: number): TerminalNode;
  public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.IDENTIFIER);
    } else {
      return this.getToken(GoParser.IDENTIFIER, i);
    }
  }
  public DOT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.DOT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_operandName;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitOperandName) {
      return visitor.visitOperandName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class QualifiedIdentContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode[];
  public IDENTIFIER(i: number): TerminalNode;
  public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.IDENTIFIER);
    } else {
      return this.getToken(GoParser.IDENTIFIER, i);
    }
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_qualifiedIdent;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitQualifiedIdent) {
      return visitor.visitQualifiedIdent(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class CompositeLitContext extends ParserRuleContext {
  public literalType(): LiteralTypeContext {
    return this.getRuleContext(0, LiteralTypeContext);
  }
  public literalValue(): LiteralValueContext {
    return this.getRuleContext(0, LiteralValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_compositeLit;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitCompositeLit) {
      return visitor.visitCompositeLit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LiteralTypeContext extends ParserRuleContext {
  public structType(): StructTypeContext | undefined {
    return this.tryGetRuleContext(0, StructTypeContext);
  }
  public arrayType(): ArrayTypeContext | undefined {
    return this.tryGetRuleContext(0, ArrayTypeContext);
  }
  public L_BRACKET(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.L_BRACKET, 0);
  }
  public ELLIPSIS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ELLIPSIS, 0);
  }
  public R_BRACKET(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.R_BRACKET, 0);
  }
  public elementType(): ElementTypeContext | undefined {
    return this.tryGetRuleContext(0, ElementTypeContext);
  }
  public sliceType(): SliceTypeContext | undefined {
    return this.tryGetRuleContext(0, SliceTypeContext);
  }
  public mapType(): MapTypeContext | undefined {
    return this.tryGetRuleContext(0, MapTypeContext);
  }
  public typeName(): TypeNameContext | undefined {
    return this.tryGetRuleContext(0, TypeNameContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_literalType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitLiteralType) {
      return visitor.visitLiteralType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class LiteralValueContext extends ParserRuleContext {
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public elementList(): ElementListContext | undefined {
    return this.tryGetRuleContext(0, ElementListContext);
  }
  public COMMA(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.COMMA, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_literalValue;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitLiteralValue) {
      return visitor.visitLiteralValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ElementListContext extends ParserRuleContext {
  public keyedElement(): KeyedElementContext[];
  public keyedElement(i: number): KeyedElementContext;
  public keyedElement(i?: number): KeyedElementContext | KeyedElementContext[] {
    if (i === undefined) {
      return this.getRuleContexts(KeyedElementContext);
    } else {
      return this.getRuleContext(i, KeyedElementContext);
    }
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COMMA);
    } else {
      return this.getToken(GoParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_elementList;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitElementList) {
      return visitor.visitElementList(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class KeyedElementContext extends ParserRuleContext {
  public element(): ElementContext {
    return this.getRuleContext(0, ElementContext);
  }
  public key(): KeyContext | undefined {
    return this.tryGetRuleContext(0, KeyContext);
  }
  public COLON(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.COLON, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_keyedElement;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitKeyedElement) {
      return visitor.visitKeyedElement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class KeyContext extends ParserRuleContext {
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.IDENTIFIER, 0);
  }
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public literalValue(): LiteralValueContext | undefined {
    return this.tryGetRuleContext(0, LiteralValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_key;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitKey) {
      return visitor.visitKey(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ElementContext extends ParserRuleContext {
  public expression(): ExpressionContext | undefined {
    return this.tryGetRuleContext(0, ExpressionContext);
  }
  public literalValue(): LiteralValueContext | undefined {
    return this.tryGetRuleContext(0, LiteralValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_element;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitElement) {
      return visitor.visitElement(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StructTypeContext extends ParserRuleContext {
  public STRUCT(): TerminalNode {
    return this.getToken(GoParser.STRUCT, 0);
  }
  public L_CURLY(): TerminalNode {
    return this.getToken(GoParser.L_CURLY, 0);
  }
  public R_CURLY(): TerminalNode {
    return this.getToken(GoParser.R_CURLY, 0);
  }
  public fieldDecl(): FieldDeclContext[];
  public fieldDecl(i: number): FieldDeclContext;
  public fieldDecl(i?: number): FieldDeclContext | FieldDeclContext[] {
    if (i === undefined) {
      return this.getRuleContexts(FieldDeclContext);
    } else {
      return this.getRuleContext(i, FieldDeclContext);
    }
  }
  public eos(): EosContext[];
  public eos(i: number): EosContext;
  public eos(i?: number): EosContext | EosContext[] {
    if (i === undefined) {
      return this.getRuleContexts(EosContext);
    } else {
      return this.getRuleContext(i, EosContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_structType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitStructType) {
      return visitor.visitStructType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FieldDeclContext extends ParserRuleContext {
  public _tag!: String_Context;
  public identifierList(): IdentifierListContext | undefined {
    return this.tryGetRuleContext(0, IdentifierListContext);
  }
  public type_(): Type_Context | undefined {
    return this.tryGetRuleContext(0, Type_Context);
  }
  public embeddedField(): EmbeddedFieldContext | undefined {
    return this.tryGetRuleContext(0, EmbeddedFieldContext);
  }
  public string_(): String_Context | undefined {
    return this.tryGetRuleContext(0, String_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_fieldDecl;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFieldDecl) {
      return visitor.visitFieldDecl(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class String_Context extends ParserRuleContext {
  public RAW_STRING_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.RAW_STRING_LIT, 0);
  }
  public INTERPRETED_STRING_LIT(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.INTERPRETED_STRING_LIT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_string_;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitString_) {
      return visitor.visitString_(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EmbeddedFieldContext extends ParserRuleContext {
  public typeName(): TypeNameContext {
    return this.getRuleContext(0, TypeNameContext);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.STAR, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_embeddedField;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitEmbeddedField) {
      return visitor.visitEmbeddedField(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class FunctionLitContext extends ParserRuleContext {
  public FUNC(): TerminalNode {
    return this.getToken(GoParser.FUNC, 0);
  }
  public signature(): SignatureContext {
    return this.getRuleContext(0, SignatureContext);
  }
  public block(): BlockContext {
    return this.getRuleContext(0, BlockContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_functionLit;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitFunctionLit) {
      return visitor.visitFunctionLit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IndexContext extends ParserRuleContext {
  public L_BRACKET(): TerminalNode {
    return this.getToken(GoParser.L_BRACKET, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public R_BRACKET(): TerminalNode {
    return this.getToken(GoParser.R_BRACKET, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_index;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitIndex) {
      return visitor.visitIndex(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Slice_Context extends ParserRuleContext {
  public L_BRACKET(): TerminalNode {
    return this.getToken(GoParser.L_BRACKET, 0);
  }
  public R_BRACKET(): TerminalNode {
    return this.getToken(GoParser.R_BRACKET, 0);
  }
  public COLON(): TerminalNode[];
  public COLON(i: number): TerminalNode;
  public COLON(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COLON);
    } else {
      return this.getToken(GoParser.COLON, i);
    }
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_slice_;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitSlice_) {
      return visitor.visitSlice_(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class TypeAssertionContext extends ParserRuleContext {
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0);
  }
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0);
  }
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_typeAssertion;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitTypeAssertion) {
      return visitor.visitTypeAssertion(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ArgumentsContext extends ParserRuleContext {
  public L_PAREN(): TerminalNode {
    return this.getToken(GoParser.L_PAREN, 0);
  }
  public R_PAREN(): TerminalNode {
    return this.getToken(GoParser.R_PAREN, 0);
  }
  public expressionList(): ExpressionListContext | undefined {
    return this.tryGetRuleContext(0, ExpressionListContext);
  }
  public type_(): Type_Context | undefined {
    return this.tryGetRuleContext(0, Type_Context);
  }
  public ELLIPSIS(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.ELLIPSIS, 0);
  }
  public COMMA(): TerminalNode[];
  public COMMA(i: number): TerminalNode;
  public COMMA(i?: number): TerminalNode | TerminalNode[] {
    if (i === undefined) {
      return this.getTokens(GoParser.COMMA);
    } else {
      return this.getToken(GoParser.COMMA, i);
    }
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_arguments;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitArguments) {
      return visitor.visitArguments(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class MethodExprContext extends ParserRuleContext {
  public receiverType(): ReceiverTypeContext {
    return this.getRuleContext(0, ReceiverTypeContext);
  }
  public DOT(): TerminalNode {
    return this.getToken(GoParser.DOT, 0);
  }
  public IDENTIFIER(): TerminalNode {
    return this.getToken(GoParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_methodExpr;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitMethodExpr) {
      return visitor.visitMethodExpr(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class ReceiverTypeContext extends ParserRuleContext {
  public type_(): Type_Context {
    return this.getRuleContext(0, Type_Context);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_receiverType;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitReceiverType) {
      return visitor.visitReceiverType(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class EosContext extends ParserRuleContext {
  public SEMI(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.SEMI, 0);
  }
  public EOF(): TerminalNode | undefined {
    return this.tryGetToken(GoParser.EOF, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return GoParser.RULE_eos;
  }
  // @Override
  public accept<Result>(visitor: GoParserVisitor<Result>): Result {
    if (visitor.visitEos) {
      return visitor.visitEos(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
