var assert = require("assert"),
    jade = require('jade'),
    halpert = require("../lib/halpert"),
    example = require("../test/examples/example"),
    _ = require("underscore");

describe('Halpert', function() {
  var html = jade.renderFile('./test/examples/example.jade'),
      parsed = new halpert('html', html).toHal();

  describe('properties', function() {
    it('should populate properites', function() {
      assert(parsed.currentlyProcessing, parseInt(parsed.currentlyProcessing))
    })
  })

  describe('curies', function() {
    var html = jade.renderFile('./test/examples/multiple_curies.jade'),
        parsed = new halpert('html', html).toHal();

    it('should allow for multiple curies', function() {
      assert.equal(parsed._links.curies.length, 2);
    });

    it('should have {rel} on the end of the curie', function() {
      var curieHref = parsed._links.curies[0].href,
          relStr = '{rel}',
          endOfCurieHref = curieHref.substr(curieHref.length - relStr.length);
      assert.equal(endOfCurieHref, relStr);
    })
  })

  describe('main links', function() {
    it('should get the curie', function() {
      var exampleCurie = example._links.curies[0],
          parsedCurie = parsed._links.curies[0];

      assert.equal(exampleCurie.name, parsedCurie.name)
    })

    it('should get all of header links', function() {
      var exampleLinks = example._links,
          parsedLinks = parsed._links;

      assert.equal(exampleLinks.self[0].href, parsedLinks.self[0].href);
      assert.equal(exampleLinks.next[0].href, parsedLinks.next[0].href);
    })
  })

  describe('body links', function() {
    var exampleLinks = example._links,
        parsedLinks = parsed._links;

    it('should get the <a> elements', function() {
      var exampleKate = _.filter(exampleLinks['ea:admin'], function(link) {
        return link.title == 'Kate';
      })[0]

      var parsedKate = _.filter(parsedLinks['ea:admin'], function(link) {
        return link.title == 'Kate';
      })[0]

      assert.equal(exampleKate.href, parsedKate.href);
    })

    it('should get the <link> elements', function() {
      var html = jade.renderFile('./test/examples/link_tags.jade'),
          parsed = new halpert('html', html).toHal();

      assert.equal(_.has(parsed._links, 'ea:history'), true);
    })
  })

  describe('embedded', function() {
    var exampleEmbedded = example._embedded,
        parsedEmbedded = parsed._embedded,
        order = parsedEmbedded['ea:order'][0];

    it('should have the order array', function() {
      assert.equal(parsedEmbedded['ea:order'].length, exampleEmbedded['ea:order'].length)
    })

    it('should have the properites', function() {
      assert.equal(order.currency, "USD");
    })

    it('should have _links', function() {
      assert.equal(_.has(order, '_links'), true);
    })

    it('should have the self link', function() {
      assert.equal(_.has(order._links, 'self'), true);
    })

    it('should have a self link with href', function() {
      assert.equal(order._links.self[0].href, '/orders/123');
    })

    it('should have body links', function() {
      assert.equal(_.has(order._links, 'ea:basket'), true);
    })

    it('should get the <link> elements', function() {
      var html = jade.renderFile('./test/examples/link_tags.jade'),
          parsed = new halpert('html', html).toHal(),
          order = parsed._embedded['ea:order'][0]

      assert.equal(_.has(order._links, 'ea:customer'), true);
    })

    describe('nested resources', function() {
      var html = jade.renderFile('./test/examples/nested_resources.jade'),
          nested = new halpert('html', html).toHal();

      it('should have the right number of links', function() {
        var order = nested._embedded['ea:order'][0],
            orderLinkCount = _.keys(order._links).length;
        assert.equal(orderLinkCount, 2);

        var item = nested._embedded['ea:item'][0],
            itemLinkCount = _.keys(item._links).length;
        assert.equal(itemLinkCount, 3);
      })

      it('should have the right number of items', function() {
        assert.equal(nested._embedded['ea:order'].length, 1);
        assert.equal(nested._embedded['ea:item'].length, 2);
      })
    })

    // This is here because without a typeof attribute, we don't
    // know what kind of link relation it is
    describe('resource without typeof', function() {
      var html = jade.renderFile('./test/examples/typeof.jade'),
          parsed = new halpert('html', html).toHal();

      it('should not be included', function() {
        var embeddedCount = _.keys(parsed._embedded).length;
        assert.equal(embeddedCount, 0);
      })
    })
  })
})