export class LintErrorDTO {
  message: string;

  line: number | null;

  column: number | null;

  offset: number | null;
}
