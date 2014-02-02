/// <reference path="../typed/node/node.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
import BaseMsg = require('./BaseMsg');
import Msg = require('./Msg');
import Response = require('./Response');
declare class StringMsg extends BaseMsg {
    private _content;
    constructor(statusCode: number, headers: any, _content: string);
    public respond(res: Response): Q.Promise<Msg>;
    public getBuffer(): Q.Promise<NodeBuffer>;
    public getString(): Q.Promise<string>;
    public getObject(): Q.Promise<any>;
}
export = StringMsg;
