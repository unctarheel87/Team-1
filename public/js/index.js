const app = new Vue({
  el: "#vue-home-form",
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
    handleSubmit(event) {
      event.preventDefault();
      let formData = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        username: event.target.username.value,
        password: event.target.password.value,
        image: event.target.image.value
      };
      console.log(formData);
      axios
        .post("/api/users", formData)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    },
    handleLogin(event) {
      event.preventDefault();
      let formData = {
        username: event.target.username.value,
        password: event.target.password.value
      };
      console.log(formData);
      axios
        .post("/api/login", formData)
        .then(response => {
            window.location.replace(response.data);
        })
        .catch(err => console.log(err));
    }
  }
});

app.getData();
