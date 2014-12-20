var $ = require('cheerio');

module.exports = function (html) {
    var $form = $(html).find('#form_spar_topz');
    var $inputs = $form.find('[name]');

    var formData = {};

    $inputs.each(function () {
        if ($(this).attr('type') === 'radio' && !$(this).is(':checked')) {
            return;
        }

        formData[$(this).attr('name')] = $(this).val() || '';
    });

    return formData;
};