// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../../typed/node/node.d.ts" />
///<reference path="../../typed/q/Q.d.ts" />
var BaseMsg = require('./BaseMsg');

var Q = require('q');

var StringMsg = (function (_super) {
    __extends(StringMsg, _super);
    function StringMsg(statusCode, headers, _content) {
        _super.call(this, statusCode, headers);
        this._content = _content;
    }
    StringMsg.prototype.respond = function (res) {
        var buffer = this._content && new Buffer(this._content);
        if (buffer)
            res.setHeader('content-length', buffer.length.toString());
        this.setHeaders(res);
        if (this.statusCode)
            res.writeHead(this.statusCode);
        return res.end(buffer);
    };
    StringMsg.prototype.getBuffer = function () {
        var _this = this;
        return Q.fcall(function () {
            return new Buffer(_this._content);
        });
    };
    StringMsg.prototype.getString = function () {
        var _this = this;
        return Q.fcall(function () {
            return _this._content;
        });
    };
    StringMsg.prototype.getObject = function () {
        var _this = this;
        return Q.fcall(function () {
            return JSON.parse(_this._content);
        });
    };
    return StringMsg;
})(BaseMsg);

module.exports = StringMsg;
