// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var _s = require('underscore.string');

var os = require("os");

var ConsoleLogger = (function () {
    function ConsoleLogger() {
        this._id = 0;
        this._prefix = os.hostname() + '~' + process.pid + '~';
    }
    ConsoleLogger.prototype.id = function () {
        return this._prefix + ++this._id;
    };
    ConsoleLogger.prototype.log = function (type, requestId, start, method, url, statusCode, user, reqHeaders, err, reqBody, resBody, resHeaders) {
        if (!requestId)
            requestId = this.id();
        if (type === 'error' && (statusCode && statusCode >= 500))
            console.log('[' + type + ']', requestId, process.hrtime(), process.pid, err, reqBody, resBody);
        else if (type === 'flow')
            console.log(requestId && (requestId.substring(0, 4) + requestId.substring(requestId.length - 4)), _s.lpad('', 4), _s.rpad('', 3), _s.rpad(type, 5), _s.rpad(method, 5), url, reqBody);
        else {
            var time = (start && (getTimedifferenceMillis(start))) || '';
            var line = requestId + ' ' + _s.lpad(time, 6) + ' ' + _s.rpad(statusCode + '', 3) + ' ' + _s.rpad(type, 5) + ' ' + _s.rpad(method, 5);
            if (url) {
                if (url.length + line.length > 228)
                    line += ' ' + url.substring(0, 228 - line.length);
                else
                    line += url;
            }
            console.log(line);
        }
        return requestId;
    };
    return ConsoleLogger;
})();


function getTimedifferenceMillis(start) {
    var timespan = process.hrtime(start);
    return timespan[0] * 1000 + Math.round(timespan[1] / 1000000);
}
module.exports = ConsoleLogger;
