var Halpert = require('../lib/halpert'),
    expect = require('expect.js');

// Generic parser/builder that returns `test` of given object
var parser = function(x) { return { parsed: !x.parsed } },
    builder = function(x) { return { built: !x.built } };

var format = {
  formatName: 'application/vnd.fake-format',
  parser: parser,
  builder: builder
};

var hyperdecribe = {};

describe("Halpert", function() {

  beforeEach(function() {
    halpert = new Halpert();
  });

  describe("#formats", function() {

    it("should be an object", function() {
      expect(halpert.formats).to.be.an(Object);
    });
  });

  describe("#registerFormat", function() {

    it("should add a format to formats", function() {
      expect(Object.keys(halpert.formats).length).to.equal(0);
      halpert.registerFormat(format);
      expect(Object.keys(halpert.formats).length).to.equal(1);
    });
  });

  describe("#represent", function() {

    it("should load a representation of format", function() {
      halpert.registerFormat(format);
      represent = halpert.represent({ parsed: false }, "application/vnd.fake-format");
      expect(represent.data.parsed).to.equal(true);
    });

    it("should load a represented object", function() {
      halpert.registerFormat(format);
      represent = halpert.represent({ represented: true });
      expect(represent.data.represented).to.equal(true);
    })
  }); 
});
