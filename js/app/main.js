requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    'knockout': '../lib/knockout/knockout-2.3.0',
    'bootstrap': '../lib/bootstrap/js/bootstrap',
    'jquery': '../lib/jquery/jquery-1.9.1'
  }
});

define(function (require) {
  var system = require('durandal/system');

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
