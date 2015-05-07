/**
 * @author <%= appauthor %>
 * @license <%= applicense %>
 */
define(['scripts/module'], function (module) {
    'use strict';

    describe('The module', function () {
        it('has a property called testString', function () {
            expect(module.testString).toEqual('require working!');
        });
    });

});
