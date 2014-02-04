// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

import Authenticate = require('./Authenticate')
import BaseMsg = require('./BaseMsg')
import BufferMsg = require('./BufferMsg')
import ConsoleLogger = require('./ConsoleLogger')
import error = require('./error')
import Handler = require('./Handler')
import ObjectMsg = require('./ObjectMsg')
import privatiseHeaders = require('./privatiseHeaders')
import Resource = require('./Resource')
import ResourceFactory = require('./ResourceFactory')
import Status = require('./Status')
import statusError = require('./statusError')
import StringMsg = require('./StringMsg')

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
    StringMsg: StringMsg
}

export = o