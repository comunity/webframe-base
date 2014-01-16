// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/q/Q.d.ts" />

import BaseMsg = require('./BaseMsg')
import Msg = require('./Msg')
import Q = require('q')

class Resource {
    read(track: string, accept: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    remove(track: string, accept: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    replace(track: string, rep: Msg, accept?: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    update(track: string, rep: Msg, accept?: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    exec(track: string, rep: Msg, accept?: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    methodNotAllowed(): Q.Promise<Msg> {
        return Q.fcall(() => new BaseMsg(405, null))
    }
}

export = Resource

