var router = require("express").Router();
var path = require("path");
var isAutenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/:username/profile", isAutenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/profile.html"));
});


router.get("/:username/letters", isAutenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
});

module.exports = router;
