var formats = require("./formats"),
    _ = require("underscore");

var Halpert = module.exports = function(initialData, mediaType) {
  var self = this;
  this.formats = formats;

  this.initialData = initialData;
  this.mediaType = mediaType;

  this.parse = function() {
    if (this.mediaType === 'hyperdescribe') {
      this.parsed = this.initialData;
    } else {
      this.parsed = this.formats[mediaType].parse(this.initialData);
    }
    return self;
  }

  this.convertTo = function(toFormat) {
    if (!this.parsed) this.parse();
    if (!this.initialData || this.formats[toFormat] == undefined) return undefined;
    var data = (this.initialData && !this.parsed) ? this.initialData : this.parsed;
    return this.formats[toFormat].build(data);
  }

  return self;
}



