# Halpert

[![Build Status](https://travis-ci.org/smizell/halpert.png?branch=master)](https://travis-ci.org/smizell/halpert)

This is a library for converting one media type to another. It currently only supports converting from HTML+RDFa to HAL+JSON. 

The idea behind this library is that it parses a media type into a standardized format, and from that format can build to other media types that have build code. Right now, this standardized format is basic and undocumented, but the goal will be to move to [Hyperdescribe](https://github.com/smizell/hyperdescribe) once it is stable and ready for use.

This is a first draft! Please post issues or contact me on Twitter at
[@Stephen_Mizell](http://twitter.com/Stephen_Mizell)

## Install

Use npm to install halpert.

```bash
npm install halpert
```

## Usage

This example below is for converting from HTML+RDFa to HAL+JSON

```javascript
var Halpert = require('halpert');

// Load HTML from file, Jade, or however you wish first
var html = jade.renderFile('./test/examples/example.jade');

// Convert HTML to HAL
hal = Halpert(html, 'text/html').convertTo('application/hal+json');
```

See the test and example files for more examples for how this is used.