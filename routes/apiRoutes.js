// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// go use index.js to fetch all models (all .js files) in the models folder and put them in the db.
var db = require("../models");
<<<<<<< HEAD
var express = require('express');
=======
var path = require('path');
>>>>>>> f12c0a1e140149acc375235856c227425b7924bd

// Routes
// =============================================================
module.exports = function(app) {

// Create all our routes and set up logic within those routes where required.
  // Finding all Burgers, and then returning them to the user as JSON.
  // Sequelize queries are asynchronous, which helps with perceived speed.
  // If we want something to be guaranteed to happen after the query, we'll use
  // the .then function
  app.get("/", function(req, res) {
<<<<<<< HEAD
        db.User.findAll({}).then(function(results){
            // results are available to us inside the .then
            
            res.render("index", { users: results });
            
        }).catch(function(error) {
            throw error;
        }); 
=======
    db.User.find({}).then(response => {
      console.log(response);
    })
    res.send('index.html');
>>>>>>> f12c0a1e140149acc375235856c227425b7924bd
  });

  // add a burger
  app.post("/api/users", function(req, res) {

        // adding server-side validation for burger_name not null and burger_name < 36 chars
        if(req.body.name === '' || req.body.name.length > 35) {
        
        return res.status(404).json('name validation failed').end();
        } else { // if it passes validation, insert the burger

            db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            image: req.body.image
            created_at: req.body.created_at
            }).then(function(results) {
            // Send back the ID of the new burger
           
            res.json({ id: results.insertId });
            });
        }
  });
  
  app.put("/api/users/:id", function(req, res) {

    console.log("req.params.id: " + req.params.id);

        db.User.update({
            firstName: req.body.firstName  
        }, {where: {id: req.body.id }
        })
        .then(function(results){
                if (results.changedRows == 0) {
                    // If no rows were changed, then the ID must not exist, so 404
                    return res.status(404).end();
                } else {
                    res.status(200).end();
                }
        });
    });
};