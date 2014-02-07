// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var BaseMsg = require('./BaseMsg');
var BufferMsg = require('./BufferMsg');
var ConsoleLogger = require('./ConsoleLogger');
var error = require('./error');
var Handler = require('./Handler');
var ObjectMsg = require('./ObjectMsg');
var privatiseHeaders = require('./privatiseHeaders');
var Resource = require('./Resource');

var Status = require('./Status');
var statusError = require('./statusError');
var StringMsg = require('./StringMsg');
var UserProfile = require('./UserProfile');

var o = {
    BaseMsg: BaseMsg,
    BufferMsg: BufferMsg,
    ConsoleLogger: ConsoleLogger,
    error: error,
    Handler: Handler,
    ObjectMsg: ObjectMsg,
    privatiseHeaders: privatiseHeaders,
    Resource: Resource,
    Status: Status,
    statusError: statusError,
    StringMsg: StringMsg,
    UserProfile: UserProfile
};

module.exports = o;
