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
    ConsoleLogger.prototype.log = function (type, requestId, start, req, statusCode, user, headers, err, reqBody, resBody) {
        if (!requestId)
            requestId = this.id();
        if (type === 'error' && (statusCode && statusCode >= 500))
            console.log('[' + type + ']', requestId, process.hrtime(), process.pid, err, reqBody, resBody);
        else if (type === 'flow')
            console.log(requestId && (requestId.substring(0, 4) + requestId.substring(requestId.length - 4)), _s.lpad('', 4), _s.rpad('', 3), _s.rpad(type, 5), _s.rpad(req && req.method, 5), req && req.url, reqBody);
        else {
            var time = (start && (getTimedifferenceMillis(start))) || '';
            if (req && req.url)
                console.log(requestId, _s.lpad(time, 6), _s.rpad(statusCode + '', 3), _s.rpad(type, 5), _s.rpad(req && req.method, 5), req.url);
            else
                console.log('[' + type + ']', requestId, process.hrtime(), process.pid);
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
