requirejs.config({
  paths: {
    'lodash': '../lib/lodash.min',
    'q': '../lib/q',
    'knockout': '../lib/knockout/knockout-2.3.0',
    'text': '../lib/require/text',
    'knockout-mapping': '../lib/knockout-mapping/build/output/knockout.mapping-latest',
    'jquery': '../lib/jquery/jquery-1.9.1',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    // 'monkeypatch': 'monkeypatch',
    'models': 'models'
  }
});

define(function (require) {
  var system = require('durandal/system');
  var http = require('plugins/http');
  // var monkeypatch = require('monkeypatch');
  // monkeypatch(system, http);
  //>>excludeStart("build", true);
  system.debug(true);
  //>>excludeEnd("build");
  var app = require('durandal/app');
  app.settings = {backend: 'http://localhost:7654/'};
  var viewLocator = require('durandal/viewLocator');
  app.title = 'Pars, 2010';
  app.configurePlugins({router: true});
  app.start().then(function() {
    viewLocator.useConvention();
    app.setRoot('viewmodels/shell');
  });
});
