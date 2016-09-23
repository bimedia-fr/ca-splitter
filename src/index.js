/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq:true*/
"use strict";

var fs = require('fs');

var certSeparator = '-----END CERTIFICATE-----';

module.exports = {
    parsePathSync: function(pathArray) {
        var message, success = true;
        var caList = (pathArray || []).reduce(function (carry, value) {
            try {
                return carry.concat(fs.readFileSync(value, {
                    encoding: 'utf-8'
                }).split(certSeparator).slice(0, -1).map(function (cert) {
                    return cert + certSeparator;
                }));
            }
            catch (e) {
                success = false;
                return carry;
            }
        }, []);
        if(success) {
            return caList;
        }
        return false;
    }
};



    
