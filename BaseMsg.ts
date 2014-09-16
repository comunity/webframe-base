// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/q/Q.d.ts" />

import crypto = require('crypto')
import Msg = require('./Msg')
import Q = require('q')
import Response = require('./Response')

class BaseMsg implements Msg {
    private _cachedObject
    constructor(public statusCode: number, public headers?: any) {
        if (!this.headers)
            this.headers = {}
    }
    cache(maxAge: number, etag: string): Msg {
        this.headers['Cache-Control'] = 'public, max-age=' + maxAge
        this.headers['Vary'] = 'accept-encoding'
        if (etag)
            this.headers['ETag'] = '"' + etag + '"'
        return this
    }
    respond(res: Response): void {
        res.writeHead(this.statusCode)
        res.end()
    }
    setHeaders(res: Response): void {
        if (this.headers)
            Object.keys(this.headers).forEach(header => res.setHeader(header, this.headers[header]))
    }
    setHeader(res: Response, header: string): boolean {
        return setLocalHeader(res, this.headers, header)
    }
    success(): boolean {
        return this.statusCode >= 200 && this.statusCode < 300
    }
    contentLength(): number {
        return numberHeader(this.headers, 'content-length')
    }
    contentType(): string {
        return this.headers && this.headers['content-type']
    }
    getBuffer(): Q.Promise<NodeBuffer> {
        throw new Error('M.getBuffer not implemented')
    }
    getString(): Q.Promise<string> {
        return this.getBuffer().then(buffer => buffer.toString())
    }
    getObject(): Q.Promise<any> {
        return this.getBuffer().then(buffer => buffer && buffer.length > 0 ? JSON.parse(buffer.toString()) : null)
    }
    getObjectWithDigest(): Q.Promise<any> {
        if (this._cachedObject) {
            return Q.fcall(function () {
                return this._cachedObject
            })
        }
        return this.getBuffer().then(buffer => {
            if (!buffer || buffer.length === 0)
                return null
            var hash = crypto.createHash('sha1')
            hash.update(buffer)
            var digest = hash.digest('hex')
            var o = JSON.parse(buffer.toString())
            o.digest = digest
            this._cachedObject = o
            return o
        })
    }
    check(o: any, errFun: (message: string) => any): void {
        if (this.success())
            return
        var detail: any = {
                statusCode: this.statusCode
            }
            , err = o && o['odata.error']
        if (err) {
            detail.code = err.code
            detail.message = err.message && err.message.value
            detail.lang = err.message && err.message.lang
            detail.innererror = err.innererror
        }
        var error = errFun(detail.message)
        error['detail'] = detail
        throw error                    
    }
}

export = BaseMsg

function setLocalHeader(res: Response, headers: any, header: string): boolean {
    if (!headers || !headers[header])
        return false
    res.setHeader(header, headers[header])
    return true
}

function numberHeader(headers: any, header: string): number {
    var h = headers && headers[header]
    return h ? parseInt(h, 10) : 0
}