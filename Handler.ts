// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />

import BaseMsg = require('./BaseMsg')
import Msg = require('./Msg')
import Q = require('q')
import url = require('url')

class Handler {
    identified(uri: url.Url): any {
        return true
    }
    acceptable(accept: any) {
        return true
    }
    read(uri: url.Url, user: string, reqId: string, maxAge: number, accept: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    remove(uri: url.Url, user: string, reqId: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    replace(uri: url.Url, user: string, reqId: string, message: Msg): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    update(uri: url.Url, user: string, reqId: string, message: Msg, accept?: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    exec(uri: url.Url, user: string, reqId: string, message: Msg, accept?: string): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    methodNotAllowed(): Q.Promise<Msg> {
        return Q.fcall(() => new BaseMsg(405))
    }
}

export = Handler
