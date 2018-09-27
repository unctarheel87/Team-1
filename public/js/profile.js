//Vue instance
const profile = new Vue({
  el: "#vue-profile",
  data: {
    user: {}
  },
  methods: {
    getData: function() {
      axios
        .get("/api/users")
        .then(response => {
          this.user = response.data[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});

profile.getData();
