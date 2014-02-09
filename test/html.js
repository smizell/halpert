var Halpert = require("../lib/halpert"),
    _ = require("underscore"),
    example = require("../test/examples/example"),
    expect = require('expect.js'),
    jade = require('jade'),
    html = jade.renderFile('./test/examples/example.jade');

describe('HTML', function() {
  var html = jade.renderFile('./test/examples/example.jade');

  it('should return an object', function() {
    var htmlParsed = Halpert.convert(html).from('html')
    expect(htmlParsed.parsedData).to.be.an(Object);
  })
})