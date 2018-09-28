//Vue instance
new Vue({
  el: "#vue-chat",
  data: {
    message: ""
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      let formData = {
        message: event.target.message.value
      };
      console.log(formData);
      axios
        .post("/api/messages", formData)
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
    }
  }
});
