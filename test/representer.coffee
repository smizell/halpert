Representer = require('../lib/representer')
expect = require('expect.js')

formats =
  'application/vnd.fake-format':
    formatName: 'application/vnd.fake-format'
    parser: (x) -> { parsed: !x.parsed }
    builder: (x) -> { built: !x.built }

repObject =
  links: [
    { rels: [ "item" ], href: "/item1" }
    { rels: [ "item" ], href: "/item2" }
    { rels: [ "next" ], href: "/next" }
  ]

describe "Representer", ->
  describe "#toFormat", ->
    it "should convert data to specified format", ->
      data = { built: false }
      rep = new Representer(formats, data)
      newFormat = rep.toFormat("application/vnd.fake-format")
      expect(newFormat.built).to.equal true