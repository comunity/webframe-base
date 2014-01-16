// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/q/Q.d.ts" />

import Q = require('q')

interface Authenicate {
    check(user: string, password: string, track: string): Q.Promise<boolean>
}

export = Authenicate