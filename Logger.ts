// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

interface Logger {
    log(type: string, requestId: string, start: number[], method: string, url: string, statusCode: number, user?: string, reqHeaders?, err?, reqBody?, resBody?, resHeaders?): string
    id(): string
}

export = Logger