define(function (require) {
  var router = require('plugins/router');
  var ko = require('knockout');
  var models = require('models');
  var cache = require('cache');
  return function () {
    var binding = this;
    this.activate = function (number) {
      this.isNavigating = router.isNavigating;
      return cache.get(number).then(function (parJS) {
        var par = new models.Par(parJS);
        return ko.utils.extend(binding, par);
      });
    };
  };
});
