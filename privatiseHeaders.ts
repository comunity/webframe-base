// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

function privatiseHeaders(headers: any): any {
    var h = {}
    Object.keys(headers).forEach(headerName => {
        if (!privateHeaders[headerName])
            h[headerName] = headers[headerName]
    })
    return h
} 

export = privatiseHeaders

var privateHeaders = {
    authorization: true
}