var $ = require("jquery")(require('jsdom').jsdom().parentWindow);

module.exports = function (html) {
    var $table = $(html).find('#resultFrom').find('table').first();

    var keys = [];
    var trains = [];

    $table.find('.resultlist_headline').find('td').each(function () {
        var key = $(this).text().trim();
        keys.push(key);
    });

    $table.children('tbody').children('.even, .odd').each(function () {
        var train = {};
        trains.push(train);
        $(this).children('td').each(function (index) {
            var key = keys[index];
            var htmlString = $(this).html();
            var text = $('<span>' + htmlString.split('<br>').join('\n') + '</span>').text().trim();
            if (key && text) {
                train[key] = text;
            }
        });
    });

    console.log(trains);

    return trains;
};