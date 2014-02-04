/// <reference path="../typed/q/Q.d.ts" />
import Response = require('./Response');
interface Msg {
    statusCode: number;
    headers: any;
    respond(res: Response): any;
    setHeaders(res: Response): any;
    setHeader(res: Response, header: string): any;
    success(): boolean;
    contentLength(): number;
    contentType(): string;
    getBuffer(): Q.Promise<NodeBuffer>;
    getString(): Q.Promise<string>;
    getObject(): Q.Promise<any>;
    check(o: any, errFun: (message: string) => any): any;
}
export = Msg;
