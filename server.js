require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8088;

//passport
app.use(
  session({
    secret: "guitar hero",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use(require("./routes/apiRoutes"));

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log("server is running...");
  });
});

module.exports = app;
