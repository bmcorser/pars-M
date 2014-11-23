requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    'knockout': '../lib/knockout/knockout-2.3.0',
    'knockout-mapping': '../lib/knockout-mapping/build/output/knockout.mapping-latest',
    'bootstrap': '../lib/bootstrap/js/bootstrap',
    'jquery': '../lib/jquery/jquery-1.9.1',
    'moment': '../lib/moment/min/moment.min',
    'q': '../lib/q',
    'monkeypatch': 'monkeypatch',
    'models': 'models'
  }
});

define(function (require) {
  var system = require('durandal/system');
  var http = require('plugins/http');
  var monkeypatch = require('monkeypatch');
  //monkeypatch(system, http);
  //>>excludeStart("build", true);
  system.debug(true);
  //>>excludeEnd("build");
  var app = require('durandal/app');
  app.settings = {backend: 'http://localhost:6543/'};
  var viewLocator = require('durandal/viewLocator');
  app.title = 'Pars, 2010';
  app.configurePlugins({router: true});
  app.start().then(function() {
    viewLocator.useConvention();
    app.setRoot('viewmodels/shell');
  });
});
