$(document).ready(function() {
  $(".modal").modal();
});

$(document).ready(function() {
  $("select").formSelect();
});

//Vue instance
new Vue({
  el: "#vue-home-form",
  data: {
    message: ""
  },
  methods: {
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
        .then(response => {
          console.log(response);
          $("#modal2").modal("close");
          window.location.replace(response.data);
        })
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
          $("#modal1").modal("close");
          window.location.replace(response.data);
        })
        .catch(err => {
          this.message = "Username password is incorrect...";
          console.log(err);
        });
    }
  }
});
