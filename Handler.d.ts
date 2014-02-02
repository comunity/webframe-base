/// <reference path="../typed/node/node.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
import Msg = require('./Msg');
import url = require('url');
declare class Handler {
    public identified(uri: url.Url): any;
    public acceptable(accept: any): boolean;
    public read(uri: url.Url, user: string, reqId: string, maxAge: number, accept: string): Q.Promise<Msg>;
    public remove(uri: url.Url, user: string, reqId: string): Q.Promise<Msg>;
    public replace(uri: url.Url, user: string, reqId: string, message: Msg): Q.Promise<Msg>;
    public update(uri: url.Url, user: string, reqId: string, message: Msg, accept?: string): Q.Promise<Msg>;
    public exec(uri: url.Url, user: string, reqId: string, message: Msg, accept?: string): Q.Promise<Msg>;
    public methodNotAllowed(): Q.Promise<Msg>;
}
export = Handler;
