var router = require("express").Router();
var path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/profile.html"));
});

router.get("/letters", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
});

module.exports = router;
