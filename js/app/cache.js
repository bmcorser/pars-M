define(function (require) {
  var backendUrl = require('durandal/app').settings.backend;
  var ko = require('knockout');
  var koMapping = require('knockout-mapping');
  var http = require('plugins/http');
  var Q = require('q');
  var _ = require('lodash');

  var instruction = {
    object: 'par',
    read: {
      'filter': {},
      'properties': ['left', 'right'],
      'orderby': 'number',
      'reverse': true,
      'limit': 3
    }
  };
  var Cache = function Cache () {
    // cache par objects from the server 10 at a time
    var self = this;
    var mapping = {
      pars: {
        key: function(par) {
          return ko.utils.unwrapObservable(par.number);
        }
      }
    };
    this.pars = ko.observableArray([]);
    this._latest = ko.observable(null);
    this.add = function add (pars) {
      return koMapping.fromJS({pars: pars}, mapping, self);
    };
    this.fetch = function fetch (number) {
      return self.latest().then(function (latest) {
        return parseInt(latest.number(), 10);
      }).then(function (latestNumber) {
        var instructionLocal = _.clone(instruction);
        instructionLocal.read.offset = latestNumber - number;
        return http.post(backendUrl, instructionLocal).then(function (resp) {
          return resp.read;
        });
      });
    };
    this.maybeGet = function maybeGet (number) {
      // maybe get by number
      return ko.utils.arrayFirst(
        self.pars(),
        function (par) {
          return par.number() === number;
        }
      );
    };
    this.holds = function holds (number) {
      // do we have that cached?
      return self.maybeGet(number) !== null;
    };
    this.get = function get (number) {
      var parJS;
      if (!self.holds(number)){
        // fetch more and add them to the cache
        parJS = self.fetch(parseInt(number, 10)).then(function (pars) {
          self.add(pars);
          return self.maybeGet(number);
        });
      } else {
        // pick out of the cache
        parJS = self.maybeGet(number);
      }
      return Q.when(parJS);
    };
    this.latest = function latest () {
      if (!self._latest()) {
        return http.post(backendUrl, instruction).then(function (resp) {
          self.add(resp.read);
          self._latest(self.maybeGet(resp.read[0].number));
          return self._latest();
        });
      } else {
        return Q.resolve(self._latest());
      }
    };
  };
  return new Cache();
});
