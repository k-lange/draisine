var $ = require('cheerio');

module.exports = function (html) {
    var $form = $(html).find('#form_spar_topz'),
        $inputs = $form.find('[name]'),
        formData = {};

    $inputs.each(function () {
        if ($(this).attr('type') === 'radio' && !$(this).is(':checked')) {
            return;
        }

        formData[$(this).attr('name')] = $(this).val() || '';
    });

    return formData;
};