// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var error = require('./error');

var Status = (function () {
    function Status(statusCode, method, url, headers, code, message, lang, innererror) {
        this.statusCode = statusCode;
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.code = code;
        this.message = message;
        this.lang = lang;
        this.innererror = innererror;
    }
    Status.prototype.success = function () {
        return this.statusCode >= 200 && this.statusCode < 300;
    };
    Status.prototype.error = function (errFun) {
        var _this = this;
        if (this.success())
            return;

        return error(this, function () {
            return errFun(_this.toString());
        });
    };
    Status.prototype.check = function (errFun) {
        var err = this.error(errFun);
        if (err)
            throw err;
    };
    Status.prototype.toString = function () {
        return this.statusCode + (this.message ? ' ' + this.message : '') + ' ' + this.method + ' ' + this.url + ' ~';
    };
    Status.fromResponse = function (statusCode, method, url, headers, o) {
        var err = o && o['odata.error'];
        var status = new Status(statusCode, method, url, headers, err && err.code, err && err.message && err.message.value, err && err.message && err.message.lang, err && err.innererror);
        return status;
    };
    return Status;
})();

module.exports = Status;
