define(function (require) {
  var router = require('plugins/router');
  var ko = require('knockout');
  var models = require('models');
  var cache = require('cache');
  return function () {
    var binding = this;
    this.activate = function (number) {
      this.isNavigating = router.isNavigating;
      var par = cache.get(number);
      return ko.utils.extend(this, new models.ParViewModel(par));
    };
  };
});
