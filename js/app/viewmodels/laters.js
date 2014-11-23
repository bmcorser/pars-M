define(function (require) {
  var router = require('plugins/router');
  var cache = require('cache');
  var ko = require('knockout');
  var models = require('models');
  return {
    activate: function () {
      var binding = this;
      this.isNavigating = router.isNavigating;
      return cache.latest().then(function (parJS) {
        par = new models.Par(parJS);
        return ko.utils.extend(binding, par);
      });
    }
  };
});
