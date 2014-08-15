// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../typed/q/Q.d.ts" />
///<reference path="../typed/node/node.d.ts" />
var BaseMsg = require('./BaseMsg');
var crypto = require('crypto');

var Q = require('q');

var ObjectMsg = (function (_super) {
    __extends(ObjectMsg, _super);
    function ObjectMsg(statusCode, headers, _obj) {
        _super.call(this, statusCode, headers);
        this._obj = _obj;
    }
    ObjectMsg.prototype.json = function () {
        if (!this._json)
            this._json = JSON.stringify(this._obj);
        return this._json;
    };
    ObjectMsg.prototype.sha1 = function () {
        var shasum = crypto.createHash('sha1');
        shasum.update(this.json());
        return shasum.digest('hex');
    };
    ObjectMsg.prototype.cache = function (maxAge, etag) {
        return _super.prototype.cache.call(this, maxAge, maxAge && !etag ? this.sha1() : etag);
    };
    ObjectMsg.prototype.respond = function (res) {
        var body = this._obj && new Buffer(this.json());
        if (body) {
            res.setHeader('Content-Length', body.length.toString());
            if (body.length && this.statusCode !== 204)
                res.setHeader('Content-Type', 'application/json');
        }
        this.setHeaders(res);
        if (this.statusCode)
            res.writeHead(this.statusCode);
        res.end(body);
    };
    ObjectMsg.prototype.getBuffer = function () {
        var _this = this;
        return Q.fcall(function () {
            return new Buffer(_this.json());
        });
    };
    ObjectMsg.prototype.getString = function () {
        var _this = this;
        return Q.fcall(function () {
            return _this.json();
        });
    };
    ObjectMsg.prototype.getObject = function () {
        var _this = this;
        return Q.fcall(function () {
            return _this._obj;
        });
    };
    return ObjectMsg;
})(BaseMsg);

module.exports = ObjectMsg;
