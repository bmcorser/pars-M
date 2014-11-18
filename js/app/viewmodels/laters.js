define(function(require) {
  var http = require('plugins/http');
  var router = require('plugins/router');
  var app = require('durandal/app');
  var ko = require('knockout');
  var instruction = {
    object: 'par',
    read: {
      'filter': {},
      'properties': ['left', 'right'],
      'orderby': 'number',
      'reverse': true,
      'limit': 2
    }
  };
  return {
    left: ko.observable(),
    right: ko.observable(),
    title: ko.observable(),
    hidden: ko.observable(),
    olderHash: ko.observable(),
    activate: function () {
      that = this;
      return http.post(app.settings.backend, instruction)
                 .then(function (resp) {
                   that.olderHash = '#' + resp.read[1].number;
                   var par = resp.read[0];
                   that.left(app.settings.backend + par.left.image);
                   that.right(app.settings.backend + par.right.image);
                   that.hidden(par.hidden);
                   that.title(par.number + ' ' + par.title);
                 });
    }
  };
});
