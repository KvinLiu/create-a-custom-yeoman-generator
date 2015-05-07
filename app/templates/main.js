/**
 * @author <%= appauthor %>
 * @license <%= applicense %>
 */
require(['config'], function () {
    'use strict';

    require(['scripts/module'], function (module) {
        console.log(module.testString);
    });

});
