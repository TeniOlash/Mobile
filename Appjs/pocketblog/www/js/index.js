// Checking that cordova and jquery have loaded properly
// document.addEventListener('deviceready', deviceReady, false);

// function deviceReady() {
$(document).ready(function () {
  // saving endpoints in variables
  const url = 'http://localhost/pocket-blog';
  const postsUrl = 'http://localhost/pocket-blog/wp-json/wp/v2/posts';
  // saving token in variable
  var tokenUrl = `${url}/wp-json/jwt-auth/v1/token`;
  // admin details to access blog
  var adminDetails = {
    username: 'TeniOlash',
    password: 'Perseverance000@',
  };
  // getting all blog posts
  function getPosts() {
    $.getJSON(postsUrl, function (response) {
      $.map(response, function (res) {
        $('.all-posts').append(`
                <div class="app-section">
                  <div class="post">
                  <h3 class="post-title">${res.title.rendered}</h3>
                  <sub>${res.date}</sub>
                  <hr />
                  <p class="post-content">${res.excerpt.rendered}</p>
                  </div>
                </div>`);
      });
    });
  }
  // saving token for authentication
  var token;
  $.post(tokenUrl, adminDetails, function (postData, status) {
    token = postData.token;
  });
  // app pages and functionality
  App.controller('home', function (page) {
    // put stuff here
  });

  App.controller('create-post', function (page) {
    // put stuff here
    $(page)
      .find('form')
      .on('submit', function (e) {
        let title = $(page).find('input[name=title]').val();
        let content = $(page).find('textarea[name=content]').val();

        e.preventDefault();

        var formData = {
          title: title,
          content: content,
          status: 'publish',
        };
        $.ajax({
          type: 'post',
          url: postsUrl,
          data: JSON.stringify(formData),
          crossDomain: true,
          contentType: 'application/json',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          success: function (postData) {
            console.log(postData);
          },
          error: function (error) {
            console.log('error: ' + error);
          },
        });
        App.load('create-post');
      });
  });
  App.controller('all-posts', function (page) {
    // put stuff here
    getPosts();
  });
  App.load('home');
});
// }
