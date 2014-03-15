var Halpert = require('../lib/halpert'),
    expect = require('expect.js');

var parser = function(x) { return "parsed " + x; },
    builder = function(x) { return "built from " + x; };

var format1 = {
  name: 'format1',
  mediaType: 'application/vnd.fake-format1',
  parser: parser,
  builder: builder
};

var format2 = {
  name: 'format2',
  mediaType: 'application/vnd.fake-format2',
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
      halpert.registerFormat(format1);
      expect(Object.keys(halpert.formats).length).to.equal(1);
    });
  });

  describe("#parse", function() {

    it("should parse a format", function() {
      halpert.registerFormat(format1);
      var parsed = halpert.parse("1", "application/vnd.fake-format1");
      expect(parsed).to.equal("parsed 1");
    });
  });

  describe("#build", function() {

    it("should parse a format", function() {
      halpert.registerFormat(format1);
      var parsed = halpert.build("hyperdecribe", "application/vnd.fake-format1");
      expect(parsed).to.equal("built from hyperdecribe");
    });
  });

  describe("#convertFrom", function() {

    beforeEach(function() {
      halpert.registerFormat(format1);
    });

    it("should return a converter object", function() {
      var converter = halpert.convertFrom("unparsed", "application/vnd.fake-format1");
      expect(converter).to.be.an(halpert.Converter);
      expect(converter).to.have.key("to");
    });
  });

  describe("#to", function() {

    beforeEach(function() {
      halpert.registerFormat(format1);
      halpert.registerFormat(format2);
    });

    it("should return a built value", function() {
      var converter = halpert.convertFrom("example", "application/vnd.fake-format1");
      var newFormat = converter.to("application/vnd.fake-format2");
      expect(newFormat).to.equal("built from parsed example");
    });
  });
});
