declare module 'fit-file-parser' {
  interface FitParserOptions {
    force?: boolean;
    speedUnit?: 'km/h' | 'm/s' | 'mph';
    lengthUnit?: 'km' | 'miles';
    temperatureUnit?: 'celsius' | 'fahrenheit';
    elapsedRecordField?: boolean;
  }

  interface FitParseCallback {
    (error: Error | null, data: any): void;
  }

  class FitParser {
    constructor(options?: FitParserOptions);
    parse(buffer: Buffer, callback: FitParseCallback): void;
  }

  export = FitParser;
}
