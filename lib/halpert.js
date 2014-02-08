var formats = require("./formats");

var Halpert = module.exports = function(type, representation) {
  this.parsedRepresentation = formats[type].parse(representation);
}

Halpert.prototype.toHal = function() {
  return this.parsedRepresentation;
}



