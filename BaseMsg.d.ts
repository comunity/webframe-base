/// <reference path="../typed/q/Q.d.ts" />
import Msg = require('./Msg');
import Response = require('./Response');
declare class BaseMsg implements Msg {
    public statusCode: number;
    public headers: any;
    constructor(statusCode: number, headers?: any);
    public respond(res: Response): Q.Promise<Msg>;
    public setHeaders(res: Response): void;
    public setHeader(res: Response, header: string): boolean;
    public success(): boolean;
    public contentLength(): number;
    public contentType(): string;
    public getBuffer(): Q.Promise<NodeBuffer>;
    public getString(): Q.Promise<string>;
    public getObject(): Q.Promise<any>;
    public check(o: any, errFun: (message: string) => any): void;
}
export = BaseMsg;
