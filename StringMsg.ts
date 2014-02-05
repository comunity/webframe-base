// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />

import BaseMsg = require('./BaseMsg')
import Msg = require('./Msg')
import Q = require('q')
import Response = require('./Response')

class StringMsg extends BaseMsg {
    constructor(statusCode: number, headers: any, private _content: string) { super(statusCode, headers) }
    respond(res: Response): void {
        var buffer = this._content && new Buffer(this._content)
        if (buffer)
            res.setHeader('Content-Length', buffer.length.toString())
        this.setHeaders(res)
        if (this.statusCode)
            res.writeHead(this.statusCode)
        res.end(buffer)
    }
    getBuffer(): Q.Promise<NodeBuffer> {
        return Q.fcall(() => new Buffer(this._content))
    }
    getString(): Q.Promise<string> {
        return Q.fcall(() => this._content)
    }
    getObject(): Q.Promise<any> {
        return Q.fcall(() => JSON.parse(this._content))
    }
}

export = StringMsg