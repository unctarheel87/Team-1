$(document).ready(function() {
  $(".modal").modal();
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
      $.post("/api/users", formData)
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
      $.post("/api/login", formData)
        .then(response => {
          window.location.replace(response.data);
        })
        .catch(err => console.log(err));
    }
  }
});
