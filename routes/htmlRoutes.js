var router = require("express").Router();
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/:username/profile", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/profile.html"));
});


router.get("/:username/letters", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
});

module.exports = router;
