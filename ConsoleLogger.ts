// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../../typed/underscore.string/underscore.string.d.ts" />

import _s = require('underscore.string')
import Logger = require('./Logger')

class ConsoleLogger implements Logger {
    log(type: string, requestId: string, ctx: any) {
        var start = (ctx && ctx.start && (Math.round(process.hrtime(ctx.start)[1] / 1000000))) || ''
        if (ctx && ctx.url)
            return console.log(requestId && (requestId.substring(0,4)+requestId.substring(requestId.length-4)),
                _s.lpad(<any>start, 4),
                _s.rpad(ctx.statusCode || '', 3),
                _s.rpad(type, 5),
                _s.rpad(ctx.method, 5),
                ctx.url)

        if (type === 'error')
            return console.log('[' + type + ']', requestId, process.hrtime(), process.pid, ctx)

        return console.log('[' + type + ']', requestId, process.hrtime(), process.pid, ctx)
    }
}

export = ConsoleLogger