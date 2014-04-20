// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

///<reference path="../typed/node/node.d.ts" />
///<reference path="../typed/q/Q.d.ts" />

import BaseMsg = require('./BaseMsg')
import Msg = require('./Msg')
import Q = require('q')
import url = require('url')
import UserProfile = require('./UserProfile')

class Handler {
    identified(uri: url.Url): any {
        return true
    }
    acceptable(accept: any) {
        return true
    }
    read(uri: url.Url, up: UserProfile, reqId: string, headers, maxAge: number): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    readConditional(uri: url.Url, up: UserProfile, reqId: string, headers, maxAge: number): Q.Promise<Msg> {
        return this.read(uri, up, reqId, headers, maxAge)
    }
    remove(uri: url.Url, up: UserProfile, reqId: string, headers): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    replace(uri: url.Url, up: UserProfile, reqId: string, headers, message: Msg): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    update(uri: url.Url, up: UserProfile, reqId: string, headers, message: Msg): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    exec(uri: url.Url, up: UserProfile, reqId: string, headers, message: Msg): Q.Promise<Msg> {
        return this.methodNotAllowed()
    }
    methodNotAllowed(): Q.Promise<Msg> {
        return Q.fcall(() => new BaseMsg(405))
    }
}

export = Handler
