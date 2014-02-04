# Halpert

This is a library for translating HTML5 to [HAL](http://stateless.co/hal_specification.html). It currently pulls the data marked up in RDFa.

The code currently makes the following assumptions about your HTML.

1. It uses RDFa.
2. For curies, it will look in the `prefix` attribute on the `<html>` element.
3. For embedded objects, it looks for elements with a `resource` attribute.
4. The `self` links for embedded objects is the `resource` attribute.

This code does the following based on these assumptions.

1. Parses the embedded objects first, gettings links and properties
2. Parses out curies (currently, only one is parsed)
3. Parses links from the `<head>` element and from the body (excluding embedded resources). Note: body links are only parsed if they have a rel
4. Parses properties for resource

This is a first draft! Please post issues or contact me on Twitter at
[@Stephen_Mizell](http://twitter.com/Stephen_Mizell)

## Install

Use npm to install halpert.

```bash
npm install halpert
```

## Usage

```javascript
var halpert = require('halpert');

// Load HTML from file, Jade, or however you wish first
// I'm assuming below it's loaded to html

// Parse HTML to HAL
parsedHAL = halpert(html);
```

See `test/test.js` file for uses and the `test/examples/example.jade` file for what the file looks like.