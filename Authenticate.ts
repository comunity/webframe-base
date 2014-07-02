// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />

import http = require('http')
import Q = require('q')

interface Authenicate {
    check(user: string, password: string, req: http.ServerRequest, track: string): Q.Promise<boolean>
}

export = Authenicate