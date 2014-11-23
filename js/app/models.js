define(function (require) {
  var backendUrl = require('durandal/app').settings.backend;
  var koMapping = require('knockout-mapping');
  var ko = require('knockout');

  var pad = function pad (number) {
    return ('0000' + number).slice(-4);
  };
  var ParViewModel = function (parJS) {
    var mapping = {
      'ignore': ['left_id', 'right_id', 'id', 'slug'],
      'left': {
        create: function (options) {
          return ko.observable(backendUrl + options.data.image);
        }
      },
      'right': {
        create: function (options) {
          return ko.observable(backendUrl + options.data.image);
        }
      },
    };
    koMapping.fromJS(parJS, mapping, this);
    this.olderHash = ko.computed(function () {
      return '#par/' + pad(this.number() - 1);
    }, this);
    this.fullTitle = ko.computed(function () {
      return this.number + ' ' + this.title;
    }, this);
  };
  return {
    pad: pad,
    ParViewModel: ParViewModel
  };
});
