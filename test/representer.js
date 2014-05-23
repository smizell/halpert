var Representer = require('../lib/representer'),
    expect = require('expect.js');

// Generic parser/builder that returns `test` of given object
var parser = function(x) { return { parsed: !x.parsed } },
    builder = function(x) { return { built: !x.built } };

var formats = {
  'application/vnd.fake-format': {
    formatName: 'application/vnd.fake-format',
    parser: parser,
    builder: builder
  }
};

var repObject = {
  links: [
    {
      rels: [ "item" ],
      href: "/item1"
    },
    {
      rels: [ "item" ],
      href: "/item2"
    }
  ]
}

describe("Representer", function() {

  describe("#toFormat", function() {

    it("should convert data to specified format", function() {
      var data = { built: false },
          rep = new Representer(formats, data);

      newFormat = rep.toFormat("application/vnd.fake-format");
      expect(newFormat.built).to.equal(true);
    });
  });
});