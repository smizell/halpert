var cheerio = require("cheerio"),
    _ = require("underscore");

var loadHTML = function(html) {
  return cheerio.load(html)
}

var parseProperties = function($, properties) {
  return _.reduce(properties, function(memo, property) {
    var el = $(property),
        name = el.attr('property'),
        val = el.html();

    memo[name] = val;
    return memo;
  }, {})
}

var embeddedLinks = function($, el) {
  el.find('[resource]').remove();
  var selfLink = { self: [{href: el.attr('resource')}] },
      bodyLinks = parseLinks($, el.find('a[rel],link[rel]'), selfLink),
      links = _.extend(selfLink, bodyLinks);
  return halLinks(links);
}

var parseCuries = function(prefix_attr) {
  var prefix_re = /([^\s]+): ([^\s]+)/g,
      prefixes = prefix_attr.match(prefix_re);

  var curies = _.map(prefixes, function(prefix) {
    var items = prefix.split(': ');
    return {
      name: items[0],
      href: items[1],
      templated: true
    }
  });

  return { curies: curies };
}

var parseLinks = function($, links, currentLinks) {
  return _.reduce(links, function(memo, link) {
    var el = $(link),
        rel = el.attr('rel'),
        href = el.attr('href'),
        title = el.attr('title');

    if(!_.has(memo, rel)) memo[rel] = [];

    memo[rel].push({ href: href, title: title })
    return memo
  }, currentLinks)
}

var parseEmbedded = function($, resources) {
  var embedded = _.reduce(resources, function(memo, resource) {
    var el = $(resource),
        typeOf = el.attr('typeof');

    if(!typeOf) return memo;
    if(!_.has(memo, typeOf)) memo[typeOf] = [];

    var properties = parseProperties($, el.find('[property]'));
    var links = embeddedLinks($, el);
    memo[typeOf].push(_.extend(properties, links));
    return memo;
  }, {})
  return { _embedded: embedded }
}

var halLinks = function(links) {
  return {
    _links: links
  }
}

var Halpert = module.exports = function(html) {
  var $ = loadHTML(html),
      embedded = parseEmbedded($, $('body').find('[resource]'))
      curies = parseCuries($('html').attr('prefix')),
      headerLinks = parseLinks($, $('head').find('link[rel]'), {});

  // Now that we have the embedded, let's remove them
  $('[resource]').remove();

  var bodyLinks = parseLinks($, $('body').find('a[rel],link[rel]'), headerLinks),
      mainLinks = halLinks(_.extend(curies, headerLinks, bodyLinks)),
      mainProperties = parseProperties($, $('[property]'));

  return _.extend(mainLinks, mainProperties, embedded);
}



