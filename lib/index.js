var request = require('request').defaults({ jar: true });
var resultParser = require('./result-parser');
var formParser = require('./form-parser');

var url = 'http://bahn.ltur.com';
var formUrl = url + '/ltb/searchform/external';
var searchUrl = url + '/ltb/search/external';

module.exports = function (options, callback) {
    request(formUrl, function (error, response, body) {
        var form = formParser(body);

        form.from = options.from;
        form.to_spar = options.to;
        form.fromDate = options.on;

        request.post({
            url: searchUrl,
            formData: form
        }, function (error, response, body) {
            var resultPath = body.match(/<a href\=\"(.*)\"/)[1];
            var searchId = resultPath.split('/');
            searchId = searchId[searchId.length - 1];

            request(url + '/ltb/searchfilter/' + searchId + '/H/spar/true', function (error, response, body) {
                var data = JSON.parse(body);
                callback(resultParser(unescape(data.cnt)));
            });
        });
    });
};


