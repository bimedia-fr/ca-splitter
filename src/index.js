/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq:true*/
"use strict";

var fs = require('fs'),
    unbundle = require('cert-unbundle');

var encoding = {
    encoding: 'utf-8'
};

module.exports = {
    parsePathSync: function (pathArray) {
        var paths = Array.isArray(pathArray) ? pathArray : [pathArray];
        return paths.reduce(function (carry, value) {
            return carry.concat(unbundle(fs.readFileSync(value, encoding)));
        }, []);
    },
    parsePath: function (pathArray, cb) {
        var paths = Array.isArray(pathArray) ? pathArray : [pathArray];
        var promises = paths.map(function (value) {
            return new Promise(function (resolve, reject) {
                fs.readFile(value, encoding, function (err, data) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(unbundle(data));
                })
            });
        });
        var all = Promise.all(promises);
        if (cb) {
            return all.then(function (res) {
                return cb(null, [].concat.apply([], res));
            }).catch(function (err) {
                return cb(err);
            });
        }
        return all;
    }
};




