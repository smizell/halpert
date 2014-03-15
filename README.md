# Halpert

[![Build Status](https://travis-ci.org/smizell/halpert.png?branch=master)](https://travis-ci.org/smizell/halpert)

Halpert is a library with the goal of teaching clients and servers about hypermedia formats they may not understand. Representations of a resource can be given to Halpert along with a desired media type, and Halpert will convert to this media type.

Halpert converts to and builds from the [Hyperdescribe](https://github.com/smizell/hyperdescribe) format, which is a format for describing a hypermedia resource. 

## Install

Use npm to install halpert.

```bash
npm install halpert
```

## Usage

### Parse from a media type to Hyperdescribe

```javascript
var halpert = new Halpert;
halpert.parse(uberDoc, 'application/vnd.amundsen-uber+json')
```

### Build to a media type from Hyperdescribe

```javascript
halpert.build(hyperdescribeObj, 'application/vnd.amundsen-uber+json')
```

### Build from one media type to another

```javascript
halpert.convertFrom(uberDoc, 'application/vnd.amundsen-uber+json').to('application/hal+json')
```

## Hypermedia Formats

### Creating object for Halpert to register

To register a form, Halpert requires a special object in order to know how
to register the format. An object has these distinct properties:

* `name` - Human-readable name for the media type. OPTIONAL.
* `mediaType` - A string that defines the media type template (application/hal+json). REQUIRED.
* `parser` - A function that takes a variable of some sort and returns a Hyperdescribe object.  REQUIRED.
* `builder` - A function that takes a Hyperdescribe object and build to the media type.  REQUIRED.

```javascript
HyperdescribeUberJSON = module.exports = {
  name: 'UBER',
  mediaType: 'application/vnd.amundsen-uber+json',
  parser: parser,
  builder: builder
}
```

### Registering Formats

```javascript
halpert.registerFormat(HyperdescribeUberJSON)
```

## Supported Formats

Currently supported formats:

* [UBER+JSON](https://github.com/smizell/hyperdescribe-uber-json) (NOT COMPLETE)