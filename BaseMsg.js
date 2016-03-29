// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
///<reference path="../typed/q/Q.d.ts" />
var crypto = require('crypto');

var Q = require('q');

var BaseMsg = (function () {
    function BaseMsg(statusCode, headers) {
        this.statusCode = statusCode;
        this.headers = headers;
        if (!this.headers)
            this.headers = {};
    }
    BaseMsg.prototype.cache = function (maxAge, etag) {
        this.headers['Cache-Control'] = 'public, max-age=' + maxAge;
        this.headers['Vary'] = 'accept-encoding';
        if (etag)
            this.headers['ETag'] = '"' + etag + '"';
        return this;
    };
    BaseMsg.prototype.respond = function (res) {
        res.writeHead(this.statusCode);
        res.end();
    };
    BaseMsg.prototype.setHeaders = function (res) {
        var _this = this;
        if (this.headers && typeof this.headers === 'object')
            Object.keys(this.headers).forEach(function (header) {
                return res.setHeader(header, _this.headers[header]);
            });
    };
    BaseMsg.prototype.setHeader = function (res, header) {
        return setLocalHeader(res, this.headers, header);
    };
    BaseMsg.prototype.success = function () {
        return this.statusCode >= 200 && this.statusCode < 300;
    };
    BaseMsg.prototype.contentLength = function () {
        return numberHeader(this.headers, 'content-length');
    };
    BaseMsg.prototype.contentType = function () {
        return this.headers && this.headers['content-type'];
    };
    BaseMsg.prototype.getBuffer = function () {
        throw new Error('M.getBuffer not implemented');
    };
    BaseMsg.prototype.getString = function () {
        return this.getBuffer().then(function (buffer) {
            return buffer.toString();
        });
    };
    BaseMsg.prototype.getObject = function () {
        return this.getBuffer().then(function (buffer) {
            return buffer && buffer.length > 0 ? JSON.parse(buffer.toString()) : null;
        });
    };
    BaseMsg.prototype.getObjectWithDigest = function () {
        var _this = this;
        if (this._cachedObject) {
            return Q.fcall(function () {
                return _this._cachedObject;
            });
        }
        return this.getBuffer().then(function (buffer) {
            if (!buffer || buffer.length === 0)
                return null;
            var hash = crypto.createHash('sha1');
            hash.update(buffer);
            var digest = hash.digest('hex');
            var o = JSON.parse(buffer.toString());
            o.digest = digest;
            _this._cachedObject = o;
            return o;
        });
    };
    BaseMsg.prototype.check = function (o, errFun) {
        if (this.success())
            return;
        var detail = {
            statusCode: this.statusCode
        }, err = o && o['odata.error'];
        if (err) {
            detail.code = err.code;
            detail.message = err.message && err.message.value;
            detail.lang = err.message && err.message.lang;
            detail.innererror = err.innererror;
        }
        var error = errFun(detail.message);
        error['detail'] = detail;
        throw error;
    };
    return BaseMsg;
})();


function setLocalHeader(res, headers, header) {
    if (!headers || !headers[header])
        return false;
    res.setHeader(header, headers[header]);
    return true;
}

function numberHeader(headers, header) {
    var h = headers && headers[header];
    return h ? parseInt(h, 10) : 0;
}
module.exports = BaseMsg;
