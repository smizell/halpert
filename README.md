# Halpert

This is a library for translating HTML5 to javascript objects. It currently pulls the data marked up using RDFa.

The code currently makes the following assumptions about your HTML.

1. It uses RDFa.
2. For curies, it will look in the `prefix` attribute on the `<html>` element.
3. For embedded objects, it looks for elements with a `resource` attribute.
4. The `self` links for embedded objects is the `resource` attribute.

This code does the following based on these assumptions.

1. Parses the embedded objects first, gettings links and properties
2. Parses out curies (currently, only one is parsed)
3. Parses links from the `<head>` element and from the body (excluding embedded resources)
4. Parses properties for resource

This is a first draft! Please post issues or contact me on Twitter at
[@Stephen_Mizell](http://twitter.com/Stephen_Mizell)