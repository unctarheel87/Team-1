const app = new Vue({
  el: "#app",
  data: {
    message: "This is working"
  },
  methods: {
    getData: function() {
      axios
        .get("/api/users")
        .then(response => {
          console.log(response);
          this.message = JSON.stringify(response.data[0], null, 2);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getData2: function() {
      axios
        .get("/api/users")
        .then(response => {
          console.log(response);
          this.message = JSON.stringify(response.data[0].firstName, null, 2);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});

app.getData();
