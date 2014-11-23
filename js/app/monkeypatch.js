define(function (require) {
  var Q = require('q');
  // monkeypatchng of Q library for system and http modules
  return function monkeypatch (system, http) {
    system.defer = function (action) {
      var deferred = Q.defer();
      action.call(deferred, deferred);
      var promise = deferred.promise;
      deferred.promise = function() {
        return promise;
      };
      return deferred;
    };
    http.post = function (url, data, headers) {
      deferred = $.ajax({
        url: url,
        data: this.toJSON(data),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        headers: ko.toJS(headers)
      });
      return Q.when(deferred);
    };
  };
});
