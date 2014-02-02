// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

interface Logger {
    log(type: string, id: string, ctx: any): string
    id(): string
}

export = Logger