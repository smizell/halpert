var Halpert = require("../lib/halpert"),
    _ = require("underscore"),
    example = require("../test/examples/example"),
    expect = require('expect.js'),
    jade = require('jade'),
    html = jade.renderFile('./test/examples/example.jade');

describe('HTML', function() {
  beforeEach(function() {
    html = jade.renderFile('./test/examples/example.jade');
    resource = Halpert(html, 'text/html');
  })

  it('should parse to an object', function() {
    resource.parse();
    expect(resource.parsed).to.be.an(Object);
  })
})