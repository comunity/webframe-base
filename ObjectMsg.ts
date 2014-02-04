// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/q/Q.d.ts" />

import BaseMsg = require('./BaseMsg')
import Msg = require('./Msg')
import Q = require('q')
import Response = require('./Response')

class ObjectMsg extends BaseMsg {
    constructor(statusCode: number, headers: any, private _obj: any) { super(statusCode, headers) }
    respond(res: Response): void {
        var body = this._obj && new Buffer(JSON.stringify(this._obj))
        if (body)
            res.setHeader('content-length', body.length.toString())
        res.setHeader('content-type', 'application/json')
        this.setHeaders(res)
        if (this.statusCode)
            res.writeHead(this.statusCode)
        res.end(body)
    }
    getBuffer(): Q.Promise<NodeBuffer> {
        return Q.fcall(() => new Buffer(JSON.stringify(this._obj)))
    }
    getString(): Q.Promise<string> {
        return Q.fcall(() => JSON.stringify(this._obj))
    }
    getObject(): Q.Promise<any> {
        return Q.fcall(() => this._obj)
    }
}

export = ObjectMsg