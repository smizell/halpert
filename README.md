# Halpert

[![Build Status](https://travis-ci.org/smizell/halpert.png?branch=master)](https://travis-ci.org/smizell/halpert)

Halpert is a library for representing and interfacing with hypermedia formats. It provides a way for converting to and from these formats, along with methods for filtering and parsing through them in a general way.

## Install

Use npm to install halpert.

```bash
npm install halpert
```

## Supported Formats

* [HAL+JSON](https://github.com/smizell/halpert-hal-json) - Currently only parses HAL objects

## Usage

### Initializing and Registering Formats

To initialize a Halpert object and register the formats, require the halpert package along with any formats desired. The example below includes the HAL+JSON format.

```javascript
var Halpert = require('halpert'),
    halJson = require('halpert-hal-json');

halpert = new Halpert;
halpert.registerFormat(halJson);
```

### Representing Documents

Once you have a Halpert object like above, you can then start representing documents.

```javascript
var doc = {
  _links: { self: { href: "/customer/4" }},
  full_name: "John Doe",
  email: "john@doe.com"
}

var representer = halpert.represent(doc, 'application/hal+json');
```

## Creating Halpert Plugins

More on this to come. Each plugin will use the [Halpert Representer library](http://github.com/smizell/halpert-representer).

## Contributing

* Please make sure all contributions are covered by tests
* Run `gulp build` once all changes are complete
