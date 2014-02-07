// Copyright (c) ComUnity 2013
// hansm@comunity.co.za (Hans Malherbe)

import Resource = require('./Resource')
import UserProfile = require('./UserProfile')

interface ResourceFactory {
    create(url: string, up: UserProfile) : Resource
}

export = ResourceFactory