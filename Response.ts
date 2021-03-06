// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />

import Q = require('q')
import stream = require('stream')
import Msg = require('./Msg')

interface Response {
    writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void
    setHeader(name: string, value: string): void
    end(data?: any, encoding?: string): void
    pipefrom<T extends stream.Readable>(source: T): void
}

export = Response