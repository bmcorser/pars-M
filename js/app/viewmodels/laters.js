define(function (require) {
  var router = require('plugins/router');
  var cache = require('cache');
  var ko = require('knockout');
  var models = require('models');
  return {
    activate: function () {
      this.isNavigating = router.isNavigating;
      var par = new models.ParViewModel(cache.latest());
      return ko.utils.extend(this, par);
    }
  };
});
