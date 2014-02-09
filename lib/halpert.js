var formats = require("./formats");

var Halpert = module.exports = (function() {
  var self = this;
  this.formats = formats;

  this.convert = this.setData = function(initialData) {
    this.initialData = initialData;
    return self;
  }

  this.from = function(fromFormat) {
    this.parsedData = formats[fromFormat].parse(this.initialData);
    return self;
  }

  this.to = function(toFormat) {
    return this.parsedData;
  }

  this.reset = function() {
    delete this.initialData;
    delete this.parsedData;
  }

  return self;
})()



