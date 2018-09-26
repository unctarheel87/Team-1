var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/users", function() {
  // Before each test begins, create a new request server for testing
  // & delete all users from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all users", function(done) {
    // Add some users to the db to test with
    db.User.bulkCreate({
      firstName: "John",
      lastName: "Tillman",
      username: "jtillman",
      password: "mypass",
      img: "my_image2.jpg"
    }).then(function() {
      // Request the route that returns all users
      request.get("/api/users").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(1);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            firstName: "John",
            lastName: "Tillman",
            username: "jtillman",
            password: "mypass",
            img: "my_image2.jpg"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
