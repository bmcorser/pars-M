
/* Experimental Jasmine tests running against main.js in build directory (not individual modules like "dev".
 * For cross browser integration tests check out http://saucelabs.com */

/*global jasmine, describe, beforeEach, it, expect, require, waitsFor, runs, define, $, spyOn */

// Adding required 'applicationHost' container to body
document.body.innerHTML += '<div id="applicationHost" style="display: none"></div>';

// By defining main as dependency we can test modules that are main dependencies
// Important: router, dialog, widget CAN'T be tested by default, because they are loaded be 'configurePlugins'
// In order to test them they need to be included into the dependency array

define(['plugins/router', 'main'], function( router ) {
    'use strict';

    describe('div#applicationhost', function() {
        it('should be empty when starting"', function() {
            expect($('#applicationHost').html()).toBe('');
        });
    });

    describe('app', function() {
        var app = require('durandal/app');

        it('should have a title property', function() {
            expect(app.title).toBeDefined();
        });
    });

});


