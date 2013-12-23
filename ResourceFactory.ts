// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

import Resource = require('./Resource')

interface ResourceFactory {
    create(url: string, user: string, pw: string) : Resource
}

export = ResourceFactory