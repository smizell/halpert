var _ = require("underscore");

var buildLinks = function(links) {
  return {
    _links: links
  }
}

var buildCuries = function(curies) {
  return _.map(curies, function(curie) {
    return {
      name: curie.name,
      href: curie.href + '{rel}',
      templated: true
    }
  });
}

var buildEmbedded = function(embedded) {
  var resources = {}
  _.each(embedded, function(val, key) {
    resources[key] = _.map(val, function(resource) {
      return _.extend(resource.properties, buildLinks(resource.links));
    })
  })
  return { _embedded: resources };
}

var build = module.exports.build = function(data) {
  var curies = buildCuries(data.curies),
      links = buildLinks(data.links),
      embedded = buildEmbedded(data.embedded);

  links._links.curies = curies;

  return _.extend(links, data.properties, embedded);
}