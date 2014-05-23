module.exports = class Representer
  
  constructor: (formats, data, formatName) ->
    @formats = formats
    @data = if formatName then this.parse(data, formatName) else data;

  parse: (data, formatName) ->
    @formats[formatName].parser(data)

  toFormat: (formatName) ->
    @formats[formatName].builder(this.data)