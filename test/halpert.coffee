Halpert = require('../lib/halpert')

chai = require('chai')
expect = chai.expect

format =
  formatName: 'application/vnd.fake-format'
  parser: (x) -> { parsed: !x.parsed }
  builder: (x) -> { built: !x.built }

describe "Halpert", ->
  halpert = {}

  beforeEach =>
    halpert = new Halpert();

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
      represent = halpert.represent({ parsed: false }, "application/vnd.fake-format")
      expect(represent.data.parsed).to.equal true 

    it "should load a represented object", ->
      halpert.registerFormat(format)
      represent = halpert.represent({ represented: true })
      expect(represent.data.represented).to.equal true 
