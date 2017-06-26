var caParser = require('../src');

function expectResult(test, res, nb) {
    try{
        test.ok(Array.isArray(res), 'result is an Array');
        test.equal(nb, res.length);
        res.forEach(function (ca) {
            if(typeof ca !== 'string')console.log(ca);
            test.equal('string', typeof ca);
            test.ok(ca.startsWith('-----BEGIN CERTIFICATE-----'), 'starts with PEM declaration');
            test.ok(ca.endsWith('-----END CERTIFICATE-----'), 'ends with PEM declaration');
        });
    } catch(e) {
        console.log(e);
    } finally {
        test.done();
    }
}

module.exports = {
    testParseSyncSimple: function (test) {
        var res = caParser.parsePathSync([__dirname + '/test.pem']);
        return expectResult(test, res, 3);
    },
    testParseSyncStringSimple: function (test) {
        var res = caParser.parsePathSync(__dirname + '/test.pem');
        return expectResult(test, res, 3);
    },
    testParseSyncMultiple: function (test) {
        var res = caParser.parsePathSync([__dirname + '/test.pem', __dirname + '/test.pem']);
        return expectResult(test, res, 6);
    },
    testParseSimple: function (test) {
        var res = caParser.parsePath([__dirname + '/test.pem'], function (err, res) {
            test.ifError(err);
            return expectResult(test, res, 3);
        });
    },
    testParseStringSimple: function (test) {
        var res = caParser.parsePath(__dirname + '/test.pem', function (err, res) {
            test.ifError(err);
            return expectResult(test, res, 3);
        });
    },
    testParseMultiple: function (test) {
        var res = caParser.parsePath([__dirname + '/test.pem', __dirname + '/test.pem'], function (err, res) {
            test.ifError(err);
            return expectResult(test, res, 6);
        });
    }
};