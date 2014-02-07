// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />
var BaseMsg = require('./BaseMsg');

var Q = require('q');

var BufferMsg = (function (_super) {
    __extends(BufferMsg, _super);
    function BufferMsg(statusCode, headers, _buffer) {
        _super.call(this, statusCode, headers);
        this._buffer = _buffer;
    }
    BufferMsg.prototype.respond = function (res) {
        if (this._buffer)
            res.setHeader('Content-Length', this._buffer.length.toString());
        this.setHeaders(res);
        if (this.statusCode)
            res.writeHead(this.statusCode);
        res.end(this._buffer);
    };
    BufferMsg.prototype.getBuffer = function () {
        var _this = this;
        return Q.fcall(function () {
            return _this._buffer;
        });
    };
    return BufferMsg;
})(BaseMsg);

module.exports = BufferMsg;
