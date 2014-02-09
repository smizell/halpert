var formats = require("./formats");

var Halpert = module.exports = new (function() {
  var self = this;
  this.formats = formats;

  this.convert = this.setData = function(initialData) {
    this.initialData = initialData;
    return self;
  }

  this.from = function(fromFormat) {
    this.parsedData = this.formats[fromFormat].parse(this.initialData);
    return self;
  }

  this.to = function(toFormat) {
    return this.formats[toFormat].build(this.parsedData);
  }

  this.reset = function() {
    delete this.initialData;
    delete this.parsedData;
  }

  return self;
})()



