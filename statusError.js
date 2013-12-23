// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
var error = require('./error');

function statusError(statusCode, errFun, method, url) {
    return error({ statusCode: statusCode, method: method, url: url }, errFun);
}

module.exports = statusError;
