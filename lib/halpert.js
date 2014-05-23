var Representer = require('./representer');

var Halpert = module.exports = function() {

  // Formats are the available formats for Halpert to use
  // when parsing and building media types
  this.formats = {};
};

Halpert.prototype.registerFormat = function(format) {
  this.formats[format.formatName] = format;
}

Halpert.prototype.represent = function(data, formatName) {
  return new Representer(this.formats, data, formatName);
}
