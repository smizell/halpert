var Halpert = require("../lib/halpert"),
    _ = require("underscore"),
    example = require("../test/examples/example"),
    expect = require('expect.js'),
    jade = require('jade'),
    html = jade.renderFile('./test/examples/example.jade');

describe('Halpert Core', function() {

  describe('convert', function() {
    it('should set initialData', function() {
      var data = 'data';
          halpert = Halpert.convert(data);
      expect(halpert.initialData).to.equal(data);
    })
  })

  describe('from', function() {
    it('should set the parsedData', function() {
      var halpert = Halpert.convert(html).from('html');
      expect(halpert.parsedData).to.not.be(undefined);
    })
  })

  describe('to', function() {
    it('should return an HAL object', function() {
      var halObj = Halpert.convert(html).from('html').to('hal_json');
      expect(halObj).to.be.an(Object);
    })

    it('should convert based on the initialData', function() {
      var halObj = Halpert.convert(html).from('html')
      var parsedData = halObj.parsedData;
      var newHalObj = Halpert.convert(parsedData).to('hal_json');
      expect(newHalObj).to.be.an(Object);
    })

    it('should not work if there is no initialData', function() {
      Halpert.reset();
      var halObj = Halpert.to('hal_json');
      expect(halObj).to.equal(undefined);
    })

    it('should not work if the format is not registered', function() {
      Halpert.reset();
      var halObj = Halpert.to('not_registered');
      expect(halObj).to.equal(undefined);
    })
  })

  describe('reset', function() {
    it('should remove inital and parsed data', function() {
      var halObj = Halpert.convert(html).from('html');
      halObj.reset();
      expect(halObj.initialData).to.be(undefined);
      expect(halObj.parsedData).to.be(undefined);
    })
  })
})