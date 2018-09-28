$(document).ready(function() {
  $(".modal").modal();
});

$(document).ready(function() {
  $("select").formSelect();
});

//Vue instance
const profile = new Vue({
  el: "#vue-profile",
  data: {
    user: {},
    userMatch: {},
    hasInterests: false,
    errorMessage: ""
  },
  methods: {
    getData: function() {
      axios
        .get("/api/users/currentUser")
        .then(response => {
          this.user = response.data[0];
          if (this.user.Interests.length > 0) {
            this.hasInterests = true;
          }
          this.getMatchData();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSubmit(event) {
      event.preventDefault();
      const profileScores = [];
      $("#profile-form select").each(function() {
        profileScores.push(parseInt($(this).val()));
      });
      let formData = {
        interests: profileScores
      };
      console.log(formData);
      axios
        .post("/api/interests", formData)
        .then(response => {
          console.log(response);
          $("#modal2").modal("close");
          this.getData();
        })
        .catch(err => console.log(err));
    },
    findMatch() {
      axios
        .get("/api/users/currentUser")
        .then(response => {
          const userProfile = { userProfile: response.data[0] };
          axios
            .post("/api/match", userProfile)
            .then(response => {
              this.errorMessage = response.data;
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    getMatchData() {
      axios
        .get(`/api/users/${this.user.matchId}`)
        .then(response => {
          this.userMatch = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});

profile.getData();
