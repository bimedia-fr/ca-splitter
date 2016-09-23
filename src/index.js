/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq:true*/
"use strict";

var fs = require('fs');

var certSeparator = '-----END CERTIFICATE-----';

module.exports = {
    parsePathSync: function (pathArray) {
        return (pathArray || []).reduce(function (carry, value) {
            return carry.concat(fs.readFileSync(value, {
                encoding: 'utf-8'
            }).split(certSeparator).slice(0, -1).map(function (cert) {
                return cert + certSeparator;
            }));
        }, []);
    }
};



    
