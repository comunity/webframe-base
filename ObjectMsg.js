// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../typed/q/Q.d.ts" />
var BaseMsg = require('./BaseMsg');

var Q = require('q');

var ObjectMsg = (function (_super) {
    __extends(ObjectMsg, _super);
    function ObjectMsg(statusCode, headers, _obj) {
        _super.call(this, statusCode, headers);
        this._obj = _obj;
    }
    ObjectMsg.prototype.respond = function (res) {
        var body = this._obj && new Buffer(JSON.stringify(this._obj));
        if (body)
            res.setHeader('content-length', body.length.toString());
        res.setHeader('content-type', 'application/json');
        this.setHeaders(res);
        if (this.statusCode)
            res.writeHead(this.statusCode);
        return res.end(body);
    };
    ObjectMsg.prototype.getBuffer = function () {
        var _this = this;
        return Q.fcall(function () {
            return new Buffer(JSON.stringify(_this._obj));
        });
    };
    ObjectMsg.prototype.getString = function () {
        var _this = this;
        return Q.fcall(function () {
            return JSON.stringify(_this._obj);
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
