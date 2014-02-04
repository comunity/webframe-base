/// <reference path="../typed/q/Q.d.ts" />
import Response = require('./Response');
interface Msg {
    statusCode: number;
    headers: any;
    respond(res: Response): void;
    setHeaders(res: Response): void;
    setHeader(res: Response, header: string): boolean;
    success(): boolean;
    contentLength(): number;
    contentType(): string;
    getBuffer(): Q.Promise<NodeBuffer>;
    getString(): Q.Promise<string>;
    getObject(): Q.Promise<any>;
    check(o: any, errFun: (message: string) => any): void;
}
export = Msg;
