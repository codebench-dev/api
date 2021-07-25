import { Injectable, InternalServerErrorException } from '@nestjs/common';
import child_process from 'child_process';
import fs from 'fs';
import * as uuid from 'uuid';
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
        // Remove one point to the score per violation
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
}
