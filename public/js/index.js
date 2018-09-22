axios.get('/')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  const app2 = new Vue({
    el: '#app',
    data: {
      message: 'This is working'
    }
  })