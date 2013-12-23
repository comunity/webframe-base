// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
///<reference path="../../typed/underscore.string/underscore.string.d.ts" />
var _s = require('underscore.string');

var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (type, requestId, ctx) {
        var start = (ctx && ctx.start && (Math.round(process.hrtime(ctx.start)[1] / 1000000))) || '';
        if (ctx && ctx.url)
            return console.log(requestId && (requestId.substring(0, 4) + requestId.substring(requestId.length - 4)), _s.lpad(start, 4), _s.rpad(ctx.statusCode || '', 3), _s.rpad(type, 5), _s.rpad(ctx.method, 5), ctx.url);

        if (type === 'error')
            return console.log('[' + type + ']', requestId, process.hrtime(), process.pid, ctx);

        return console.log('[' + type + ']', requestId, process.hrtime(), process.pid, ctx);
    };
    return ConsoleLogger;
})();

module.exports = ConsoleLogger;
