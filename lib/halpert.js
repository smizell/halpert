var Halpert;

module.exports = Halpert = (function() {
  function Halpert() {
    this.formats = {};
  }

  Halpert.prototype.registerFormat = function(format) {
    return this.formats[format.formatName] = format;
  };

  Halpert.prototype.represent = function(data, formatName) {
    return this.formats[formatName].parser(this.formats, data);
  };

  return Halpert;

})();
