// `yaml` is not type safe 🤷‍♂️
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import child_process from 'child_process';
import fs from 'fs';
import * as uuid from 'uuid';
import YAML from 'yaml';
import { ConvertToGolangCILintOutput } from './linters/golangcilint';
import { ConvertToPylintOutput } from './linters/pylint';

@Injectable()
export class LintService {
  lintPython3(code: string): number {
    const result = child_process.spawnSync(
      'pylint',
      ['--from-stdin', '-f', 'json', 'module_or_package', '--'],
      {
        input: code,
      },
    );

    if (result.error) {
      throw new InternalServerErrorException();
    }

    try {
      let output = result.output.toString();
      output = output.substring(1);
      output = output.substring(0, output.length - 1);
      const pylintOutput = ConvertToPylintOutput.toPylintOutput(output);
      if (pylintOutput) {
        /*
        Example output:
        [
            {
                "type": "convention",
                "module": "fib",
                "obj": "",
                "line": 1,
                "column": 0,
                "path": "fib.py",
                "symbol": "missing-module-docstring",
                "message": "Missing module docstring",
                "message-id": "C0114"
            },
          ...

        Remove one point to the score per violation
        */
        return 100 - pylintOutput.length;
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }

    throw new InternalServerErrorException();
  }

  lintGolang(code: string): number {
    // Golangci-lint doesn't support stdin
    const path = `/tmp/codebench_${uuid.v4()}.go`;
    try {
      fs.writeFileSync(path, code);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    const result = child_process.spawnSync('golangci-lint', [
      'run',
      path,
      '--out-format',
      'json',
    ]);

    if (result.error) {
      throw new InternalServerErrorException(result.error);
    }

    try {
      let output = result.output.toString();
      output = output.substring(1);
      output = output.substring(0, output.length - 1);
      const lintOuput =
        ConvertToGolangCILintOutput.toGolangCILintOutput(output);
      if (lintOuput) {
        /*
        Example output:

        {
          "Issues": [
            {
              "FromLinter": "errcheck",
              "Text": "Error return value of `http.ListenAndServe` is not checked",
              "Severity": "",
              "SourceLines": [
                "\thttp.ListenAndServe(\":9567\", nil)"
              ],
              "Replacement": null,
              "Pos": {
                "Filename": "http.go",
                "Offset": 417,
                "Line": 27,
                "Column": 21
              },
              "ExpectNoLint": false,
              "ExpectedNoLintLinter": ""
            }
          ],
          ...
        */
        if (lintOuput.issues) {
          // Remove one point to the score per violation
          return 100 - lintOuput.issues.length;
        }
        // Golangci-lint return `null` if there are no violation
        return 100;
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new InternalServerErrorException();
  }

  lintCpp(code: string): number {
    // clang-tidy doesn't support stdin
    const path = `/tmp/codebench_${uuid.v4()}.cpp`;
    const outputPath = `${path}.yaml`;
    try {
      fs.writeFileSync(path, code);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    const result = child_process.spawnSync('clang-tidy', [
      `-export-fixes=${outputPath}`,
      path,
      '--',
      '-Wall',
      '-std=c++11',
      '-x',
      'c++',
    ]);

    if (result.error) {
      throw new InternalServerErrorException(result.error);
    }

    try {
      if (fs.existsSync(outputPath)) {
        const file = fs.readFileSync(`${path}.yaml`, 'utf8');
        const fixes: any = YAML.parse(file);
        if (fixes) {
          /*
          Example file:
          ---
          MainSourceFile:  /root/fib.cpp
          Diagnostics:
            - DiagnosticName:  clang-diagnostic-unused-variable
              Message:         'unused variable ''d'''
              FileOffset:      142
              FilePath:        /root/fib.cpp
              Replacements:
          ...
          */
          if (fixes.Diagnostics) {
            return 100 - fixes.Diagnostics.length;
          }
        }
      }
      return 100;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
