/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export interface GolangCILintOutput {
  issues: Issue[] | null;
  report: Report;
}

export interface Issue {
  fromLinter: FromLinter;
  text: string;
  sourceLines: string[] | null;
  replacement: null;
  pos: Pos;
  expectNoLint: boolean;
  expectedNoLintLinter: string;
  lineRange?: LineRange;
}

export enum FromLinter {
  Errcheck = 'errcheck',
  Gosimple = 'gosimple',
  Ineffassign = 'ineffassign',
  Staticcheck = 'staticcheck',
  Structcheck = 'structcheck',
  Unused = 'unused',
}

export interface LineRange {
  from: number;
  to: number;
}

export interface Pos {
  filename: string;
  offset: number;
  line: number;
  column: number;
}

export interface Report {
  linters: Linter[];
}

export interface Linter {
  name: string;
  enabled?: boolean;
  enabledByDefault?: boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class ConvertToGolangCILintOutput {
  public static toGolangCILintOutput(json: string): GolangCILintOutput {
    return cast(JSON.parse(json), r('GolangCILintOutput'));
  }

  public static golangCILintOutputToJson(value: GolangCILintOutput): string {
    return JSON.stringify(uncast(value, r('GolangCILintOutput')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ,
      )} but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (Number.isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  GolangCILintOutput: o(
    [
      { json: 'Issues', js: 'issues', typ: u(a(r('Issue')), null) },
      { json: 'Report', js: 'report', typ: r('Report') },
    ],
    false,
  ),
  Issue: o(
    [
      { json: 'FromLinter', js: 'fromLinter', typ: r('FromLinter') },
      { json: 'Text', js: 'text', typ: '' },
      { json: 'SourceLines', js: 'sourceLines', typ: u(a(''), null) },
      { json: 'Replacement', js: 'replacement', typ: null },
      { json: 'Pos', js: 'pos', typ: r('Pos') },
      { json: 'ExpectNoLint', js: 'expectNoLint', typ: true },
      { json: 'ExpectedNoLintLinter', js: 'expectedNoLintLinter', typ: '' },
      { json: 'LineRange', js: 'lineRange', typ: u(undefined, r('LineRange')) },
    ],
    false,
  ),
  LineRange: o(
    [
      { json: 'From', js: 'from', typ: 0 },
      { json: 'To', js: 'to', typ: 0 },
    ],
    false,
  ),
  Pos: o(
    [
      { json: 'Filename', js: 'filename', typ: '' },
      { json: 'Offset', js: 'offset', typ: 0 },
      { json: 'Line', js: 'line', typ: 0 },
      { json: 'Column', js: 'column', typ: 0 },
    ],
    false,
  ),
  Report: o([{ json: 'Linters', js: 'linters', typ: a(r('Linter')) }], false),
  Linter: o(
    [
      { json: 'Name', js: 'name', typ: '' },
      { json: 'Enabled', js: 'enabled', typ: u(undefined, true) },
      {
        json: 'EnabledByDefault',
        js: 'enabledByDefault',
        typ: u(undefined, true),
      },
    ],
    false,
  ),
  FromLinter: [
    'errcheck',
    'gosimple',
    'ineffassign',
    'staticcheck',
    'structcheck',
    'unused',
  ],
};
