// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/underscore.string/underscore.string.d.ts" />

import _s = require('underscore.string')
import Logger = require('./Logger')

var uuid = require('node-uuid')

class ConsoleLogger implements Logger {
    id(): string {
        return uuid.v4()
    }
    log(type: string, id: string, ctx: any): string {
        if (!id)
            id = this.id()
        var start = (ctx && ctx.start && (Math.round(process.hrtime(ctx.start)[1] / 1000000))) || ''
        if (ctx && ctx.url) {
            console.log(id && (id.substring(0, 4) + id.substring(id.length - 4)),
                _s.lpad(<any>start, 4),
                _s.rpad(ctx.statusCode || '', 3),
                _s.rpad(type, 5),
                _s.rpad(ctx.method, 5),
                ctx.url)
        } else if (type === 'error')
            console.log('[' + type + ']', id, process.hrtime(), process.pid, ctx)
        else
            console.log('[' + type + ']', id, process.hrtime(), process.pid, ctx)
        return id
    }
}

export = ConsoleLogger