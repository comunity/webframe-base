// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../../typed/q/Q.d.ts" />

import Q = require('q')
import Response = require('./Response')

interface Msg {
    statusCode: number
    headers: any
    respond(res: Response): Q.Promise<any>
    setHeaders(res: Response)
    setHeader(res: Response, header: string)
    success(): boolean
    contentLength(): number
    contentType(): string
    getBuffer(): Q.Promise<NodeBuffer>
    getString(): Q.Promise<string>
    getObject(): Q.Promise<any>
    check(o: any, errFun: (message: string) => any) 
}

export = Msg