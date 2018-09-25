var router = require("express").Router();
var db = require("../models");
var passport = require("../config/passport");
var isAutenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  res.sendFile("index.html");
});

router.get("/api/users", (req, res) => {
  db.User.findAll({})
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

//login user
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  console.log(req.user);
  res.json("sucess");
});

// get individual user
router.get("/api/users/:username", isAutenticated, (req, res) => {
  db.User.findAll({ where: { userName: req.params.username } })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

//create user
router.post("/api/users", (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    img: req.body.img
  };
  db.User.create(newUser)
    .then(response => {
      console.log(response);
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.put("/api/users/:id", (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password
  };
  db.User.update(newUser, { 
    where: { id: req.params.id }
  })
    .then(response => {
      if (response.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.delete("/api/users/:id", (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(response => {
      if (response.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
