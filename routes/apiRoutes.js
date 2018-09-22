var db = require("../models");
var path = require('path');

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.User.find({}).then(response => {
      console.log(response);
    })
    res.send('index.html');
  });
};
