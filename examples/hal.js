var Halpert = require('halpert');
var halJson = require('halpert-hal-json');

var order = {
  "_links": {
    "self": { "href": "/orders" },
    "curies": [{ "name": "ea", "href": "http://example.com/docs/rels/{rel}", "templated": true }],
    "next": { "href": "/orders?page=2" },
    "ea:find": {
      "href": "/orders{?id}",
      "templated": true
    },
    "ea:admin": [{
      "href": "/admins/2",
      "title": "Fred"
    }, {
      "href": "/admins/5",
      "title": "Kate"
    }]
  },
  "currentlyProcessing": 14,
  "shippedToday": 20,
  "_embedded": {
    "ea:order": [{
      "_links": {
        "self": { "href": "/orders/123" },
        "ea:basket": { "href": "/baskets/98712" },
        "ea:customer": { "href": "/customers/7809" }
      },
      "total": 30.00,
      "currency": "USD",
      "status": "shipped"
    }, {
      "_links": {
        "self": { "href": "/orders/124" },
        "ea:basket": { "href": "/baskets/97213" },
        "ea:customer": { "href": "/customers/12369" }
      },
      "total": 20.00,
      "currency": "USD",
      "status": "processing"
    }]
  }
}

// Initialize Halpert object
halpert = new Halpert;

// Register HAL+JSON format
halpert.registerFormat(halJson);

// Represent the order object
representer = halpert.represent(order, 'application/hal+json')

// Sample API Examples
//
// representer.links.all();
// representer.links.filterByRel('next');
// representer.templatedLinks.all();
// representer.partials.all()[0].properties.total;
// representer.partials.all()[0].links.filterByRel('self');
// representer.prefixes.all()[0];
// representer.properties.currentlyProcessing;