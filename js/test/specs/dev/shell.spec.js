/*global jasmine, describe, beforeEach, it, expect, require */
describe('viewmodels/shell', function() {
  var shell = require('viewmodels/shell');

  it('should have a "router" property', function() {
        expect(shell.router).toBeDefined();
  });
});
