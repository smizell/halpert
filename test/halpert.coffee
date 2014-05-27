Halpert = require('../src/halpert')

chai = require('chai')
expect = chai.expect

# The parsers and builders will do the work here, so we have
# a very basic parser.

format =
  formatName: 'application/vnd.fake-format'
  parser: (formats, data, formatName) -> { parsed: !data.parsed }

describe "Halpert", ->
  halpert = {}

  beforeEach ->
    halpert = new Halpert

  describe "#formats", ->
    it "should be an object", ->
      expect(halpert.formats).to.be.an('object')

  describe "#registerFormat", ->
    it "should add a format to formats", ->
      expect(Object.keys(halpert.formats).length).to.equal 0
      halpert.registerFormat(format)
      expect(Object.keys(halpert.formats).length).to.equal 1

  describe "#represent", ->
    it "should load a representation of format", ->
      halpert.registerFormat(format)
      represent = halpert.represent({ parsed: false },
        "application/vnd.fake-format")
      expect(represent.parsed).to.equal true
