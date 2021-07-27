// `yaml` is not type safe 🤷‍♂️
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import child_process from 'child_process';
import fs from 'fs';
import { Logger } from 'nestjs-pino';
import * as uuid from 'uuid';
import YAML from 'yaml';
import { LintErrorDTO } from './dto/lint-error.dto';
import { LintResultDTO } from './dto/lint-result.dto';
import { ConvertToGolangCILintOutput } from './linters/golangcilint';
import { ConvertToPylintOutput } from './linters/pylint';

@Injectable()
export class LintService {
  constructor(private readonly logger: Logger) {}

  lintPython3(code: string): LintResultDTO {
    const result = child_process.spawnSync(
      'pylint',
      ['--from-stdin', '-f', 'json', 'module_or_package', '--'],
      {
        input: code,
      },
    );

    if (result.error) {
      throw new InternalServerErrorException('Failed to run pylint');
    }

    try {
      let output = result.output.toString();
      output = output.substring(1);
      output = output.substring(0, output.length - 1);
      this.logger.log(output);
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
        const score = 100 - pylintOutput.length;
        const errors: LintErrorDTO[] = [];

        for (const violation of pylintOutput) {
          errors.push({
            message: violation.message,
            line: violation.line,
            column: violation.column,
            offset: null,
          });
        }

        return {
          score,
          errors,
        };
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    throw new InternalServerErrorException();
  }

  lintGolang(code: string): LintResultDTO {
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
      this.logger.log(output);
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
          const score = 100 - lintOuput.issues.length;
          const errors: LintErrorDTO[] = [];

          for (const issue of lintOuput.issues) {
            errors.push({
              message: issue.text,
              line: issue.pos.line,
              column: issue.pos.column,
              offset: null,
            });
          }
          return {
            score,
            errors,
          };
        }
        // Golangci-lint return `null` if there are no violation
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return {
      score: 100,
      errors: [],
    };
  }

  lintCpp(code: string): LintResultDTO {
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
        this.logger.log(fixes);

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
            const score = 100 - fixes.Diagnostics.length;
            const errors: LintErrorDTO[] = [];

            for (const diagnostic of fixes.Diagnostics) {
              errors.push({
                message: diagnostic.Message,
                line: diagnostic.FileOffset,
                column: null,
                offset: null,
              });
            }
            return {
              score,
              errors,
            };
          }
        }
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return {
      score: 100,
      errors: [],
    };
  }
}
