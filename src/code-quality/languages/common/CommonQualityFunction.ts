import { isUppercase } from 'class-validator';

export class CommonQualityFunction {
  public static isCamelCase(text: string): boolean {
    const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;
    return camelCaseRegex.test(text);
  }

  public static isLineTooLong(line: string): boolean {
    return line.length > 80;
  }

  public static isSnakeCase(text: string): boolean {
    // Function name without ()...
    const functionName = text;
    for (let i = 0; i < functionName.length; i += 1) {
      if (isUppercase(functionName[i]) && functionName[i] !== '_') {
        return false;
      }
    }
    return true;
  }
}
