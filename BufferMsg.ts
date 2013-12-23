// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../../typed/node/node.d.ts" />
///<reference path="../../typed/q/Q.d.ts" />

import BaseMsg = require('./BaseMsg')
import Msg = require('./Msg')
import Q = require('q')
import Response = require('./Response')

class BufferMsg extends BaseMsg {
    constructor(statusCode: number, headers: any, private _buffer: NodeBuffer) { super(statusCode, headers) }
    respond(res: Response): Q.Promise<Msg> {
        if (this._buffer)
            res.setHeader('content-length', this._buffer.length.toString())
        this.setHeaders(res)
        if (this.statusCode)
            res.writeHead(this.statusCode)
        return res.end(this._buffer)
    }
    getBuffer(): Q.Promise<NodeBuffer> {
        return Q.fcall(() => this._buffer)
    }
}

export = BufferMsg