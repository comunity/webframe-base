// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/q/Q.d.ts" />

import Msg = require('./Msg')
import Q = require('q')
import Response = require('./Response')

class BaseMsg implements Msg {
    constructor(public statusCode: number, public headers?: any) {
        if (!this.headers)
            this.headers = {}
    }
    respond(res: Response): Q.Promise<Msg> {
        res.writeHead(this.statusCode)
        return res.end()
    }
    setHeaders(res: Response) {
        setLocalHeader(res, this.headers, 'content-type')
        setLocalHeader(res, this.headers, 'etag')
        setLocalHeader(res, this.headers, 'last-modified')
        setLocalHeader(res, this.headers, 'location')
        setLocalHeader(res, this.headers, 'cache-control')
    }
    setHeader(res: Response, header: string) {
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
    check(o: any, errFun: (message: string) => any) {
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

function setLocalHeader(res: Response, headers: any, header: string) {
    if (!headers || !headers[header])
        return false
    res.setHeader(header, headers[header])
    return true
}

function numberHeader(headers: any, header: string): number {
    var h = headers && headers[header]
    return h ? parseInt(h, 10) : 0
}