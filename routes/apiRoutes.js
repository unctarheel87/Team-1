var router = require("express").Router();
var db = require("../models");
var passport = require("../config/passport");
var isAutenticated = require("../config/middleware/isAuthenticated");

// get all users
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

// login user
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  console.log(req.user);
  res.json(`/${req.user.username}/profile`);
});

// get user, interests, messages by id
router.get("/api/users/:id", isAutenticated, (req, res) => {
  console.log(
    "---------------- get user + data by id route is reached-------------------"
  );
  db.User.findAll({
    include: [
      {
        model: db.Interest,
        where: {
          userId: req.params.id
        }
      },
      {
        model: db.Message,
        where: {
          userId: req.params.id
        }
      }
    ]
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

// create user
router.post("/api/users", (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    image: req.body.image
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

// create interest
router.post("/api/interests", (req, res) => {
  const newInterest = {
    interest: req.body.interest
  };
  console.log(newInterest);
  db.Interest.create(newInterest)
    .then(response => {
      console.log(response);
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

// create message
router.post("/api/messages", (req, res) => {
  const newMessage = {
    message: req.body.message
  };
  db.Message.create(newMessage)
    .then(response => {
      console.log(response);
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

// get route for retrieving a single message
router.get("/api/messages/:id", (req, res) => {
  console.log(
    "---------------- get message by id + data route is reached-------------------"
  );
  db.Message.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbMessage => {
      console.log(dbMessage);
      res.json(dbMessage);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

// update message by id
router.put("/api/messages/", (req, res) => {
  console.log(
    "---------------- update interest by id + data route is reached-------------------"
  );
  console.log(req.body);
  db.Message.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(dbMessage => {
      if (dbMessage.changedRows === 0) {
        return res.status(404).end();
      } else {
        console.log(dbMessage);
        res.json(dbMessage);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

// delete message by id - not needed for initial release --> not tested, has bugs
router.delete("/api/messages/", (req, res) => {
  db.Message.destroy({
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

// get route for retrieving a single interest
router.get("/api/interests/:id", (req, res) => {
  console.log(
    "---------------- get interest by id + data route is reached-------------------"
  );
  db.Interest.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbInterest => {
      console.log(dbInterest);
      res.json(dbInterest);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

// update interest by id
router.put("/api/interests/", (req, res) => {
  console.log(
    "---------------- update interest by id + data route is reached-------------------"
  );
  console.log(req.body);
  db.Interest.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(dbInterest => {
      if (dbInterest.changedRows === 0) {
        return res.status(404).end();
      } else {
        console.log(dbInterest);
        res.json(dbInterest);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
