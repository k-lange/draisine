var $ = require('cheerio');

module.exports = function (html) {
    var $table = $(html).find('#resultFrom').find('table').first();

    var keys = [];
    var trains = [];

    $table.find('.resultlist_headline').find('td').each(function () {
        var key = $(this).text().trim();
        keys.push(key);
    });

    $table.children('.even, .odd').each(function () {
        var train = {};
        trains.push(train);

        $(this).children('td').each(function (index) {

            $(this).find('br').replaceWith(' ');

            var key = keys[index];
            var text = $(this).text().trim();

            if (key && text) {
                train[key] = text;
            }
        });
    });

    return trains;
};