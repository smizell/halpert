Representer = require('./representer');

module.exports = class Halpert

  constructor: () ->
    @formats = {}

  registerFormat: (format) ->
    @formats[format.formatName] = format

  represent: (data, formatName) ->
    new Representer(@formats, data, formatName);
