var _ = require('lodash');

var Representer = module.exports = function(formats, data, formatName) {
  this.formats = formats;
  this.data = formatName ? this.parse(data, formatName) : data;
}

Representer.prototype.parse = function(data, formatName) {
  return this.formats[formatName].parser(data);
}

Representer.prototype.toFormat = function(formatName) {
  return this.formats[formatName].builder(this.data);
}