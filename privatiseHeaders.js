// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
function privatiseHeaders(headers) {
    var h = {};
    Object.keys(headers).forEach(function (headerName) {
        if (!privateHeaders[headerName])
            h[headerName] = headers[headerName];
    });
    return h;
}


var privateHeaders = {
    authorization: true
};
module.exports = privatiseHeaders;
