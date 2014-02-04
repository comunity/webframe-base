/// <reference path="../typed/node/node.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
import stream = require('stream');
interface Response {
    writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
    setHeader(name: string, value: string): void;
    end(data?: any, encoding?: string): void;
    pipefrom<T extends stream.ReadableStream>(source: T): void;
}
export = Response;
