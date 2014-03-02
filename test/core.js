var Halpert = require("../lib/halpert"),
    _ = require("underscore"),
    example = require("../test/examples/example"),
    expect = require('expect.js'),
    jade = require('jade'),
    html = jade.renderFile('./test/examples/example.jade');

describe('Halpert Core', function() {

  describe('init', function() {
    it('should set initialData', function() {
      var data = '<h1>data</h1>';
          resource = Halpert(data, 'text/html');
      expect(resource.initialData).to.equal(data);
    })
  })

  describe('parse', function() {
    it('should set the parsed data', function() {
      var resource = Halpert(html, 'text/html').parse();
      expect(resource.parsed).to.not.be(undefined);
    })
  })

  describe('convertTo', function() {
    it('should return an HAL object', function() {
      var halObj = Halpert(html, 'text/html').convertTo('application/hal+json');
      expect(halObj).to.be.an(Object);
    })

    it('should not work if the format is not registered', function() {
      var noObj = Halpert(html, 'text/html').convertTo('not-register');
      expect(noObj).to.equal(undefined);
    })
  })
})