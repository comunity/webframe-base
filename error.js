// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)
function error(detail, errFun) {
    var err = errFun();
    err['detail'] = detail;
    return err;
}

module.exports = error;
