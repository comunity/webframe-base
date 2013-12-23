// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

import error = require('./error')

class Status {
    constructor(public statusCode: number,
        public method: string,
        public url: string,
        public headers: {},
        public code?: string,
        public message?: string, 
        public lang?: string, 
        public innererror?: string) {
    }

    success(): boolean {
        return this.statusCode >= 200 && this.statusCode < 300
    }
    error(errFun: (message: string) => any): {} {
        if (this.success())
            return

        return error(this, () => errFun(this.toString()))
    }
    check(errFun: (message: string) => any) {
        var err = this.error(errFun)
        if (err)
            throw err
    }
    toString(): string {
        return this.statusCode + (this.message ? ' ' + this.message : '') + ' ' + this.method + ' ' + this.url + ' ~'
    }
    static fromResponse(statusCode: number, method: string, url: string, headers: {}, o: {}) {
        var err = o && o['odata.error']
        var status = new Status(statusCode, method, url, headers, err && err.code, err && err.message && err.message.value, err && err.message && err.message.lang, err && err.innererror)
        return status
    }
}

export = Status