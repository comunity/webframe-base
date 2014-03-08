// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />
var BaseMsg = require('./BaseMsg');

var Q = require('q');

var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.identified = function (uri) {
        return true;
    };
    Handler.prototype.acceptable = function (accept) {
        return true;
    };
    Handler.prototype.read = function (uri, up, reqId, maxAge, accept) {
        return this.methodNotAllowed();
    };
    Handler.prototype.readConditional = function (uri, up, reqId, maxAge, accept, ifNoneMatch, ifModifiedSince) {
        return this.read(uri, up, reqId, maxAge, accept);
    };
    Handler.prototype.remove = function (uri, up, reqId) {
        return this.methodNotAllowed();
    };
    Handler.prototype.replace = function (uri, up, reqId, message) {
        return this.methodNotAllowed();
    };
    Handler.prototype.update = function (uri, up, reqId, message, accept) {
        return this.methodNotAllowed();
    };
    Handler.prototype.exec = function (uri, up, reqId, message, accept) {
        return this.methodNotAllowed();
    };
    Handler.prototype.methodNotAllowed = function () {
        return Q.fcall(function () {
            return new BaseMsg(405);
        });
    };
    return Handler;
})();

module.exports = Handler;
