module.exports = class Halpert

  constructor: () ->
    @formats = {}

  registerFormat: (format) ->
    @formats[format.formatName] = format

  represent: (data, formatName) ->
    @formats[formatName].parser(@formats, data)
