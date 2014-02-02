// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
///<reference path="../typed/underscore.string/underscore.string.d.ts" />
var _s = require('underscore.string');

var uuid = require('node-uuid');

var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.id = function () {
        return uuid.v4();
    };
    ConsoleLogger.prototype.log = function (type, id, ctx) {
        if (!id)
            id = this.id();
        var start = (ctx && ctx.start && (Math.round(process.hrtime(ctx.start)[1] / 1000000))) || '';
        if (ctx && ctx.url) {
            console.log(id && (id.substring(0, 4) + id.substring(id.length - 4)), _s.lpad(start, 4), _s.rpad(ctx.statusCode || '', 3), _s.rpad(type, 5), _s.rpad(ctx.method, 5), ctx.url);
        } else if (type === 'error')
            console.log('[' + type + ']', id, process.hrtime(), process.pid, ctx);
        else
            console.log('[' + type + ']', id, process.hrtime(), process.pid, ctx);
        return id;
    };
    return ConsoleLogger;
})();

module.exports = ConsoleLogger;
