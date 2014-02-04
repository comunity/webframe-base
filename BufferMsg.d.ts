/// <reference path="../typed/node/node.d.ts" />
/// <reference path="../typed/q/Q.d.ts" />
import BaseMsg = require('./BaseMsg');
import Response = require('./Response');
declare class BufferMsg extends BaseMsg {
    private _buffer;
    constructor(statusCode: number, headers: any, _buffer: NodeBuffer);
    public respond(res: Response): void;
    public getBuffer(): Q.Promise<NodeBuffer>;
}
export = BufferMsg;
