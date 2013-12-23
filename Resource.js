// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
///<reference path="../../typed/q/Q.d.ts" />
var BaseMsg = require('./BaseMsg');

var Q = require('q');

var Resource = (function () {
    function Resource() {
    }
    Resource.prototype.read = function (track, accept) {
        return this.methodNotAllowed();
    };
    Resource.prototype.remove = function (track, accept) {
        return this.methodNotAllowed();
    };
    Resource.prototype.replace = function (track, rep, accept) {
        return this.methodNotAllowed();
    };
    Resource.prototype.update = function (track, rep, accept) {
        return this.methodNotAllowed();
    };
    Resource.prototype.exec = function (track, rep, accept) {
        return this.methodNotAllowed();
    };
    Resource.prototype.methodNotAllowed = function () {
        return Q.fcall(function () {
            return new BaseMsg(405, null);
        });
    };
    return Resource;
})();

module.exports = Resource;
