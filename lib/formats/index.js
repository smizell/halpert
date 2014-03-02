var html = require("./html")
    hal_json = require("./hal_json");

module.exports = {
  'text/html': html,
  'application/hal+json': hal_json
}