import { Injectable, InternalServerErrorException } from '@nestjs/common';
import child_process from 'child_process';
import * as t from 'io-ts';

const PylintOutputMessage = t.type({
  type: t.string,
  module: t.string,
  obj: t.string,
  line: t.number,
  column: t.number,
  path: t.string,
  symbol: t.string,
  message: t.string,
  'message-id': t.string,
});

const PylintOutput = t.array(PylintOutputMessage);

export type PylintOutputT = t.TypeOf<typeof PylintOutput>;

@Injectable()
export class LintService {
  lintPython3(code: string): t.Validation<PylintOutputT> {
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

    const out = result.output.toString();
    try {
      const output = PylintOutput.decode(out);
      if (output) {
        return output;
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }

    throw new InternalServerErrorException();
  }
}
