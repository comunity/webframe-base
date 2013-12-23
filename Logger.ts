// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

interface Logger {
    log(type: string, requestId: string, ctx: any)
}

export = Logger