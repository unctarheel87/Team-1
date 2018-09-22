var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(response) {
      res.json(response);
    });
  });
};
