var $ = require('cheerio');

module.exports = function (html) {
    var $table = $(html).find('#resultFrom').find('table').first(),
        keys = $table.find('.resultlist_headline td').map(function () {
            return $(this).text().trim();
        }).get();

    return $table.children('.even, .odd').map(function () {
        var train = {};

        $(this).children('td').each(function (index) {

            $(this).find('br').replaceWith(' ');

            var key = keys[index],
                text = $(this).text().trim();

            if (key && text) {
                train[key] = text;
            }
        });

        return train;

    }).get();
};