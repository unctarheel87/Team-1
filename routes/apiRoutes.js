var router = require("express").Router();
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var findBestMatch = require("../routes/matchLogic");

//------------------GET ROUTES for user login------------------//

// login user
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  console.log(req.user);
  res.json(`/${req.user.username}/profile`);
});

//------------------GET ROUTES------------------//

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

// get user, interests, messages by id
router.get("/api/users/currentUser", (req, res) => {
  console.log(
    "---------------- get user + data by id route is reached-------------------"
  );
  db.User.findAll({
    where: {
      id: req.user.id
    },
    include: [{ model: db.Interest }, { model: db.Message }]
  })
    .then(response => {
      res.json(response);
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

//------------------POST ROUTES------------------//

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
  const newInterests = [];
  for (let interest of req.body.interests) {
    newInterests.push({ interest, UserId: req.user.id });
  }
  console.log(newInterests);
  db.Interest.bulkCreate(newInterests)
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
    message: req.body.message,
    UserId: req.user.id
  };
  console.log(newMessage);
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

// matching
router.post("/api/match", (req, res) => {
  const userProfile = req.body.userProfile;
  console.log(JSON.stringify(userProfile) + " sent to api!");
  db.User.findAll({
    include: { model: db.Interest }
  }).then(response => {
    res.json(findBestMatch(response, userProfile));
  });
});


//------------------PUT ROUTES------------------//

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

//------------------DELETE ROUTES------------------//

// delete message by id 
router.delete("/api/messages/", (req, res) => {
  console.log(
    "---------------- delete interest by id + data route is reached-------------------"
  );
  db.Message.destroy({
    where: {
      id: req.body.id
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

// delete interest by id 
router.delete("/api/interests/", (req, res) => {
  console.log(
    "---------------- delete interest by id + data route is reached-------------------"
  );
  db.Interest.destroy({
    where: {
      id: req.body.id
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
