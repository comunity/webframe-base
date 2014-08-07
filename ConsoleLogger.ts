// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/underscore.string/underscore.string.d.ts" />

import util = require('util')
import _s = require('underscore.string')
import Logger = require('./Logger')
var os = require("os");


class ConsoleLogger implements Logger {
    private _id: number
    private _prefix: string
    constructor() {
        this._id = 0
        this._prefix = os.hostname() + '~' + process.pid + '~'
    }
    id(): string {
        return this._prefix + ++this._id
    }
    log(type: string, requestId: string, start: number[], method: string, url: string, statusCode: number, user?: string, reqHeaders?, err?, reqBody?, resBody?, resHeaders?): string {
        if (!requestId)
            requestId = this.id()
        if (type === 'error' && (statusCode && statusCode >= 500))
            console.log('[' + type + ']', requestId, process.hrtime(), process.pid, err, reqBody, resBody)
        else if (type === 'flow')
            console.log(requestId && (requestId.substring(0, 4) + requestId.substring(requestId.length - 4)),
                _s.lpad('', 4),
                _s.rpad('', 3),
                _s.rpad(type, 5),
                _s.rpad(method, 5),
                url,
                reqBody)
        else {
            var time = (start && (getTimedifferenceMillis(start))) || ''
            var line = requestId + ' ' + _s.lpad(<any>time, 6) + ' ' + _s.rpad(statusCode+'', 3) + ' ' + _s.rpad(type, 5) + ' ' + _s.rpad(method, 5)
            if (url) {
                if (url.length + line.length > 228)
                    line += ' ' + url.substring(0, 228 - line.length)
                else
                    line += url
            }
            console.log(line)
        }
        return requestId
    }
}

export = ConsoleLogger

function getTimedifferenceMillis(start: number[]): number {
    var timespan = process.hrtime(start)
    return timespan[0] * 1000 + Math.round(timespan[1] / 1000000)
}