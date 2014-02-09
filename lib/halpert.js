var formats = require("./formats"),
    _ = require("underscore");

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
    if(!this.initialData || this.formats[toFormat] == undefined) return undefined;
    var data = (this.initialData && !this.parsedData) ? this.initialData : this.parsedData;
    return this.formats[toFormat].build(data);
  }

  this.reset = function() {
    delete this.initialData;
    delete this.parsedData;
  }

  return self;
})()



