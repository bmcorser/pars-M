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
  
  return function () {
    this.number = ko.observable();
    this.title = ko.observable();
    this.left = ko.observable();
    this.right = ko.observable();
    this.hidden = ko.observable();

    this.olderHash = ko.computed(function () {
      if (!this.number()) {
        return;
      }
      return '#' + (this.number() - 1);
    }, this);

    this.activate = function (number) {
      instruction.read.filter.number = number;
      that = this;
      return http.post(app.settings.backend, instruction)
                 .then(function (resp) {
                   var par = resp.read[0];
                   that.left(app.settings.backend + par.left.image);
                   that.right(app.settings.backend + par.right.image);
                   that.hidden(par.hidden);
                   that.number(par.number);
                   that.title(par.number + ' ' + par.title);
                 });
    };
  };
});
