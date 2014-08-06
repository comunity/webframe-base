// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

interface Logger {
    log(type: string, requestId: string, start: number[], req, statusCode: number, user: string, headers, err, reqBody, resBody): string
    id(): string
}

export = Logger