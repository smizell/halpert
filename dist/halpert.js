(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// `Converter` is an object for converter to an from media types
var Converter = function(formats) {
  this.formats = formats;
  this.described = null;

  // Given a representation and a media type, this should describe 
  // the representation.
  this.describe = function(rep, mediaType) {
    return this.formats[mediaType].describer(rep);
  };

  // Given a representation (should be Hyperdescribe) and a
  // media type, this should build a new representation of the
  // the given media type.
  this.build = function(rep, mediaType) {
    return this.formats[mediaType].builder(rep);
  };

  // Given a representation and a media type, this should describe 
  // a representation of the of the media type given to Hyperdescribe
  // and return this `Converter` object.
  this.convertFrom = function(rep, mediaType) {
    this.described = this.formats[mediaType].describer(rep);
    return this;
  };

  // Wrapper for `build` method to allow for chaining and common
  // language:
  // Converter.convertFrom(rep, mediaType).to(newMediaType)
  this.to = function(mediaType) {
    return this.build(this.described, mediaType);
  };
};

// `Halpert is an object for registering media types and for
// wrapping `Converter` methods for easy access.
var Halpert = module.exports = function() {

  // Formats are the available formats for Halpert to use
  // when describing and building media types
  this.formats = {};

  // For registering a media type for Halpert to describe from
  // or build to. 
  this.registerFormat = function(format) {
    this.formats[format.mediaType] = format;
  };

  // Copy of `Converter` object
  this.Converter = Converter;

  // Wrapper for `describe` method on `Converter` object
  this.describe = function(rep, mediaType) {
    return new Converter(this.formats).describe(rep, mediaType);
  };

  // Wrapper for `build` method on `Converter` object
  this.build = function(rep, mediaType) {
    return new Converter(this.formats).build(rep, mediaType);
  };

  // Wrapper for `convertFrom` method on `Converter` object
  this.convertFrom = function(rep, mediaType) {
    return new Converter(this.formats).convertFrom(rep, mediaType);
  };
};

},{}]},{},[1])