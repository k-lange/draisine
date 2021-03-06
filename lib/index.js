var request = require('request').defaults({ jar: true }),
    moment = require('moment');

var resultParser = require('./result-parser'),
    formParser = require('./form-parser');

var url = 'http://bahn.ltur.com',
    formUrl = url + '/ltb/searchform/external',
    searchUrl = url + '/ltb/search/external';

module.exports = function (options, callback) {
    request(formUrl, function (error, response, body) {

        if (error) {
            callback(error);
            return;
        }

        var form = formParser(body);

        form.from = options.from;
        form.to_spar = options.to;
        form.fromDate = moment(options.on).format('DD.MM.YYYY');

        request.post({
            url: searchUrl,
            formData: form
        }, function (error, response, body) {
            if (error) {
                callback(error);
                return;
            }

            var redirectPath = body.match(/<a href\=\"(.*)\"/)[1].split('/'),
                searchId = redirectPath[redirectPath.length - 1],
                filterUrl = url + '/ltb/searchfilter/' + searchId + '/H/spar/true';

            request(filterUrl, function (error, response, body) {
                if (error) {
                    callback(error);
                    return;
                }

                var data = JSON.parse(body);
                callback(null, resultParser(unescape(data.cnt)));
            });
        });
    });
};


