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
    },
    handleSubmit(event) {
      event.preventDefault();
      let formData = {
        username: event.target.username.value,
        password: event.target.password.value
      };
      console.log(formData);
      axios
        .post("/api/login", formData)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  }
});

app.getData();
