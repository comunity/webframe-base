// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/q/Q.d.ts" />
///<reference path="../typed/node/node.d.ts" />

import BaseMsg = require('./BaseMsg')
import crypto = require('crypto')
import Msg = require('./Msg')
import Q = require('q')
import Response = require('./Response')

class ObjectMsg extends BaseMsg {
    private _json: string
    constructor(statusCode: number, headers: any, private _obj: any) {
        super(statusCode, headers)
    }
    json(): string {
        if (!this._json)
            this._json = JSON.stringify(this._obj)
        return this._json
    }
    sha1(): string {
        var shasum = crypto.createHash('sha1')
        shasum.update(this.json())
        return shasum.digest('hex')
    }
    cache(maxAge: number, etag: string): Msg {
        return super.cache(maxAge, maxAge && !etag ? this.sha1() : etag)
    }
    respond(res: Response): void {
        var body = this._obj && new Buffer(this.json())
        if (body) {
            res.setHeader('Content-Length', body.length.toString())
            if (body.length && this.statusCode !== 204)
                res.setHeader('Content-Type', 'application/json')
        }
        this.setHeaders(res)
        if (this.statusCode)
            res.writeHead(this.statusCode)
        res.end(body)
    }
    getBuffer(): Q.Promise<NodeBuffer> {
        return Q.fcall(() => new Buffer(this.json()))
    }
    getString(): Q.Promise<string> {
        return Q.fcall(() => this.json())
    }
    getObject(): Q.Promise<any> {
        return Q.fcall(() => this._obj)
    }
}

export = ObjectMsg