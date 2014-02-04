/// <reference path="../typed/q/Q.d.ts" />
import BaseMsg = require('./BaseMsg');
import Response = require('./Response');
declare class ObjectMsg extends BaseMsg {
    private _obj;
    constructor(statusCode: number, headers: any, _obj: any);
    public respond(res: Response): void;
    public getBuffer(): Q.Promise<NodeBuffer>;
    public getString(): Q.Promise<string>;
    public getObject(): Q.Promise<any>;
}
export = ObjectMsg;
