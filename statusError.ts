// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

import error = require('./error')

function statusError(statusCode: number, errFun: () => Error, method?: string, url?: string) {
    return error({ statusCode: statusCode, method: method, url: url }, errFun)
}

export = statusError